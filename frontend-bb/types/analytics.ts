export interface ChannelSnapshot {
	id: number;
	channel_id: string;
	snapshot_date: string;
	subscriber_count: number;
	view_count: number;
	video_count: number;
	subscriber_delta: number;
	view_delta: number;
}

export interface VideoMetric {
	id: number;
	video_id: string;
	title: string;
	thumbnail_url: string;
	published_at: string;
	view_count: number;
	like_count: number;
	comment_count: number;
	avg_view_duration: number;
	click_through_rate: number;
	impressions: number;
	engagement_rate: number;
	last_synced: string;
}

export interface DashboardSummary {
	total_views: number;
	total_subscribers: number;
	total_videos: number;
	avg_engagement_rate: number;
	top_videos: VideoMetric[];
	subscriber_growth: ChannelSnapshot[];
}
