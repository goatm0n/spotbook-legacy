from rest_framework.decorators import api_view
from rest_framework.response import Response
from profiles.models import Profile

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'detail': '/profile-detail/<str:username>/'
    }
    return Response(api_urls)

#@api_view(['GET'])
#def detailView(request, username):
    
