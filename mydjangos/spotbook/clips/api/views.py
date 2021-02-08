from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/clips-list/',
        'Detail View': '/clip-detail/<str:pk>/',
        'Create': '/clip-create/',
        'Update': '/clip-update/<str:pk>/',
        'Delete': '/clip-delete/<str:pk>/',
    }
    return Response(api_urls)