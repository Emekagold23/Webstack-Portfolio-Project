from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'assignments', AssignmentViewSet, basename='assignment')

urlpatterns = [
    path('', include(router.urls)),
]
