from rest_framework import serializers
from .models import Category, Subtopic, Quiz, Question, Option, QuizResult


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the Category model."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class SubtopicSerializer(serializers.ModelSerializer):
    """Serializer for the Subtopic model."""
    
    category = CategorySerializer(read_only=True)  # Display category details in a nested manner

    class Meta:
        model = Subtopic
        fields = ['id', 'name', 'description', 'category']


class OptionSerializer(serializers.ModelSerializer):
    """Serializer for the Option model."""
    
    class Meta:
        model = Option
        fields = ['id', 'text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for the Question model."""
    
    options = OptionSerializer(many=True, read_only=True)  # Nested options, read-only

    class Meta:
        model = Question
        fields = ['id', 'text', 'quiz', 'options']


class QuizSerializer(serializers.ModelSerializer):
    """Serializer for the Quiz model."""
    
    subtopic = SubtopicSerializer(read_only=True)  # Nested subtopic, read-only
    questions = QuestionSerializer(many=True, read_only=True)  # Nested questions, read-only

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'subtopic', 'questions', 'time_limit']


class QuizResultSerializer(serializers.ModelSerializer):
    """Serializer for the QuizResult model."""
    
    # Display user as a string, but only include user automatically during creation
    user = serializers.StringRelatedField(read_only=True)
    quiz = QuizSerializer(read_only=True)  # Nested quiz details, read-only

    class Meta:
        model = QuizResult
        fields = ['id', 'user', 'quiz', 'score', 'total_points', 'completed_at', 'duration']

    # Adding support for the JWT-based user and customized creation logic
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user  # Retrieve the JWT-authenticated user

        # Automatically set the user for the quiz result
        validated_data['user'] = user
        return super().create(validated_data)
