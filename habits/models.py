from django.db import models

class Habit(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    progress_mark = models.BooleanField(default=False)

class Habitlog(models.Model):
    name = models.ForeignKey("Habit",on_delete=models.CASCADE, related_name='logs')
    date = models.DateField()
    progress_mark = models.BooleanField(default=False)
