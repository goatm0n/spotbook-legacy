from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('clip-spot/<str:pk>/', views.clip_spot_view, name='clip-spot-view'),
]