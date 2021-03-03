from django.shortcuts import render
from django.template import Context

def home_view(request):
    return render(request, 'frontend/home.html')

def spotmap_view(request):
    return render(request, 'frontend/spotmap.html')

def createSpotFormView(request):
    return render(request, 'frontend/createSpotForm.html')

def spotpage_view(request, pk):
    context = {'spot_id': pk}
    return render(request, 'frontend/spotpage.html', context)

def upload_clip_view(request, pk):
    context = {'spot_id': pk}
    return render(request, 'frontend/uploadClip.html', context)