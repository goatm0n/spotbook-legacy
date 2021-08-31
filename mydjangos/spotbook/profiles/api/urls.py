from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('profile-detail/<str:username>/', views.profile_detail_view, name='detail-view'),
    path('<str:username>/follow', views.user_follow_view, name='api-profile-follow'), 
    path('followers/<str:username>/', views.user_followers, name='profile-following'),
    path('does-user-follow/<str:targetUsername>/', views.does_user_follow, name='api-does-user-follow'),
    path('user-following-profiles/<str:username>/', views.user_following_profiles_list, name='api-following-profiles-list'),
    path('user-following-spots/<str:username>/', views.user_following_spots_list, name='api-user-following-spots-list'),
    
]