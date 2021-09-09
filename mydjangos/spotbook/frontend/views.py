from django.shortcuts import render, redirect
from django.template import Context
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm

from profiles.forms import ProfileForm

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

def profile_detail_view(request, username):
    context = {'username': username}

    return render(request, 'frontend/profile-detail.html', context)

def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect('http://127.0.0.1:8000/spotbook/login/')
    
    user = request.user
    my_profile = user.profile
    form = ProfileForm(request.POST or None, request.FILES or None, instance=my_profile)
    
    if form.is_valid():
        profile_obj = form.save(commit=False)
        profile_obj.save()

    context = {
        'form': form,
        'btn_label': 'Save',
        'title': 'Update Profile'
    }

    return render(request, 'frontend/profile-form.html', context)

def spot_clip_view(request, clip_id):
    context = {"clip_id": clip_id}

    return render(request, 'frontend/spotClip.html', context)

def spotbook_view(request):
    if not request.user.is_authenticated:
        return redirect('http://127.0.0.1:8000/spotbook/login/')
    else:
        context = {"username": request.user.username}
        return render(request, 'frontend/spotbook.html', context)

    
    

def test_view(request):
    context = {'content': 'special message'}
    
    return render(request, 'frontend/test.html', context)
    
