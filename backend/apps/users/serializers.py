from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation, authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile

User = get_user_model()

### User and Profile Serializers ###

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model."""
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['highest_score', 'last_quiz_date', 'user']


### User Signup Serializer ###

class UserSignupSerializer(serializers.ModelSerializer):
    """Serializer for user signup."""
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords must match."})

        # Validate password using Django's built-in validators
        password_validation.validate_password(attrs['password'])

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user


### User Login Serializer ###

class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username or not password:
            raise serializers.ValidationError({"detail": "Both 'username' and 'password' are required."})

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError({"detail": "Invalid login credentials. Please check your username and password."})

        if not user.is_active:
            raise serializers.ValidationError({"detail": "This account is inactive."})

        attrs['user'] = user
        return attrs


### JWT Token Generation Serializer ###

class TokenSerializer(serializers.Serializer):
    """Serializer to generate JWT tokens."""
    @staticmethod
    def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


### Password Reset Functionality ###

class PasswordResetRequestSerializer(serializers.Serializer):
    """Serializer for requesting password reset."""
    email = serializers.EmailField()

    def validate_email(self, value):
        """Validate the existence of the user by email."""
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user is associated with this email.")
        return value

    def save(self):
        """Generate password reset link and send email."""
        user = User.objects.get(email=self.validated_data['email'])
        token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Send password reset email
        reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"
        send_mail(
            'Password Reset Request',
            f"Use this link to reset your password: {reset_link}",
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for confirming password reset."""
    new_password = serializers.CharField(write_only=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """Validate the password reset token and user."""
        try:
            uid = force_str(urlsafe_base64_decode(attrs['uidb64']))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError('Invalid user.')

        if not PasswordResetTokenGenerator().check_token(user, attrs['token']):
            raise serializers.ValidationError('Invalid token.')

        password_validation.validate_password(attrs['new_password'], user)
        return attrs

    def save(self, validated_data):
        """Reset the user's password."""
        uid = force_str(urlsafe_base64_decode(validated_data['uidb64']))
        user = User.objects.get(pk=uid)
        user.password = make_password(validated_data['new_password'])
        user.save()
        return user
