from rest_framework import serializers
from .models import (
    ScanFinding, ChecklistSection, ChecklistQuestion, Expert, Industry, Vendor,
    Alert, TrainingQuestion, Employee, Policy, DrillStep
)

class ScanFindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanFinding
        fields = ['titleKey', 'statusOkThreshold', 'detailsKey', 'recommendationKey']

class ChecklistQuestionSerializer(serializers.ModelSerializer):
    # Rename fields to match JS camelCase
    id = serializers.CharField(source='question_id')
    type = serializers.CharField(source='question_type')
    
    class Meta:
        model = ChecklistQuestion
        fields = ['id', 'textKey', 'law', 'type', 'recKey']

class ChecklistSectionSerializer(serializers.ModelSerializer):
    questions = ChecklistQuestionSerializer(many=True)

    class Meta:
        model = ChecklistSection
        fields = ['sectionKey', 'questions']

class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = ['name', 'specKey', 'rating']

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['key', 'name']

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['name', 'status']

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['titleKey', 'dateKey']

class TrainingQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingQuestion
        fields = ['questionKey', 'optionsKeys', 'correct']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['name', 'status', 'date']

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = ['titleKey', 'icon']

class DrillStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrillStep
        fields = ['titleKey', 'questionKey', 'optionsKeys', 'inputPlaceholderKey']