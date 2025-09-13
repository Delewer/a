from django.db import models

class ScanFinding(models.Model):
    titleKey = models.CharField(max_length=100)
    statusOkThreshold = models.IntegerField(null=True, blank=True)
    detailsKey = models.CharField(max_length=200)
    recommendationKey = models.CharField(max_length=200)

    def __str__(self):
        return self.titleKey

class ChecklistQuestion(models.Model):
    section = models.ForeignKey('ChecklistSection', related_name='questions', on_delete=models.CASCADE)
    question_id = models.CharField(max_length=50, unique=True) # 'q_pol_1'
    textKey = models.CharField(max_length=200)
    law = models.CharField(max_length=50)
    question_type = models.CharField(max_length=50) # mandatory/recommended
    recKey = models.CharField(max_length=200)

    def __str__(self):
        return self.textKey

class ChecklistSection(models.Model):
    sectionKey = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.sectionKey

class Expert(models.Model):
    name = models.CharField(max_length=100)
    specKey = models.CharField(max_length=100)
    rating = models.FloatField()

    def __str__(self):
        return self.name

class Industry(models.Model):
    key = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Vendor(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=50) # green, yellow, red

    def __str__(self):
        return self.name

class Alert(models.Model):
    titleKey = models.CharField(max_length=200)
    dateKey = models.CharField(max_length=50)

    def __str__(self):
        return self.titleKey

class TrainingQuestion(models.Model):
    questionKey = models.CharField(max_length=200)
    optionsKeys = models.JSONField() # Stores a list of strings
    correct = models.IntegerField()

    def __str__(self):
        return self.questionKey

class Employee(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=50) # completed, pending
    date = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Policy(models.Model):
    titleKey = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)

    def __str__(self):
        return self.titleKey

class DrillStep(models.Model):
    titleKey = models.CharField(max_length=100)
    questionKey = models.CharField(max_length=200)
    optionsKeys = models.JSONField(null=True, blank=True)
    inputPlaceholderKey = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.titleKey