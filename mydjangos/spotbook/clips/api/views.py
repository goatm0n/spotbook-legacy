from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from clips.models import Clip
from profiles.models import Profile
from .serializers import ClipSerializer
import requests


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
    print(request)
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

@api_view(['GET'])
def spot_feed_view(request, username):
    spot_list_response = requests.get("http://127.0.0.1:8000/profiles/api/user-following-spots/{username}/".format(username=username))
    spot_list_json = spot_list_response.json()
    spot_list = spot_list_json["spot_list"]
    
    profile_list_response = requests.get("http://127.0.0.1:8000/profiles/api/user-following-profiles/{username}/".format(username=username))
    profile_list_json = profile_list_response.json()
    profile_list = profile_list_json["followers"]
    
    clip_list = []
    clip_list_spots = []
    clip_list_profiles = []

    for spot in spot_list:
        spot_clip_list_response = requests.get("http://127.0.0.1:8000/clips/api/clip-list-spot/{spot_id}/".format(spot_id=spot))
        spot_clip_list_json = spot_clip_list_response.json()
        spot_clip_list = spot_clip_list_json['clip_id_list']
        
        for clip in spot_clip_list:
            clip_list_spots.append(clip)

    for profile in profile_list:
        profile_clip_list_response = requests.get("http://127.0.0.1:8000/clips/api/clip-list/{username}/".format(username=profile))
        profile_clip_list = profile_clip_list_response.json()['clip_id_list']

        for clip in profile_clip_list:
            clip_list_profiles.append(clip)

    in_spot_list = set(clip_list_spots)
    in_profile_list = set(clip_list_profiles)
    in_profile_but_not_in_spot = in_profile_list - in_spot_list
    clip_list = list(in_spot_list) + list(in_profile_but_not_in_spot)
    
    return Response({"clip_list": clip_list })

