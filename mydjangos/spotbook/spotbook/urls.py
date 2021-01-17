from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('spotbook/', include('frontend.urls')),
    path('backend/', include('backend.urls')),
    path('accounts/', include('accounts.urls')),
]
