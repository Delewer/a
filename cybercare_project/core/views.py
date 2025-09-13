from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import CustomUserCreationForm # Импортируем нашу новую форму

# ... импорты для API и моделей остаются ...
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ScanFinding, ChecklistSection, Expert, Industry # и т.д.
from .serializers import ScanFindingSerializer, ChecklistSectionSerializer, ExpertSerializer, IndustrySerializer # и т.д.

def auth_view(request):
    if request.user.is_authenticated:
        return redirect('index')

    context = {
        'login_form': {'username': ''},
        'register_form': CustomUserCreationForm() # Используем нашу форму
    }
    return render(request, 'login.html', context)

def login_user(request):
    # ... логика входа остается без изменений ...
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Nume de utilizator sau parolă incorectă.')
            context = {'login_form': {'username': username}, 'register_form': CustomUserCreationForm()}
            return render(request, 'login.html', context)
    return redirect('auth_view')


def register_user(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST) # Используем нашу форму
        if form.is_valid():
            user = form.save()
            # Сохраняем сайт в профиль пользователя
            user.userprofile.website_domain = form.cleaned_data['website_domain']
            user.userprofile.save()
            
            # TODO: Здесь можно запустить первоначальное сканирование сайта
            # и наполнение базы данных для нового пользователя
            
            login(request, user)
            messages.success(request, 'Cont creat cu succes! Bine ați venit!')
            return redirect('index')
        else:
            context = {
                'login_form': {'username': ''},
                'register_form': form,
                'show_register': True
            }
            messages.error(request, 'Vă rugăm să corectați erorile de mai jos.')
            return render(request, 'login.html', context)
    return redirect('auth_view')

def logout_view(request):
    # ... без изменений ...
    logout(request)
    return redirect('auth_view')

@login_required(login_url='/')
def index(request):
    # Передаем домен пользователя в шаблон, чтобы отобразить его в dashboard
    user_domain = request.user.userprofile.website_domain
    return render(request, 'index.html', {'user_domain': user_domain})

@api_view(['GET'])
@login_required
def mock_data_api(request):
    profile = request.user.userprofile

    # --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: ФИЛЬТРУЕМ ДАННЫЕ ---
    # Мы берем только те данные, которые связаны с профилем текущего пользователя
    scan_findings = ScanFinding.objects.filter(user_profile=profile)
    checklist = ChecklistSection.objects.filter(user_profile=profile).prefetch_related('questions')
    
    # Данные-справочники остаются общими
    experts = Expert.objects.all()
    industries = Industry.objects.all()

    data = {
        'scanFindings': ScanFindingSerializer(scan_findings, many=True).data,
        'checklist': ChecklistSectionSerializer(checklist, many=True).data,
        'experts': ExpertSerializer(experts, many=True).data,
        'industries': IndustrySerializer(industries, many=True).data,
        # ... добавьте сюда остальные сериализаторы для общих данных ...
    }
    return Response(data)