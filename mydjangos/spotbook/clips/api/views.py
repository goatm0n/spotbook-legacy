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
def clip_list_username_view(request, username):
    clip_qs = Clip.objects.filter(user__username=username)
    clip_id_list = []
    for obj in clip_qs:
        clip_id_list.append(obj.id)
    
    return Response({"clip_id_list": clip_id_list})

@api_view(['GET'])
def clip_list_spot_view(request, spot_id):
    clip_qs = Clip.objects.filter(spot__id=spot_id)
    clip_id_list = []
    for obj in clip_qs:
        clip_id_list.append(obj.id)
    
    return Response({"clip_id_list": clip_id_list})

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

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def clip_like_action_view(request, clip_id):
    qs = Clip.objects.filter(id=clip_id)
    if not qs.exists():
        return Response({}, status=404)
    clip = qs.first()

    data = request.data or {}
    action = data.get('action')
    user = request.user

    if action == 'like':
        clip.likes.add(user)
    elif action=='unlike':
        clip.likes.remove(user)
    else:
        pass

    likes_qs = clip.likes.all()
    count = likes_qs.count()

    return Response({'count': count}, status=201)

@api_view(['GET'])
def does_user_like(request, clip_id, *args, **kwargs):
    qs = Clip.objects.filter(id=clip_id)
    if not qs.exists():
        return Response({}, status=404)

    user = request.user
    clip = qs.first()

    if user in clip.likes.all():
        return Response({"data": True}, status=200)
    elif user not in clip.likes.all():
        return Response({"data": False}, status=200)
    else:
        return Response({}, status=404)

@api_view(['GET'])
def clip_likes_count_view(request, clip_id):
    qs = Clip.objects.filter(id=clip_id)
    if not qs.exists():
        return Response({}, status=404)
    clip = qs.first()
    likes_qs = clip.likes.all()
    count = likes_qs.count()

    return Response({'count': count}, status=200)


