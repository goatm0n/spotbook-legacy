from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Account
from .serializers import AccountSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/account-list/',
        'Detail View': '/account-detail/<str:pk>/',
        'Create': '/account-create/',
        'Update': '/account-update/<str:pk>/',
        'Delete': '/account-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def accountList(request):
    accountList = Account.objects.all().order_by('-id')
    serializer = AccountSerializer(accountList, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def accountDetail(request, pk):
    account = Account.objects.get(id=pk)
    serializer = AccountSerializer(account, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@csrf_exempt
def accountCreate(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


