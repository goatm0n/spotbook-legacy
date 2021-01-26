from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('spot-list/', views.spotList, name='api-spot-list'),
    path('spot-detail/<str:pk>/', views.spotDetail, name='api-spot-detail'),
    path('spot-create/', views.spotCreate, name='api-spot-create'),
]
