from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone  # Import timezone
from apps.quizzes.models import Quiz  # Adjust the import according to your project structure

class Assignment(models.Model):
    """Model to track assigned quizzes to users."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='assignments')
    assigned_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)  # Optional due date for the assignment
    completed_at = models.DateTimeField(null=True, blank=True)  # Date when the user completed the quiz

    class Meta:
        unique_together = ('user', 'quiz')  # Ensure that each quiz is assigned to a user only once

    def __str__(self):
        return f"{self.user} assigned {self.quiz}"

    def clean(self):
        """Custom validation logic."""
        if self.completed_at and self.completed_at < self.assigned_at:
            raise ValidationError("Completion date cannot be before the assignment date.")
        if self.due_date and self.completed_at and self.completed_at > self.due_date:
            raise ValidationError("Completion date cannot be after the due date.")

    def is_overdue(self):
        """Check if the assignment is overdue."""
        if self.due_date and not self.completed_at:
            return self.due_date < timezone.now()  # Use timezone.now()
        return False

    def is_completed(self):
        """Check if the assignment is completed."""
        return self.completed_at is not None

    def mark_as_completed(self):
        """Mark the assignment as completed with the current timestamp."""
        self.completed_at = timezone.now()  # Use timezone.now()
        self.save()
