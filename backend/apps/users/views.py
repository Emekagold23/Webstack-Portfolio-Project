import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model, logout, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserSerializer, ProfileSerializer,
    PasswordResetRequestSerializer, PasswordResetConfirmSerializer,
    UserSignupSerializer
)
from apps.quizzes.models import Quiz

# Set up logging
logger = logging.getLogger(__name__)
User = get_user_model()

# Helper method to handle error logging and responses
def handle_error(message, exception=None, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR):
    if exception:
        logger.error(f"{message}: {str(exception)}")
    return Response({'error': message}, status=status_code)

# Helper function to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    """User signup view."""
    try:
        username = request.data.get('username')
        
        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            error_message = f"A user with that username '{username}' already exists."
            logger.error(error_message)
            return Response({'errors': {'username': [error_message]}}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Signup successful',
                'user': UserSerializer(user).data,
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)

        # Log validation errors for debugging
        logger.error(f"Signup validation errors: {serializer.errors}")
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return handle_error('An error occurred during signup.', e)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """User login view using JWT tokens."""
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Validate input
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            tokens = get_tokens_for_user(user)
            return Response({
                'message': 'Login successful',
                'tokens': tokens,
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials. Please check your username and password.'}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return handle_error('An error occurred during login.', e)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """User logout view with JWT token handling."""
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the token, effectively logging out the user
            except Exception as e:
                return handle_error('Invalid or expired refresh token.', e)

        logout(request)  # Log the user out of Django session
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

    except Exception as e:
        return handle_error('An error occurred during logout.', e)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """View or update user profile."""
    try:
        profile = request.user.profile
        if request.method == 'GET':
            return Response(ProfileSerializer(profile).data)

        if request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return handle_error('An error occurred during profile update.', e)

@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    """Request password reset."""
    try:
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password reset link sent.'}, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return handle_error('An error occurred during password reset request.', e)

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_confirm(request):
    """Confirm password reset."""
    try:
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return handle_error('An error occurred during password reset confirmation.', e)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def available_quizzes(request):
    """Fetch available quizzes for users to test their knowledge."""
    try:
        quizzes = Quiz.objects.all()  # Fetch all available quizzes
        quiz_data = [{'title': quiz.title, 'description': quiz.description} for quiz in quizzes]
        return Response({'quizzes': quiz_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return handle_error('An error occurred while fetching quizzes.', e)
