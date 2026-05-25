from django.urls import path
from .views import DashboardSummaryView, VideoMetricListView, ChannelGrowthView

urlpatterns = [
    path('dashboard/', DashboardSummaryView.as_view(), name='analytics-dashboard'),
    path('videos/',    VideoMetricListView.as_view(),  name='analytics-videos'),
    path('growth/',    ChannelGrowthView.as_view(),    name='analytics-growth'),
]