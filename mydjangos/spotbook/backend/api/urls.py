from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('spot-list/', views.spotList, name='spot-list'),
    path('spot-detail/<str:pk>/', views.spotDetail, name='spot-detail'),
    path('spot-create/', views.spotCreate, name='spot-create'),
]
