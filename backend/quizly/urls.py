from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apps.users.views import signup_view  # Import signup view directly

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Authentication routes
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Direct signup route without include
    path('api/signup/', signup_view, name='signup'),  # Directly map the signup view

    # Other API routes
    path('api/users/', include('apps.users.urls')),  # Other user-related routes
    path('api/quizzes/', include('apps.quizzes.urls')),
    path('api/assignments/', include('apps.assignments.urls')),
    path('api/categories/', include('apps.categories.urls')),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
