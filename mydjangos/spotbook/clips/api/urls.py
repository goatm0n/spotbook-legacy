from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('clip-spot/<str:pk>/', views.clip_spot_view, name='clip-spot-view'),
    path('clip-create/', views.clip_create_view, name='clip-create-view'),
    path('clip-list/', views.clip_list_view, name='clip-list-view'),
    path('clip-detail/<str:pk>/', views.clip_detail_view, name='clip-detail-view'),
    path('clip-user/<str:username>/', views.clip_user_view, name='clip-user-view'),
    
]