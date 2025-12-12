from django.shortcuts import render, get_object_or_404
from django.template.response import TemplateResponse
from django.views.generic import TemplateView,DetailView

class IndexView(TemplateView):
    template_name = 'core/base.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
#/////////////////////
        return context
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        if request.headers.get('HX-Request'):
            return TemplateResponse(request, 'core/index.html', context)
        return TemplateResponse(request, 'core/base.html', context)

