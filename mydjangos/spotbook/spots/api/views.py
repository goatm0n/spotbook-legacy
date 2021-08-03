from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from spots.models import Spot
from .serializers import SpotSerializer
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

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

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def spot_follow_view(request, spot_id, *args, **kwargs):
    me = request.user
    spot_qs = Spot.objects.filter(id=spot_id)
    if not spot_qs.exists():
        return Response({}, status=404)

    spot = spot_qs.first()

    data = request.data or {}
    action = data.get('action')

    if action == 'follow':
        spot.followers.add(me)
    elif action == 'unfollow':
        spot.followers.remove(me)
    else:
        pass

    followers_qs = spot.followers.all()

    return Response({'count': followers_qs.count()}, status=200)


@api_view(['GET'])
def spot_followers(request, spot_id):
    spot_qs = Spot.objects.filter(id=spot_id)
    if not spot_qs.exists():
        return Response({}, status=404)

    spot = spot_qs.first()
    
    followers_qs = spot.followers.all()
    followers = []
    for user in followers_qs:
        username = user.username
        followers.append(username)

    return Response({'followers': followers})

@api_view(['GET'])
def does_user_follow(request, spot_id):
    user = request.user
    username = user.username
    spot_qs = Spot.objects.filter(id=spot_id)
    if not spot_qs.exists():
        return Response({}, status=404)

    spot = spot_qs.first()
    spot_followers_qs = spot.followers.all()

    qs = spot_followers_qs.filter(username=username)
    if not qs.exists():
        return Response({"data": False}, status=200)
    elif qs.exists():
        return Response({"data": True}, status=200)
    else:
        return Response({}, status=404)

