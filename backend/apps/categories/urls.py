from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SubtopicViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'subtopics', SubtopicViewSet, basename='subtopic')

urlpatterns = [
    path('', include(router.urls)),
]
