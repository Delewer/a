from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Новая модель для хранения сайта пользователя
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    website_domain = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.username

# Сигналы для автоматического создания/обновления профиля
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


# --- ОБНОВЛЕНИЕ ВСЕХ СУЩЕСТВУЮЩИХ МОДЕЛЕЙ ---
# Мы добавляем ForeignKey к UserProfile в каждую модель

class ScanFinding(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='scan_findings')
    titleKey = models.CharField(max_length=100)
    statusOkThreshold = models.IntegerField(null=True, blank=True)
    detailsKey = models.CharField(max_length=200)
    recommendationKey = models.CharField(max_length=200)

class ChecklistSection(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='checklist_sections')
    sectionKey = models.CharField(max_length=100)
    # Уникальность теперь должна быть в рамках одного пользователя
    class Meta:
        unique_together = ('user_profile', 'sectionKey')

# У ChecklistQuestion связь с UserProfile будет через ChecklistSection
class ChecklistQuestion(models.Model):
    section = models.ForeignKey('ChecklistSection', related_name='questions', on_delete=models.CASCADE)
    question_id = models.CharField(max_length=50)
    textKey = models.CharField(max_length=200)
    law = models.CharField(max_length=50)
    question_type = models.CharField(max_length=50)
    recKey = models.CharField(max_length=200)

# Остальные модели делаем общими (не привязанными к пользователю),
# так как они выглядят как справочники
class Expert(models.Model):
    name = models.CharField(max_length=100)
    specKey = models.CharField(max_length=100)
    rating = models.FloatField()

class Industry(models.Model):
    key = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    
# ... и так далее для Vendor, Alert, TrainingQuestion, Employee, Policy, DrillStep
# Их можно оставить без изменений, если они являются общими для всех пользователей
# Если же, например, "Сотрудники" у каждого бизнеса свои, то им тоже нужно добавить
# user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)