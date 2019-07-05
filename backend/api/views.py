from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Company, Office
from .serializers import CompanySerializer, OfficeSerializer


# Create your views here.
class CompanyListViewSet(APIView):
    def get(self, request, format=None):
        '''
        METHOD: GET
        ENDPOINT: /api/v1/company/
        SAMPLE_RESPONSE:
        [
            {
                "id": 1,
                "name": "My Company",
                "headquarter_office": {
                    "street": "Street 2",
                    "city": "city3",
                    "postal_code": "10995"
                }
            },
            {
                "id": 2,
                "name": "Your Company",
                "headquarter_office": {}
            }
        ]
        '''
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)

        return Response(serializer.data)


class OfficeListViewSet(APIView):
    def get(self, request, format=None):
        '''
        REQUEST_METHOD: GET
        ENDPOINT: /api/v1/office/?company=<company_name>
        SAMPLE_RESPONSE:
        [
            {
                "id": 2,
                "name": "Office 2",
                "street": "Street 2",
                "postal_code": "123123123",
                "city": "Moscow",
                "monthly_rent": "1.12",
                "headquarter": false,
                "company": 1
            },
            ...
        ]
        '''
        if request.GET['company']:
            offices = Office.objects.filter(company__name=request.GET['company']).all()  # noqa
        else:
            offices = Office.objects.all()

        serializer = OfficeSerializer(offices, many=True)
        return Response(serializer.data)


class UpdateHeadquarter(APIView):
    def put(self, request, pk, format=None):
        '''
        REQUEST_METHOD: PUT,
        ENDPOINT: /api/v1/company/<company_id>/
        REQUEST_PARAM:
        {
            "office_id": 1
        }
        SAMPLE_RESPONSE:
        [
            {
                "id": 3,
                "name": "Office 2",
                "street": "Street 2",
                "postal_code": "10995",
                "city": "city3",
                "monthly_rent": "1.20",
                "headquarter": true,
                "company": 1
            }
        ]
        '''
        Office.objects.filter(company__pk=pk).update(headquarter=False)
        Office.objects.filter(id=request.data['office_id']).update(headquarter=True)  # noqa
        query_set = Office.objects.filter(company__pk=pk, headquarter=True).all()  # noqa
        serializer = OfficeSerializer(query_set, many=True)

        return Response(serializer.data)


class CreateCompanyOffice(APIView):
    def post(self, request):
        '''
        METHOD: POST
        ENDPOINT: /api/v1/add_company/
        REQEST PARAM:
        {
            "name": "my another company",
            "offices": [
                {
                    "name": "Office 23",
                    "street": "Street 23",
                    "postal_code": "102323",
                    "city": "city23",
                    "monthly_rent": "1.20",
                    "headquarter": true
                },
                {
                    "name": "Office 23",
                    "street": "Street 23",
                    "postal_code": "102323",
                    "city": "city23",
                    "monthly_rent": "1.20",
                    "headquarter": false
                }
            ]
        }
        SAMPLE_RESPONSE:
        [
            {
                "id": 8,
                "name": "my company1",
                "headquarter_office": {
                    "street": "Street 23",
                    "city": "city23",
                    "postal_code": "102323"
                }
            }
        ]
        '''
        company = Company.objects.create(name=request.data['name'])
        for office in request.data['offices']:
            Office.objects.create(
                name=office['name'],
                street=office['street'],
                postal_code=office['postal_code'],
                city=office['city'],
                monthly_rent=office['monthly_rent'],
                company=company,
                headquarter=office['headquarter'],
            )
        query_set = Company.objects.filter(name=request.data['name'])
        serializer = CompanySerializer(query_set, many=True)

        return Response(serializer.data)
