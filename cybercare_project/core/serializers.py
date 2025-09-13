from rest_framework import serializers
from .models import (
    ScanFinding, ChecklistSection, ChecklistQuestion, Expert, Industry
)

class ScanFindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanFinding
        fields = ['titleKey', 'statusOkThreshold', 'detailsKey', 'recommendationKey']

class ChecklistQuestionSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='question_id')
    type = serializers.CharField(source='question_type')
    
    class Meta:
        model = ChecklistQuestion
        fields = ['id', 'textKey', 'law', 'type', 'recKey']

class ChecklistSectionSerializer(serializers.ModelSerializer):
    questions = ChecklistQuestionSerializer(many=True, read_only=True)

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