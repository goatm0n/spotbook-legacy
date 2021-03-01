from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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
def clip_list_view(request):
    clipList = Clip.objects.all().order_by('-id')
    serializer = ClipSerializer(clipList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def clip_detail_view(request, pk):
    clip = Clip.objects.get(id=pk)
    serializer = ClipSerializer(clip)
    return Response(serializer.data)

@api_view(['GET'])
def clip_spot_view(request, pk):
    clipList = Clip.objects.filter(spot__id=pk)
    serializer = ClipSerializer(clipList, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clip_create_view(request):
    serializer = ClipSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)
