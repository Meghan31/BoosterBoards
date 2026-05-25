'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { VideoMetric } from '@/types/analytics';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Eye, MessageCircle, ThumbsUp } from 'lucide-react';

interface Props {
	videos?: VideoMetric[];
	loading?: boolean;
}

const mockVideos = [
	{
		id: 1,
		video_id: '1',
		title: 'How I Built a SaaS in 30 Days',
		thumbnail_url: '',
		published_at: new Date().toISOString(),
		view_count: 84200,
		like_count: 3400,
		comment_count: 287,
		engagement_rate: 4.4,
	},
	{
		id: 2,
		video_id: '2',
		title: 'Next.js 15 Full Course for Beginners',
		thumbnail_url: '',
		published_at: new Date().toISOString(),
		view_count: 61800,
		like_count: 2100,
		comment_count: 194,
		engagement_rate: 3.7,
	},
	{
		id: 3,
		video_id: '3',
		title: "I Tried AWS for 30 Days — Here's What Happened",
		thumbnail_url: '',
		published_at: new Date().toISOString(),
		view_count: 49300,
		like_count: 1800,
		comment_count: 143,
		engagement_rate: 3.9,
	},
	{
		id: 4,
		video_id: '4',
		title: 'Django REST API in 1 Hour',
		thumbnail_url: '',
		published_at: new Date().toISOString(),
		view_count: 38100,
		like_count: 1500,
		comment_count: 112,
		engagement_rate: 4.2,
	},
	{
		id: 5,
		video_id: '5',
		title: 'PostgreSQL Performance Tips Nobody Talks About',
		thumbnail_url: '',
		published_at: new Date().toISOString(),
		view_count: 27400,
		like_count: 980,
		comment_count: 76,
		engagement_rate: 3.9,
	},
];

export default function TopVideos({ videos, loading }: Props) {
	if (loading) {
		return (
			<Card className="bg-white/[0.03] border-white/5 p-5 h-72">
				<Skeleton className="h-4 w-24 mb-5 bg-white/5" />
				{[...Array(4)].map((_, i) => (
					<div key={i} className="flex gap-3 mb-3">
						<Skeleton className="w-10 h-7 rounded bg-white/5 flex-shrink-0" />
						<div className="flex-1">
							<Skeleton className="h-3 w-full mb-1.5 bg-white/5" />
							<Skeleton className="h-2.5 w-20 bg-white/5" />
						</div>
					</div>
				))}
			</Card>
		);
	}

	const displayVideos = (
		videos && videos.length > 0 ? videos : mockVideos
	).slice(0, 5);

	return (
		<Card className="bg-white/[0.03] border-white/5 p-5 h-72 flex flex-col">
			<div className="flex items-center justify-between mb-4">
				<p className="text-white font-semibold text-sm">Top Videos</p>
				<Badge
					variant="outline"
					className="text-white/30 border-white/10 text-xs"
				>
					by views
				</Badge>
			</div>

			<div className="flex-1 overflow-y-auto space-y-3 scrollbar-none">
				{displayVideos.map((v, i) => (
					<div key={v.video_id} className="flex items-start gap-3 group">
						{/* Rank */}
						<span className="text-white/20 text-xs font-mono w-4 flex-shrink-0 mt-0.5">
							{String(i + 1).padStart(2, '0')}
						</span>

						{/* Thumbnail */}
						<div className="w-12 h-8 rounded bg-white/5 flex-shrink-0 overflow-hidden">
							{v.thumbnail_url ? (
								<img
									src={v.thumbnail_url}
									alt=""
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10" />
							)}
						</div>

						{/* Info */}
						<div className="flex-1 min-w-0">
							<p className="text-white/80 text-xs font-medium truncate group-hover:text-white transition-colors">
								{v.title}
							</p>
							<div className="flex items-center gap-3 mt-1">
								<span className="flex items-center gap-1 text-white/30 text-xs">
									<Eye className="w-2.5 h-2.5" />
									{v.view_count >= 1000
										? `${(v.view_count / 1000).toFixed(1)}k`
										: v.view_count}
								</span>
								<span className="flex items-center gap-1 text-white/30 text-xs">
									<ThumbsUp className="w-2.5 h-2.5" />
									{v.like_count >= 1000
										? `${(v.like_count / 1000).toFixed(1)}k`
										: v.like_count}
								</span>
								<span className="text-white/20 text-xs">
									{v.engagement_rate}%
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
