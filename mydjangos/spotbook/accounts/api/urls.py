from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('account-list/', views.accountList, name='api-account-list'),
    path('account-detail/<str:pk>', views.accountDetail, name='api-account-detail'),
    path('account-create', views.accountCreate, name='api-account-create'),
]