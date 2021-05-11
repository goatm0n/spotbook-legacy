from django.urls import path, include

urlpatterns = [
    path('api/', include('profiles.api.urls')),
]