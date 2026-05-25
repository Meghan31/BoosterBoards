from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from apps.analytics.models import VideoMetric, ChannelSnapshot
from apps.analytics.serializers import VideoMetricSerializer
from .models import AIInsight
from .services import generate_channel_summary, generate_recommendations, generate_title_suggestions


class ChannelSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Return cached insight if recent
        cached = AIInsight.objects.filter(
            user=request.user, insight_type='summary'
        ).first()
        if cached:
            return Response({'insight': cached.response, 'cached': True})
        return Response({'insight': None, 'cached': False})

    def post(self, request):
        user = request.user
        latest = ChannelSnapshot.objects.filter(user=user).order_by('-snapshot_date').first()
        videos = VideoMetric.objects.filter(user=user)

        stats = {
            'total_subscribers': latest.subscriber_count if latest else 0,
            'total_views': sum(v.view_count for v in videos),
            'total_videos': videos.count(),
            'avg_engagement_rate': round(
                sum(v.engagement_rate for v in videos) / videos.count(), 2
            ) if videos.count() > 0 else 0,
        }

        try:
            text, tokens = generate_channel_summary(stats)
            AIInsight.objects.create(
                user=user, insight_type='summary',
                prompt=str(stats), response=text, tokens_used=tokens
            )
            return Response({'insight': text, 'cached': False})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RecommendationsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        videos = VideoMetric.objects.filter(user=user).order_by('-view_count')[:5]
        video_data = VideoMetricSerializer(videos, many=True).data

        try:
            text, tokens = generate_recommendations(video_data)
            AIInsight.objects.create(
                user=user, insight_type='recommendation',
                prompt=str(video_data), response=text, tokens_used=tokens
            )
            return Response({'recommendations': text})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TitleSuggestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        video_id = request.data.get('video_id')
        try:
            video = VideoMetric.objects.get(user=request.user, video_id=video_id)
        except VideoMetric.DoesNotExist:
            return Response({'error': 'Video not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            text, tokens = generate_title_suggestions(video.title, video.view_count)
            AIInsight.objects.create(
                user=request.user, insight_type='title',
                video_id=video_id, prompt=video.title, response=text, tokens_used=tokens
            )
            return Response({'suggestions': text})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
