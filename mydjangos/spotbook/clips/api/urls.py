from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('clip-spot/<str:pk>/', views.clip_spot_view, name='clip-spot-view'),
    path('clip-create/', views.clip_create_view, name='clip-create-view'),
    path('clip-list/', views.clip_list_view, name='clip-list-view'),
    path('clip-list/<str:username>/', views.clip_list_username_view, name='clip-list-by-username'),
    path('clip-list/<str:spot_id>/', views.clip_list_spot_view, name='clip-list-by-spot'),
    path('clip-detail/<str:pk>/', views.clip_detail_view, name='clip-detail-view'),
    path('clip-user/<str:username>/', views.clip_user_view, name='clip-user-view'),
    path('clip-like/<str:clip_id>/', views.clip_like_toggle_view, name='clip-like-toggle-view'),
    path('clip-like-action/<str:clip_id>/', views.clip_like_action_view, name='api-clip-like-action-view'),
    path('does-user-like/<str:clip_id>/', views.does_user_like, name='check user likes spot'),
    path('likes-count/<str:clip_id>/', views.clip_likes_count_view, name='api-clip-likes-count'),
    
    
]