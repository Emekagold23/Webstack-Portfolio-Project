from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, PermissionDenied
from django.utils import timezone
from .models import Assignment
from .serializers import AssignmentSerializer
from apps.quizzes.models import Quiz
from apps.users.models import User  # Adjust import according to your project structure

class AssignmentViewSet(viewsets.ModelViewSet):
    """Viewset for handling Assignment CRUD operations and custom actions."""
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        """Custom logic for creating assignments."""
        # Check if the assignment already exists
        user = self.request.user
        quiz = serializer.validated_data.get('quiz')
        if Assignment.objects.filter(user=user, quiz=quiz).exists():
            raise PermissionDenied("This quiz is already assigned to the user.")
        serializer.save()

    @action(detail=True, methods=['get'])
    def overdue(self, request, pk=None):
        """Check if a specific assignment is overdue."""
        try:
            assignment = self.get_object()
            if assignment.is_overdue():
                return Response({'status': 'Overdue'}, status=status.HTTP_200_OK)
            return Response({'status': 'On time'}, status=status.HTTP_200_OK)
        except Assignment.DoesNotExist:
            raise NotFound("Assignment not found")

    @action(detail=True, methods=['get'])
    def completed(self, request, pk=None):
        """Check if a specific assignment is completed."""
        try:
            assignment = self.get_object()
            if assignment.is_completed():
                return Response({'status': 'Completed'}, status=status.HTTP_200_OK)
            return Response({'status': 'Not completed'}, status=status.HTTP_200_OK)
        except Assignment.DoesNotExist:
            raise NotFound("Assignment not found")

    def list(self, request, *args, **kwargs):
        """List assignments with filtering options."""
        user = request.user
        queryset = self.queryset.filter(user=user)  # Filter assignments by the current user

        # Optionally, add additional filtering logic
        due_date = request.query_params.get('due_date')
        if due_date:
            queryset = queryset.filter(due_date=due_date)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """Create a new assignment with custom logic."""
        # Additional custom logic before creating the assignment
        user = request.user
        quiz_id = request.data.get('quiz')
        if not Quiz.objects.filter(id=quiz_id).exists():
            return Response({'error': 'Quiz does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the quiz is already assigned
        if Assignment.objects.filter(user=user, quiz_id=quiz_id).exists():
            return Response({'error': 'Assignment already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Update an existing assignment with custom logic."""
        assignment = self.get_object()

        # Optionally, add custom logic for updates
        # E.g., check if due_date or other fields are being updated correctly

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete an assignment with custom logic."""
        assignment = self.get_object()
        
        # Optionally, add custom logic for deletion
        # E.g., check if the assignment can be deleted

        return super().destroy(request, *args, **kwargs)

    # Helper methods to be used in custom logic
    def is_overdue(self):
        """Determine if the assignment is overdue."""
        if self.due_date and self.completed_at is None:
            return timezone.now() > self.due_date
        return False

    def is_completed(self):
        """Determine if the assignment is completed."""
        return self.completed_at is not None
