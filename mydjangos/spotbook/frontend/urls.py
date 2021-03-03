from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home_view, name='home-page'),
    path('spotmap/', views.spotmap_view, name='spotmap-page'),
    path('create-spot-form/', views.createSpotFormView, name='create-spot-form-page'),
    path('spotpage/<str:pk>/', views.spotpage_view, name='spotpage-page'),
    path('upload-clip/<str:pk>/', views.upload_clip_view, name='upload-clip-page'),
    path('login/', views.login_view, name='login-page'),
    path('logout/', views.logout_view, name='logout-page'),
]