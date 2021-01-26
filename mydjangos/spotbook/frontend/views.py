from django.shortcuts import render

def home_view(request):
    return render(request, 'frontend/base.html')

def spotmap_view(request):
    return render(request, 'frontend/spotmap.html')

def account_view(request):
    return render(request, 'frontend/account.html')

def login_view(request):
    return render(request, 'frontend/login.html')

def signup_view(request):
    return render(request, 'frontend/signup.html')

def createSpotFormView(request):
    return render(request, 'frontend/createSpotForm.html')