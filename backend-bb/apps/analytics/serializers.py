from rest_framework import serializers
from .models import ChannelSnapshot, VideoMetric


class ChannelSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelSnapshot
        fields = [
            'id', 'channel_id', 'snapshot_date',
            'subscriber_count', 'view_count', 'video_count',
            'subscriber_delta', 'view_delta',
        ]


class VideoMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMetric
        fields = [
            'id', 'video_id', 'title', 'thumbnail_url', 'published_at',
            'view_count', 'like_count', 'comment_count',
            'avg_view_duration', 'click_through_rate',
            'impressions', 'engagement_rate', 'last_synced',
        ]