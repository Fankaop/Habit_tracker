from datetime import date

from django.shortcuts import get_object_or_404, redirect
from django.db import transaction
from django.views.decorators.http import require_POST
from django.contrib import messages
from .models import Habit, Habitlog
from django.views.generic import DetailView, ListView, CreateView, DeleteView, UpdateView
from .forms import HabitCreateForm
from django.urls import reverse_lazy
class HabitListView(ListView):
    model = Habit
    template_name = 'core/list_habits.html'
    context_object_name = 'habits'

    def get_queryset(self):
        queryset = super().get_queryset()
        today = date.today()
        # Add today's completion status to each habit
        for habit in queryset:
            today_log = habit.logs.filter(date=today).first()
            habit.today_completed = today_log.progress_mark if today_log else False
        return queryset

class HabitDetailView(DetailView):
    model = Habit
    template_name = 'core/detail_habit.html'
    context_object_name = 'habit'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        today = date.today()
        context['today_log'] = self.object.logs.filter(date=today).first()
        return context

class HabitCreateView(CreateView):
    model = Habit
    form_class = HabitCreateForm
    template_name = 'core/habit_form.html'
    success_url = reverse_lazy('habits:habit_list')

class HabitUpdateView(UpdateView):
    model = Habit
    form_class = HabitCreateForm
    template_name = 'core/habit_form.html'
    success_url = reverse_lazy('habits:habit_list')

class HabitDeleteView(DeleteView):
    model = Habit
    template_name = 'core/habit_confirm_delete.html'
    success_url = reverse_lazy('habits:habit_list')

@require_POST
@transaction.atomic
def toggle_habit_done_today(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    today = date.today()

    log, created = Habitlog.objects.select_for_update().get_or_create(
        name = habit,
        date = today,
        defaults={'progress_mark': True},
    )

    if not created:
        log.progress_mark = not log.progress_mark
        log.save(update_fields=['progress_mark'])

    messages.success(
        request,
        f' {habit.name}: отмечено за {today} = {log.progress_mark}'
    )
    
    return redirect('habits:habit_detail', pk=habit.pk)
