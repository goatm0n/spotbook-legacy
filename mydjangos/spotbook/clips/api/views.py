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
        'List by user': '/clip-user/<str:username>/',
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

@api_view(['GET'])
def clip_user_view(request, username):
    qs = Clip.objects.filter(user__username=username)
    serializer = ClipSerializer(qs, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clip_like_toggle_view(request, clip_id):
    qs = Clip.objects.filter(id=clip_id)
    
    if not qs.exists():
        return Response({}, status=404)

    obj = qs.first()
    
    if request.user in obj.likes.all():
        obj.likes.remove(request.user)
    else:
        obj.likes.add(request.user)

    return Response({}, status=201)
