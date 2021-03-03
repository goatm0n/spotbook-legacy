from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Account
from .serializers import AccountSerializer
import json

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
def account_create_view(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        #serializer.save(user=request.user)
        #obj = json.loads(request.data)
        Account.objects.create_user(email=request.data['email'], username=request.data['username'], password=request.data['password'])
        return Response(serializer.data, status=201)
    return Response({}, status=400)
