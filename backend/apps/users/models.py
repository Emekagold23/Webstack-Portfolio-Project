from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    total_score = models.IntegerField(default=0)  # Tracks total score from all quizzes
    quizzes_taken = models.IntegerField(default=0)  # Number of quizzes taken by user

    # Ensure unique related names for the reverse accessors
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Change this
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',  # Change this
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    highest_score = models.IntegerField(default=0)  # User's highest score on any quiz
    last_quiz_date = models.DateTimeField(blank=True, null=True)  # Last quiz attempt date

    def __str__(self):
        return f"{self.user.username}'s Profile"
