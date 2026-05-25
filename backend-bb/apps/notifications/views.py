from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        only_unread = self.request.query_params.get('unread')
        qs = Notification.objects.filter(user=self.request.user)
        if only_unread:
            qs = qs.filter(is_read=False)
        return qs


class MarkReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None):
        # Mark one or all as read
        if pk:
            Notification.objects.filter(user=request.user, pk=pk).update(is_read=True)
        else:
            Notification.objects.filter(user=request.user).update(is_read=True)
        return Response({'detail': 'Marked as read.'})


class UnreadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Notification.objects.filter(user=request.user, is_read=False).count()
        return Response({'count': count})