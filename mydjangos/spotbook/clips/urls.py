from django.urls import path, include

urlpatterns = [
    path('api/', include('clips.api.urls')),
]