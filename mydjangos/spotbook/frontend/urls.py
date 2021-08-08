from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home_view, name='home-page'),
    path('spotmap/', views.spotmap_view, name='spotmap-page'),
    path('create-spot-form/', views.createSpotFormView, name='create-spot-form-page'),
    path('spotpage/<str:pk>/', views.spotpage_view, name='spotpage-page'),
    path('upload-clip/', views.upload_clip_view, name='upload-clip-page'),
    path('upload-clip-from-spot/<str:pk>/', views.upload_clip_from_spot_view, name='upload-clip-from-spot-page'),
    path('login/', views.login_view, name='login-page'),
    path('logout/', views.logout_view, name='logout-page'),
    path('register/', views.registration_view, name='register-page'),
    path('profile/', views.profile_view, name='profile-page'),
    path('profile/<str:username>/', views.profile_detail_view, name='profile-detail-page'),
    path('profile-update/', views.profile_update_view, name='profile-update-page'),
    path('spot-clip/<str:clip_id>/', views.spot_clip_view, name='spot-clip'),
    path('test/<str:spot_id>/', views.test_view, name='test-page'),

]