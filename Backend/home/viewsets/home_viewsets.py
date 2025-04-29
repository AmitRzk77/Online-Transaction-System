from django.shortcuts import render
import random
from rest_framework.response import Response
from django.template.loader import render_to_string
from django.http import HttpResponse
from io import BytesIO
from rest_framework import generics, status
from xhtml2pdf import pisa
from ..serializers.home_serializers import TransactionSerializers
from home.models import Transaction

# Transaction List and Create View
class TransactionListCreate(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializers

    def generate_transaction_id(self):
        random_number = random.randint(1000, 9999)
        txn_id = f"TXNID{random_number}"
        return txn_id

    def perform_create(self, serializer):
        txn_id = self.generate_transaction_id()
        serializer.save(transaction_id=txn_id)

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        transaction_id = response.data.get('transaction_id')
        return Response({'transaction_id': transaction_id}, status=status.HTTP_201_CREATED)

# Transaction Detail View
class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializers
    lookup_field = 'transaction_id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        self.perform_update(serializer)

        if serializer.validated_data.get('status') == 'approved':
            pdf_response = self.generate_pdf_for_transaction(instance)
            return pdf_response
        return Response(serializer.data)
    
    def generate_pdf_for_transaction(self, transaction):
        html = render_to_string('transaction_default_template.html', {'txn': transaction})
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
        
        if not pdf.err:
            response = HttpResponse(result.getvalue(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="Transaction_{transaction.transaction_id}.pdf"'
            return response
        else:
            return HttpResponse(f"we had some errors <pre> {html}</pre>", content_type='text/html')

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

# PDF Transaction List View
class PDFTransactionListView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        transaction = Transaction.objects.filter(status="approved")
        html = render_to_string('transaction_list_templates.html', {'transaction': transaction})
        response = self.render_to_pdf(html, "transaction_list.pdf")
        return response
    
    def render_to_pdf(self, html_string, filename):
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html_string.encode("UTF-8")), result)
        if not pdf.err:
            response = HttpResponse(result.getvalue(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        return HttpResponse(f'we had some errors <pre>{html_string}</pre>', content_type='text/html')

# PDF Transaction Detail View
class PDFTransactionDetailView(generics.GenericAPIView):
    def get(self, request,txn_id, *args, **kwargs):
        try:
            txn = Transaction.objects.get(transaction_id=txn_id)
            if txn.status != 'approved':
                return HttpResponse("Transaction is not approved", status=403)
            
            html = render_to_string('transaction_detail_template.html', {'txn': txn})
            response = self.render_to_pdf(html, f"transaction_{txn_id}.pdf")
            return response
        except Transaction.DoesNotExist:
            return HttpResponse("Transaction not found", status=404)
        
    
    def render_to_pdf(self,html_string,filename):
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html_string.encode("UTF-8")), result)
        if not pdf.err:
            response = HttpResponse (result.getvalue(), content_type = 'application/pdf')
            response['Content-Disposition'] = f'attachment;filename ="{filename}" '
            return response
        return HttpResponse(f'we had some errors <pre>{html_string}</pre>', content_type='text/html')

