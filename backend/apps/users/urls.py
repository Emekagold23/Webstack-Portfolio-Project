from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    signup_view, login_view, logout_view, profile_view, 
    request_password_reset, reset_password_confirm, available_quizzes
)

urlpatterns = [
    path('signup/', signup_view, name='signup'),  # This will point to /api/users/signup/
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('password-reset/', request_password_reset, name='password_reset'),
    path('password-reset-confirm/', reset_password_confirm, name='password_reset_confirm'),
    path('quizzes/', available_quizzes, name='available_quizzes'),
]
