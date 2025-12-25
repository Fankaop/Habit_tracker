
from django.template.response import TemplateResponse
from django.views.generic import TemplateView
from habits.models import Habit
class IndexView(TemplateView):
    template_name = 'core/index.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        habits = Habit.objects.all().prefetch_related('logs')
        context['habits'] = habits
        return context
