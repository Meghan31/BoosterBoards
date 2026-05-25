from django.urls import path
from .views import ChannelSummaryView, RecommendationsView, TitleSuggestionsView

urlpatterns = [
    path('summary/',         ChannelSummaryView.as_view(),   name='ai-summary'),
    path('recommendations/', RecommendationsView.as_view(),  name='ai-recommendations'),
    path('titles/',          TitleSuggestionsView.as_view(), name='ai-titles'),
]