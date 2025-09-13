# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/data/', views.mock_data_api, name='mock_data_api'), # Новый URL
]