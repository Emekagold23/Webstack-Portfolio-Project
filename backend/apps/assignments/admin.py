from django.contrib import admin
from .models import Assignment

class AssignmentAdmin(admin.ModelAdmin):
    """Admin configuration for the Assignment model."""
    list_display = ('user', 'quiz', 'assigned_at', 'due_date', 'completed_at', 'is_overdue', 'is_completed')
    list_filter = ('due_date', 'completed_at')
    search_fields = ('user__username', 'quiz__title')

    def is_overdue(self, obj):
        """Check if the assignment is overdue in the admin list view."""
        return obj.is_overdue()
    is_overdue.boolean = True

    def is_completed(self, obj):
        """Check if the assignment is completed in the admin list view."""
        return obj.is_completed()
    is_completed.boolean = True

admin.site.register(Assignment, AssignmentAdmin)
