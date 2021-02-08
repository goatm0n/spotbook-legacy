from django.urls import path, include

urlpatterns = [
    path('api/', include('spots.api.urls')),
]