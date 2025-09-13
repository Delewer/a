from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.index, name='index'),
    path('api/data/', views.mock_data_api, name='mock_data_api'),

    # Новая структура URL для аутентификации
    path('', views.auth_view, name='auth_view'),       # Отображает страницу
    path('login/', views.login_user, name='login'),      # Обрабатывает POST-запрос на вход
    path('register/', views.register_user, name='register'), # Обрабатывает POST-запрос на регистрацию
    path('logout/', views.logout_view, name='logout'),
]