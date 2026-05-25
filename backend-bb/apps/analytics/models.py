# Create your models here.
from django.db import models
from django.conf import settings


class ChannelSnapshot(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='channel_snapshots')
    channel_id = models.CharField(max_length=100)
    snapshot_date = models.DateField()
    subscriber_count = models.BigIntegerField(default=0)
    view_count = models.BigIntegerField(default=0)
    video_count = models.IntegerField(default=0)
    subscriber_delta = models.IntegerField(default=0)
    view_delta = models.BigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'channel_snapshots'
        unique_together = ['user', 'channel_id', 'snapshot_date']
        ordering = ['-snapshot_date']
        indexes = [
            models.Index(fields=['user', 'snapshot_date']),
        ]

    def __str__(self):
        return f"{self.channel_id} – {self.snapshot_date}"


class VideoMetric(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='video_metrics')
    video_id = models.CharField(max_length=20)
    title = models.CharField(max_length=500)
    thumbnail_url = models.URLField(blank=True)
    published_at = models.DateTimeField()
    view_count = models.BigIntegerField(default=0)
    like_count = models.BigIntegerField(default=0)
    comment_count = models.BigIntegerField(default=0)
    avg_view_duration = models.FloatField(default=0)
    click_through_rate = models.FloatField(default=0)
    impressions = models.BigIntegerField(default=0)
    engagement_rate = models.FloatField(default=0)
    last_synced = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'video_metrics'
        unique_together = ['user', 'video_id']
        ordering = ['-published_at']

    def save(self, *args, **kwargs):
        if self.view_count > 0:
            self.engagement_rate = round(
                (self.like_count + self.comment_count) / self.view_count * 100, 2
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title[:50]}"