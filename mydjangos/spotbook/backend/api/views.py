from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import Spot
from .serializers import SpotSerializer

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

@api_view(['GET'])
def spotList(request):
    spotList = Spot.objects.all().order_by('-id')
    serializer = SpotSerializer(spotList, many=True)

    return Response(serializer.data)
