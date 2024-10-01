from rest_framework import serializers
from .models import Assignment
from apps.quizzes.models import Quiz
from apps.users.models import User

class AssignmentSerializer(serializers.ModelSerializer):
    """Serializer for handling Assignment data."""
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())
    assigned_at = serializers.DateTimeField(read_only=True)
    completed_at = serializers.DateTimeField(required=False, allow_null=True)

    class Meta:
        model = Assignment
        fields = ['id', 'user', 'quiz', 'assigned_at', 'due_date', 'completed_at']

    def validate(self, data):
        """Custom validation for assignment data."""
        user = self.context['request'].user
        quiz = data.get('quiz')
        if Assignment.objects.filter(user=user, quiz=quiz).exists():
            raise serializers.ValidationError("This quiz is already assigned to the user.")
        return data

    def create(self, validated_data):
        """Custom creation logic for assignments."""
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """Custom update logic for assignments."""
        if validated_data.get('completed_at') and not instance.completed_at:
            instance.completed_at = validated_data['completed_at']
        return super().update(instance, validated_data)
