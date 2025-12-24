from django import forms
from .models import Habit

class HabitCreateForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ['name', 'description']