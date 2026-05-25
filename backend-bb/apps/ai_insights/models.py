# Create your models here.
from django.db import models
from django.conf import settings


class AIInsight(models.Model):
    INSIGHT_TYPES = [
        ('summary',         'Channel Summary'),
        ('recommendation',  'Performance Recommendation'),
        ('title',           'Title Suggestion'),
        ('trend',           'Trend Analysis'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ai_insights')
    insight_type = models.CharField(max_length=20, choices=INSIGHT_TYPES)
    video_id = models.CharField(max_length=20, blank=True)
    prompt = models.TextField()
    response = models.TextField()
    tokens_used = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'ai_insights'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.insight_type} – {self.user.email}"