from rest_framework import serializers
from .models import Company, Office


class CompanySerializer(serializers.ModelSerializer):
    headquarter_office = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ('id', 'name', 'headquarter_office', )

    def get_headquarter_office(self, obj):
        query_set = Office.objects.filter(company=obj, headquarter=True)
        serializer = OfficeSerializer(query_set, many=True)
        print(serializer.data)
        result = {}

        if len(serializer.data) > 0:
            result['street'] = serializer.data[0]['street']
            result['city'] = serializer.data[0]['city']
            result['postal_code'] = serializer.data[0]['postal_code']

        return result


class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = "__all__"
