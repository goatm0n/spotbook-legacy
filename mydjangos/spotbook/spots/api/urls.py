from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('spot-list/', views.spotList, name='api-spot-list'),
    path('spot-detail/<str:pk>/', views.spotDetail, name='api-spot-detail'),
    path('spot-create/', views.spot_create, name='api-spot-create'),
    path('spot-user/<str:username>/', views.spot_user_view, name='api-spot-user'),
    path('spot-like/<str:spot_id>/', views.spot_like_toggle_view, name='api-spot-like'),
    path('follow/<str:spot_id>/', views.spot_follow_view, name='follow-spot-api'),
    path('followers/<str:spot_id>/', views.spot_followers, name='spot-followers-api'),
    path('does-user-follow/<str:spot_id>/', views.does_user_follow, name='does-user-follow-spot-api'),


]
