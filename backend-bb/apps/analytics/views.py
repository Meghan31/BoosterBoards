from django.shortcuts import render

# Create your views here.
from django.db.models import Avg, Sum
from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import ChannelSnapshot, VideoMetric
from .serializers import ChannelSnapshotSerializer, VideoMetricSerializer


class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        days = int(request.query_params.get('days', 30))
        since = timezone.now().date() - timedelta(days=days)

        latest = ChannelSnapshot.objects.filter(user=user).order_by('-snapshot_date').first()
        growth = ChannelSnapshot.objects.filter(user=user, snapshot_date__gte=since).order_by('snapshot_date')
        videos = VideoMetric.objects.filter(user=user)
        top_videos = videos.order_by('-view_count')[:10]
        agg = videos.aggregate(avg_engagement=Avg('engagement_rate'), total_views=Sum('view_count'))

        return Response({
            'total_views':        agg.get('total_views') or 0,
            'total_subscribers':  latest.subscriber_count if latest else 0,
            'total_videos':       videos.count(),
            'avg_engagement_rate': round(agg.get('avg_engagement') or 0, 2),
            'top_videos':         VideoMetricSerializer(top_videos, many=True).data,
            'subscriber_growth':  ChannelSnapshotSerializer(growth, many=True).data,
        })


class VideoMetricListView(generics.ListAPIView):
    serializer_class = VideoMetricSerializer
    permission_classes = [IsAuthenticated]

    SORT_MAP = {
        'views': '-view_count',
        'likes': '-like_count',
        'comments': '-comment_count',
        'engagement': '-engagement_rate',
        'recent': '-published_at',
    }

    def get_queryset(self):
        sort = self.request.query_params.get('sort', 'views')
        return VideoMetric.objects.filter(
            user=self.request.user
        ).order_by(self.SORT_MAP.get(sort, '-view_count'))


class ChannelGrowthView(generics.ListAPIView):
    serializer_class = ChannelSnapshotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        days = int(self.request.query_params.get('days', 30))
        since = timezone.now().date() - timedelta(days=days)
        return ChannelSnapshot.objects.filter(
            user=self.request.user,
            snapshot_date__gte=since
        ).order_by('snapshot_date')