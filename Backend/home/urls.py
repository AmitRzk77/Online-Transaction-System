from django.contrib import admin
from django.urls import path
from .viewsets.home_viewsets import *

urlpatterns = [
    path('transactions/', TransactionListCreate.as_view(), name='transaction-list-create'),
    path('transactions/<str:transaction_id>/', TransactionDetail.as_view(), name='transaction-detail'),
    path('pdf/transactions/', PDFTransactionListView.as_view(), name='pdf-transaction-list'),
    path('pdf/transactions/<str:txn_id>/', PDFTransactionDetailView.as_view(), name='pdf-transaction-detail'),
]
