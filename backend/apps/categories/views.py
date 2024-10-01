from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from .models import Category, Subtopic
from .serializers import CategorySerializer, SubtopicSerializer
from apps.quizzes.serializers import QuizSerializer 

class CategoryViewSet(viewsets.ModelViewSet):
    """Viewset for handling Category CRUD operations."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """List categories with optional filtering."""
        queryset = self.queryset
        search_term = request.query_params.get('search')
        
        if search_term:
            queryset = queryset.filter(name__icontains=search_term)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """Retrieve a specific category."""
        category = self.get_object()
        serializer = self.get_serializer(category)
        return Response(serializer.data)

class SubtopicViewSet(viewsets.ModelViewSet):
    """Viewset for handling Subtopic CRUD operations."""
    queryset = Subtopic.objects.all()
    serializer_class = SubtopicSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """List subtopics with optional filtering."""
        queryset = self.queryset
        category_id = request.query_params.get('category')
        
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """Retrieve a specific subtopic."""
        subtopic = self.get_object()
        serializer = self.get_serializer(subtopic)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def quizzes(self, request, pk=None):
        """Retrieve quizzes related to a specific subtopic."""
        subtopic = self.get_object()
        quizzes = subtopic.quizzes.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)
