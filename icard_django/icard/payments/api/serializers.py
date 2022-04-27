from asyncore import read
from dataclasses import field
from rest_framework.serializers import ModelSerializer

from payments.models import Payment
from tables.api.serializers import TableSerializer


class PaymentSerializer(ModelSerializer):
    table_data = TableSerializer(source='table', read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'table', 'table_data', 'totalPayment',
                  'paymentType', 'statusPayment', 'create_at']
