"""
  Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
"""
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from api.views import CompanyListViewSet, OfficeListViewSet, \
                      UpdateHeadquarter, CreateCompanyOffice

app_name = 'api'

urlpatterns = [
    url(r'^company/(?P<pk>\d+)/$', UpdateHeadquarter.as_view()),
    url(r'^company/', CompanyListViewSet.as_view()),
    url(r'^add_company/', CreateCompanyOffice.as_view()),
    url(r'^office/', OfficeListViewSet.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
