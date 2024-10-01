from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta


class Category(models.Model):
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']


class Subtopic(models.Model):
    category = models.ForeignKey(Category, related_name='subtopics', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']


class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    subtopic = models.ForeignKey(Subtopic, related_name='quizzes', on_delete=models.CASCADE)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_quizzes', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    time_limit = models.DurationField(default=timedelta(minutes=30))

    def __str__(self):
        return self.title

    def publish(self):
        self.published_at = timezone.now()
        self.save()

    def get_end_time(self):
        if self.published_at:
            return self.published_at + self.time_limit
        return None

    class Meta:
        ordering = ['-created_at']


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    points = models.PositiveIntegerField(default=1)
    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Question {self.order} for {self.quiz.title}"

    class Meta:
        ordering = ['quiz', 'order']


class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ['question', 'id']


class QuizResult(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='results', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='quiz_results', on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    total_points = models.PositiveIntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)
    duration = models.DurationField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - Score: {self.score}"

    @property
    def percentage_score(self):
        if self.total_points > 0:
            return (self.score / self.total_points) * 100
        return 0

    class Meta:
        ordering = ['-completed_at']
