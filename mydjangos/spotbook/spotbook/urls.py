from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('spotbook/', include('frontend.urls')),
    path('spots/', include('spots.urls')),
    path('accounts/', include('accounts.urls')),
    path('clips/', include('clips.urls')),
]
