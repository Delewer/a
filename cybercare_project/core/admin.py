from django.contrib import admin
from . import models

# A simple way to register all models
admin.site.register(models.ScanFinding)
admin.site.register(models.ChecklistSection)
admin.site.register(models.ChecklistQuestion)
admin.site.register(models.Expert)
admin.site.register(models.Industry)
admin.site.register(models.Vendor)
admin.site.register(models.Alert)
admin.site.register(models.TrainingQuestion)
admin.site.register(models.Employee)
admin.site.register(models.Policy)
admin.site.register(models.DrillStep)