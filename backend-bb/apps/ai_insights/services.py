from openai import OpenAI
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured


def _get_openai_client() -> OpenAI:
    api_key = getattr(settings, 'OPENAI_API_KEY', '')
    if not api_key:
        raise ImproperlyConfigured('OPENAI_API_KEY is not configured.')
    return OpenAI(api_key=api_key)


def _get_openai_model() -> str:
    return getattr(settings, 'OPENAI_MODEL', 'gpt-4o-mini')


def generate_channel_summary(channel_stats: dict) -> str:
    prompt = f"""
You are a YouTube analytics expert. Analyze this creator's channel data and give a 3-sentence summary of their performance, strengths, and one key opportunity.

Channel stats:
- Subscribers: {channel_stats.get('total_subscribers', 0):,}
- Total Views: {channel_stats.get('total_views', 0):,}
- Videos: {channel_stats.get('total_videos', 0)}
- Avg Engagement Rate: {channel_stats.get('avg_engagement_rate', 0)}%

Be concise, specific, and actionable. No fluff.
"""
    client = _get_openai_client()
    response = client.chat.completions.create(
        model=_get_openai_model(),
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200,
    )
    return response.choices[0].message.content.strip(), response.usage.total_tokens


def generate_recommendations(top_videos: list) -> str:
    video_list = "\n".join([
        f"- \"{v['title']}\": {v['view_count']:,} views, {v['engagement_rate']}% engagement, {v['click_through_rate']}% CTR"
        for v in top_videos[:5]
    ])
    prompt = f"""
You are a YouTube growth strategist. Based on these top-performing videos, give 3 specific, actionable recommendations to improve performance. Format as a numbered list.

Top videos:
{video_list}

Focus on content patterns, thumbnail strategy, and posting cadence. Be direct and specific.
"""
    client = _get_openai_client()
    response = client.chat.completions.create(
        model=_get_openai_model(),
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
    )
    return response.choices[0].message.content.strip(), response.usage.total_tokens


def generate_title_suggestions(video_title: str, view_count: int) -> str:
    prompt = f"""
You are a YouTube SEO expert. Given this video title and its performance, suggest 5 improved title variations that would likely get more clicks. Format as a numbered list.

Original title: "{video_title}"
Views: {view_count:,}

Make titles curiosity-driven, SEO-friendly, and under 70 characters.
"""
    client = _get_openai_client()
    response = client.chat.completions.create(
        model=_get_openai_model(),
        messages=[{"role": "user", "content": prompt}],
        max_tokens=250,
    )
    return response.choices[0].message.content.strip(), response.usage.total_tokens