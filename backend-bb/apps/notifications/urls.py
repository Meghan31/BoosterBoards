from django.urls import path
from .views import NotificationListView, MarkReadView, UnreadCountView

urlpatterns = [
    path('',              NotificationListView.as_view(), name='notifications'),
    path('unread/',       UnreadCountView.as_view(),      name='unread-count'),
    path('mark-read/',    MarkReadView.as_view(),         name='mark-all-read'),
    path('<int:pk>/read/', MarkReadView.as_view(),        name='mark-read'),
]