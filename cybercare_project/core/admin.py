from django.contrib import admin
from . import models

# Регистрируем модели, которые связаны с пользователем
admin.site.register(models.UserProfile)
admin.site.register(models.ScanFinding)
admin.site.register(models.ChecklistSection)
admin.site.register(models.ChecklistQuestion)

# Регистрируем модели-справочники, которые являются общими для всех
admin.site.register(models.Expert)
admin.site.register(models.Industry)

# --- ВАЖНО ---
# Мы не регистрируем здесь Vendor, Alert, Employee и т.д.,
# потому что в последней версии models.py мы их не создавали.
# Если вы решите добавить их обратно как общие модели,
# просто добавьте сюда соответствующие строки admin.site.register(...).