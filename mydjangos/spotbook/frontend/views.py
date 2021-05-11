from django.shortcuts import render, redirect
from django.template import Context
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm

def home_view(request):
    return render(request, 'frontend/home.html')

def spotmap_view(request):
    return render(request, 'frontend/spotmap.html')

def createSpotFormView(request):
    return render(request, 'frontend/createSpotForm.html')

def spotpage_view(request, pk):
    context = {'spot_id': pk}
    return render(request, 'frontend/spotpage.html', context)

def upload_clip_view(request):
    return render(request, 'frontend/uploadClip.html')

def upload_clip_from_spot_view(request, pk):
    context = {'spot_id': pk}
    return render(request, 'frontend/uploadClip.html', context)

def login_view(request):
    form = AuthenticationForm(request, data=request.POST or None)
    context = {'form': form}
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect('/spotbook')

    return render(request, 'frontend/login.html', context)

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('/login')
    
    return render(request, 'frontend/logout.html')

def registration_view(request):
    
    return render(request, 'frontend/register.html')

def profile_view(request):

    if request.user.is_authenticated:
        context = {'username': request.user.username}
        
        return render(request, 'frontend/profile.html', context)

    else:
        return redirect('http://127.0.0.1:8000/spotbook/login/')