from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    ScanFinding, ChecklistSection, Expert, Industry, Vendor, Alert,
    TrainingQuestion, Employee, Policy, DrillStep
)
from .serializers import (
    ScanFindingSerializer, ChecklistSectionSerializer, ExpertSerializer,
    IndustrySerializer, VendorSerializer, AlertSerializer,
    TrainingQuestionSerializer, EmployeeSerializer, PolicySerializer, DrillStepSerializer
)

def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def mock_data_api(request):
    """
    This API endpoint gathers all data from the database and structures it
    to match the original mockData object from main.js.
    """
    data = {
        'scanFindings': ScanFindingSerializer(ScanFinding.objects.all(), many=True).data,
        'checklist': ChecklistSectionSerializer(ChecklistSection.objects.prefetch_related('questions').all(), many=True).data,
        'experts': ExpertSerializer(Expert.objects.all(), many=True).data,
        'industries': IndustrySerializer(Industry.objects.all(), many=True).data,
        'vendors': VendorSerializer(Vendor.objects.all(), many=True).data,
        'alerts': AlertSerializer(Alert.objects.all(), many=True).data,
        'trainingQuestions': TrainingQuestionSerializer(TrainingQuestion.objects.all(), many=True).data,
        'employees': EmployeeSerializer(Employee.objects.all(), many=True).data,
        'policies': PolicySerializer(Policy.objects.all(), many=True).data,
        'drillSteps': DrillStepSerializer(DrillStep.objects.all(), many=True).data,
    }
    return Response(data)