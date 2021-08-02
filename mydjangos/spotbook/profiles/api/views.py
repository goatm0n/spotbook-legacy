from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from profiles.models import Profile
from django.http.response import Http404
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer, ProfileFollowersSerializer

User = get_user_model()

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'detail': '/profile-detail/<str:username>/'
    }
    return Response(api_urls)

@api_view(['GET'])
def profile_detail_view(request, username):
    # get profile for passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    serializer = ProfileSerializer(profile_obj)

    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)

    if not other_user_qs.exists():
        return Response({}, status=404)

    other = other_user_qs.first()
    profile = other.profile

    data = request.data or {}

    action = data.get('action')

    if action == 'follow':
        profile.followers.add(me)
    elif action == 'unfollow':
        profile.followers.remove(me)
    else:
        pass

    current_followers_qs = profile.followers.all()

    return Response({'count': current_followers_qs.count()}, status=200)

@api_view(['GET'])
def user_followers(request, username):
    user_qs = User.objects.filter(username=username)
    if not user_qs.exists():
        return Response({}, status=404)

    user_ = user_qs.first()
    profile_ = user_.profile
    
    followers_qs = profile_.followers.all()
    followers = []
    for profile in followers_qs:
        username_ = profile.username
        followers.append(username_)

    return Response({'followers': followers})

@api_view(['GET'])
def does_user_follow(request, targetUsername, *args, **kwargs):
    user = request.user
    username = user.username

    user_qs = User.objects.filter(username=targetUsername)
    if not user_qs.exists():
        return Response({}, status=404)

    targetUser = user_qs.first()
    targetProfile = targetUser.profile

    target_profile_followers_qs = targetProfile.followers.all()

    qs = target_profile_followers_qs.filter(username=username)
    if not qs.exists():
        return Response({'data': False}, status=200)
    elif qs.exists():
        return Response({'data': True}, status=200)
    else:
        return Response({}, status=404)


