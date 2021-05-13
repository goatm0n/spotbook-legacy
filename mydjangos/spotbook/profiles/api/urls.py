from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('profile-detail/<str:username>/', views.profile_detail_view, name='detail-view'),
    

]