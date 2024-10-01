from django.db import models
from django.conf import settings
from django.utils import timezone

class Category(models.Model):
    """Represents a category for quizzes (e.g., Math, Science, Tech)."""
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Subtopic(models.Model):
    """Represents a subtopic within a category (e.g., Algebra, Physics)."""
    category = models.ForeignKey(Category, related_name='subtopics', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.category.name})"

    class Meta:
        ordering = ['name']


class Quiz(models.Model):
    """Represents a quiz for a particular subtopic."""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    subtopic = models.ForeignKey(Subtopic, related_name='quizzes', on_delete=models.CASCADE, null=False)  # Enforce not null
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']
