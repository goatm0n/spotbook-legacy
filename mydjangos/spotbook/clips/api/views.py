from rest_framework.decorators import api_view
from rest_framework.response import Response
from clips.models import Clip
from .serializers import ClipSerializer
from django.http import HttpResponse

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/clip-list/',
        'Detail View': '/clip-detail/<str:pk>/',
        'Create': '/clip-create/',
        'Update': '/clip-update/<str:pk>/',
        'Delete': '/clip-delete/<str:pk>/',
        'List by spot': '/clip-spot/<str:pk>/',
        'List by user': '/clip-user/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def clip_spot_view(request, pk):
    clipList = Clip.objects.filter(spot__id=pk)
    serializer = ClipSerializer(clipList, many=True)
    return Response(serializer.data)
