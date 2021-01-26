from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import Spot
from .serializers import SpotSerializer
import json
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.gis.geos import Point

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/spot-list/',
        'Detail View': '/spot-detail/<str:pk>/',
        'Create': '/spot-create/',
        'Update': '/spot-update/<str:pk>/',
        'Delete': '/spot-delete/<str:pk>/',
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
@csrf_exempt
def spotCreate(request):
    payload = request.data
    lat = payload['geometry']['coordinates'][0]
    lng = payload['geometry']['coordinates'][1]
    point = Point(lat, lng)

    spot = Spot(
        title=payload['properties']['title'], 
        location=point,
        description=payload['properties']['description'],
        spotType=payload['properties']['spotType']
    )

    serializer = SpotSerializer(spot, many=False)
    if serializer.is_valid:
        spot.save()

    return Response(serializer.data)