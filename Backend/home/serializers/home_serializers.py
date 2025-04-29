from rest_framework import serializers
from home.models import Transaction

class TransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model  = Transaction
        fields = '__all__'
        read_only_fields = ['transaction_id']