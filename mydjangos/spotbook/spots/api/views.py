from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from spots.models import Spot
from .serializers import SpotSerializer
from rest_framework import status

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/spot-list/',
        'Detail View': '/spot-detail/<str:pk>/',
        'Create': '/spot-create/',
        'Update': '/spot-update/<str:pk>/',
        'Delete': '/spot-delete/<str:pk>/',
        'User': '/spot-user/<str:username>/',
        'Like-toggle': '/spot-like/<str:spot_id>/',
    }
    
    return Response(api_urls)

@api_view(['GET'])
def spotList(request):
    spotList = Spot.objects.all().order_by('-id')
    serializer = SpotSerializer(spotList, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def spotDetail(request, pk):
    spot = Spot.objects.get(id=pk)
    serializer = SpotSerializer(spot, many=False)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def spot_create(request):
    serializer = SpotSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def spot_user_view(request, username):
    # returns qs of spots uploaded by user
    qs = Spot.objects.filter(user__username=username)
    serializer = SpotSerializer(qs, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
### GENERAL LIKE TOGGLE VIEW ###
def spot_like_toggle_view(request, spot_id):
    qs = Spot.objects.filter(id=spot_id)
    
    if not qs.exists():
        return Response({}, status=404)

    obj = qs.first()
    
    if request.user in obj.likes.all():
        obj.likes.remove(request.user)
    else:
        obj.likes.add(request.user)

    return Response({}, status=201)

