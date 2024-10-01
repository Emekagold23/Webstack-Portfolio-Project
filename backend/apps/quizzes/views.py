from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, PermissionDenied

from .models import Category, Subtopic, Quiz, Question, Option, QuizResult
from .serializers import (
    CategorySerializer, SubtopicSerializer, QuizSerializer,
    QuestionSerializer, OptionSerializer, QuizResultSerializer
)

class IsSuperUser(permissions.BasePermission):
    """Custom permission to only allow superusers to create/update/delete quizzes."""
    
    def has_permission(self, request, view):
        # Only superusers can create, update, or delete
        if request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return request.user.is_superuser
        return True

class CategoryViewSet(viewsets.ModelViewSet):
    """Viewset for handling Category CRUD operations."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # JWT Auth here

class SubtopicViewSet(viewsets.ModelViewSet):
    """Viewset for handling Subtopic CRUD operations."""
    queryset = Subtopic.objects.all()
    serializer_class = SubtopicSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # JWT Auth here

class QuizViewSet(viewsets.ModelViewSet):
    """
    Viewset for handling Quiz CRUD operations. 
    Only superusers can create/edit/delete quizzes, users can only view and take them.
    """
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]  # JWT and superuser check

    def perform_create(self, serializer):
        """Only superusers can create quizzes."""
        if not self.request.user.is_superuser:
            raise PermissionDenied("You do not have permission to create a quiz.")
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def questions(self, request, pk=None):
        """Retrieve questions for a specific quiz."""
        quiz = self.get_object()
        questions = quiz.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def submit(self, request, pk=None):
        """
        Custom action for submitting quiz answers and grading.
        Any authenticated user can submit answers.
        """
        quiz = self.get_object()
        user = request.user

        # Retrieve the user's answers from the request data
        answers = request.data.get('answers', {})
        if not answers:
            return Response({'error': 'No answers provided.'}, status=status.HTTP_400_BAD_REQUEST)

        total_points = 0
        correct_answers = 0

        # Loop through each question in the quiz and compare the user's answer with the correct option
        for question in quiz.questions.all():
            user_answer = answers.get(str(question.id))  # Expecting answers in the form {question_id: option_id}
            correct_option = question.options.filter(is_correct=True).first()

            if correct_option and user_answer == str(correct_option.id):
                correct_answers += 1
            total_points += question.points  # Ensure 'points' is defined in your Question model

        # Calculate the user's score
        score = correct_answers

        # Create a QuizResult entry for the user
        quiz_result = QuizResult.objects.create(
            quiz=quiz,
            user=user,
            score=score,
            total_points=total_points
        )

        result_data = QuizResultSerializer(quiz_result).data
        return Response({'message': 'Quiz submitted successfully!', 'result': result_data}, status=status.HTTP_201_CREATED)

class QuestionViewSet(viewsets.ModelViewSet):
    """Viewset for handling Question CRUD operations."""
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]  # Only superusers can modify

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def options(self, request, pk=None):
        """Retrieve options for a specific question."""
        question = self.get_object()
        options = question.options.all()
        serializer = OptionSerializer(options, many=True)
        return Response(serializer.data)

class OptionViewSet(viewsets.ModelViewSet):
    """Viewset for handling Option CRUD operations."""
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]  # Only superusers can modify

class QuizResultViewSet(viewsets.ModelViewSet):
    """Viewset for handling QuizResult CRUD operations."""
    queryset = QuizResult.objects.all()
    serializer_class = QuizResultSerializer
    permission_classes = [permissions.IsAuthenticated]  # All users can see their own results

    def create(self, request, *args, **kwargs):
        """Override create method to handle custom logic if needed."""
        return super().create(request, *args, **kwargs)
