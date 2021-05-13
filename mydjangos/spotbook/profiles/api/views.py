from rest_framework.decorators import api_view
from rest_framework.response import Response
from profiles.models import Profile
from django.http.response import Http404
from .serializers import ProfileSerializer

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
