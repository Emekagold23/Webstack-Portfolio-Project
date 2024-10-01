from rest_framework import serializers
from .models import Category, Subtopic
from apps.quizzes.models import Quiz

class CategorySerializer(serializers.ModelSerializer):
    """Serializer for handling Category data."""

    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

    def validate(self, data):
        """Custom validation for Category data."""
        # Ensure unique category name
        if 'name' in data and Category.objects.filter(name=data['name']).exists():
            raise serializers.ValidationError("A category with this name already exists.")
        return data


class SubtopicSerializer(serializers.ModelSerializer):
    """Serializer for handling Subtopic data."""
    
    # Ensure related category can be assigned by primary key
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    
    # Use SerializerMethodField to get related quizzes
    quizzes = serializers.SerializerMethodField()

    class Meta:
        model = Subtopic
        fields = ['id', 'name', 'category', 'description', 'quizzes']

    def validate(self, data):
        """Custom validation for Subtopic data."""
        # Ensure unique subtopic name within the same category
        if 'name' in data and Subtopic.objects.filter(name=data['name'], category=data['category']).exists():
            raise serializers.ValidationError("A subtopic with this name already exists in this category.")
        return data

    def get_quizzes(self, obj):
        """Retrieve quizzes related to the subtopic."""
        # Import the QuizSerializer here to avoid circular imports
        from apps.quizzes.serializers import QuizSerializer
        quizzes = obj.quizzes.all()
        serializer = QuizSerializer(quizzes, many=True)
        return serializer.data
