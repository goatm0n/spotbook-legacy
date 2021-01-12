from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/spot-list/',
        'Detail View': '/spot-detail/<str:pk>/',
        'Create': '/spot-create/',
        'Update': '/spot-update/<str:pk>/',
        'Delete': '/spot-delete/<str:pk>/',
    }
    return Response(api_urls)
