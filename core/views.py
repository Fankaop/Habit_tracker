from django.shortcuts import render, get_object_or_404
from django.template.response import TemplateResponse
from django.views.generic import TemplateView,DetailView
from habits.models import Habit
class IndexView(TemplateView):
    template_name = 'core/index.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        habits = Habit.objects.all().prefetch_related('logs')
        context['habits'] = habits
        return context
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        if request.headers.get('HX-Request'):
            return TemplateResponse(request, 'core/index.html', context)
        return self.render_to_response(context)
