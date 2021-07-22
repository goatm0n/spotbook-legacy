from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from profiles.models import Profile
from django.http.response import Http404
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer

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

    print(data)

    return Response({'count': current_followers_qs.count()}, status=200)