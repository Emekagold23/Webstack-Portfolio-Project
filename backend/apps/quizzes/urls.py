from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, SubtopicViewSet, QuizViewSet, 
    QuestionViewSet, OptionViewSet, QuizResultViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'subtopics', SubtopicViewSet, basename='subtopic')
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'options', OptionViewSet, basename='option')
router.register(r'quiz-results', QuizResultViewSet, basename='quizresult')

urlpatterns = [
    path('', include(router.urls)),
]
