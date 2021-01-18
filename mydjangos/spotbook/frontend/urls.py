from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home-page'),
    path('spotmap/', views.spotmap_view, name='spotmap-page'),
    path('account/', views.account_view, name='account-page'),
    path('login/', views.login_view, name='login-page'),
    path('signup/', views.signup_view, name='signup-page'),
]