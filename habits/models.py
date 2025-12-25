from django.db import models

class Habit(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    progress_mark = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Habitlog(models.Model):
    habit = models.ForeignKey('Habit', on_delete=models.CASCADE,related_name='logs')
    date = models.DateField()
    progress_mark = models.BooleanField(default=False)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['habit', 'date'], name= 'unic_habit_date')
        ]
        indexes = [
            models.Index(fields=['habit', 'date']),
            models.Index(fields=['habit', 'progress_mark', 'date'])
        ]
