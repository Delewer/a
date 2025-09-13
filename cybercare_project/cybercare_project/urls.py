from django.contrib import admin
from django.urls import path, include
# --- Добавьте эти две строки ---
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

# --- Добавьте этот блок в конец ---
# Эта строка нужна, чтобы сервер разработки мог отдавать статические файлы
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)