'use client';
import Topbar from '@/components/layout/topbar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useVideos } from '@/hooks/useAnalytics';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Eye, MessageCircle, ThumbsUp, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const mockVideos = [
	{
		id: 1,
		video_id: '1',
		title: 'How I Built a SaaS in 30 Days',
		thumbnail_url: '',
		published_at: '2026-04-01T00:00:00Z',
		view_count: 84200,
		like_count: 3400,
		comment_count: 287,
		engagement_rate: 4.4,
		impressions: 320000,
		click_through_rate: 5.2,
	},
	{
		id: 2,
		video_id: '2',
		title: 'Next.js 15 Full Course for Beginners',
		thumbnail_url: '',
		published_at: '2026-03-20T00:00:00Z',
		view_count: 61800,
		like_count: 2100,
		comment_count: 194,
		engagement_rate: 3.7,
		impressions: 241000,
		click_through_rate: 4.8,
	},
	{
		id: 3,
		video_id: '3',
		title: "I Tried AWS for 30 Days — Here's What Happened",
		thumbnail_url: '',
		published_at: '2026-03-10T00:00:00Z',
		view_count: 49300,
		like_count: 1800,
		comment_count: 143,
		engagement_rate: 3.9,
		impressions: 198000,
		click_through_rate: 4.1,
	},
	{
		id: 4,
		video_id: '4',
		title: 'Django REST API in 1 Hour',
		thumbnail_url: '',
		published_at: '2026-02-28T00:00:00Z',
		view_count: 38100,
		like_count: 1500,
		comment_count: 112,
		engagement_rate: 4.2,
		impressions: 154000,
		click_through_rate: 3.9,
	},
	{
		id: 5,
		video_id: '5',
		title: 'PostgreSQL Performance Tips Nobody Talks About',
		thumbnail_url: '',
		published_at: '2026-02-14T00:00:00Z',
		view_count: 27400,
		like_count: 980,
		comment_count: 76,
		engagement_rate: 3.9,
		impressions: 112000,
		click_through_rate: 3.4,
	},
	{
		id: 6,
		video_id: '6',
		title: 'Redis Explained in 10 Minutes',
		thumbnail_url: '',
		published_at: '2026-02-01T00:00:00Z',
		view_count: 21800,
		like_count: 870,
		comment_count: 61,
		engagement_rate: 4.3,
		impressions: 94000,
		click_through_rate: 3.7,
	},
	{
		id: 7,
		video_id: '7',
		title: 'Docker for Developers — Zero to Hero',
		thumbnail_url: '',
		published_at: '2026-01-18T00:00:00Z',
		view_count: 18200,
		like_count: 720,
		comment_count: 54,
		engagement_rate: 4.3,
		impressions: 78000,
		click_through_rate: 3.5,
	},
];

function engagementColor(rate: number) {
	if (rate >= 4.5) return 'text-green-400 bg-green-400/10';
	if (rate >= 3.5) return 'text-yellow-400 bg-yellow-400/10';
	return 'text-red-400 bg-red-400/10';
}

export default function VideosPage() {
	const [sort, setSort] = useState('views');
	const { data, isLoading } = useVideos(sort);

	const videos = data?.results?.length ? data.results : mockVideos;

	return (
		<div className="flex flex-col flex-1">
			<Topbar
				title="Videos"
				subtitle="Performance breakdown for all your videos"
			/>

			<div className="p-6 space-y-4">
				{/* Controls */}
				<div className="flex items-center justify-between">
					<p className="text-white/40 text-sm">{videos.length} videos</p>
					<div className="flex items-center gap-2">
						<span className="text-white/30 text-xs">Sort by</span>
						<Select value={sort} onValueChange={setSort}>
							<SelectTrigger className="w-36 bg-white/5 border-white/10 text-white text-xs h-8">
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="bg-[#1a1a1a] border-white/10">
								<SelectItem value="views">Views</SelectItem>
								<SelectItem value="likes">Likes</SelectItem>
								<SelectItem value="comments">Comments</SelectItem>
								<SelectItem value="engagement">Engagement</SelectItem>
								<SelectItem value="recent">Most Recent</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Table */}
				<Card className="bg-white/[0.03] border-white/5 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-white/5">
									<th className="text-left text-white/30 text-xs font-medium px-5 py-3 uppercase tracking-wider">
										Video
									</th>
									<th className="text-right text-white/30 text-xs font-medium px-4 py-3 uppercase tracking-wider">
										Views
									</th>
									<th className="text-right text-white/30 text-xs font-medium px-4 py-3 uppercase tracking-wider">
										Likes
									</th>
									<th className="text-right text-white/30 text-xs font-medium px-4 py-3 uppercase tracking-wider">
										Comments
									</th>
									<th className="text-right text-white/30 text-xs font-medium px-4 py-3 uppercase tracking-wider">
										CTR
									</th>
									<th className="text-right text-white/30 text-xs font-medium px-4 py-3 uppercase tracking-wider">
										Engagement
									</th>
									<th className="text-right text-white/30 text-xs font-medium px-4 py-3 uppercase tracking-wider">
										Published
									</th>
								</tr>
							</thead>
							<tbody>
								{isLoading
									? [...Array(6)].map((_, i) => (
											<tr key={i} className="border-b border-white/[0.03]">
												<td className="px-5 py-3">
													<div className="flex items-center gap-3">
														<Skeleton className="w-14 h-9 rounded bg-white/5" />
														<Skeleton className="h-3 w-48 bg-white/5" />
													</div>
												</td>
												{[...Array(6)].map((_, j) => (
													<td key={j} className="px-4 py-3">
														<Skeleton className="h-3 w-12 ml-auto bg-white/5" />
													</td>
												))}
											</tr>
										))
									: videos.map((v: any) => (
											<tr
												key={v.video_id}
												className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
											>
												{/* Title */}
												<td className="px-5 py-3">
													<div className="flex items-center gap-3">
														<div className="w-14 h-9 rounded bg-white/5 flex-shrink-0 overflow-hidden">
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
														<span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors line-clamp-2 max-w-xs">
															{v.title}
														</span>
													</div>
												</td>
												{/* Views */}
												<td className="px-4 py-3 text-right">
													<div className="flex items-center justify-end gap-1.5">
														<Eye className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
														<span className="text-white/70 text-xs font-medium">
															{v.view_count >= 1000
																? `${(v.view_count / 1000).toFixed(1)}K`
																: v.view_count}
														</span>
													</div>
												</td>
												{/* Likes */}
												<td className="px-4 py-3 text-right">
													<span className="text-white/50 text-xs">
														{v.like_count >= 1000
															? `${(v.like_count / 1000).toFixed(1)}K`
															: v.like_count}
													</span>
												</td>
												{/* Comments */}
												<td className="px-4 py-3 text-right">
													<span className="text-white/50 text-xs">
														{v.comment_count}
													</span>
												</td>
												{/* CTR */}
												<td className="px-4 py-3 text-right">
													<span className="text-white/50 text-xs">
														{v.click_through_rate}%
													</span>
												</td>
												{/* Engagement */}
												<td className="px-4 py-3 text-right">
													<span
														className={`text-xs font-medium px-2 py-0.5 rounded-full ${engagementColor(v.engagement_rate)}`}
													>
														{v.engagement_rate}%
													</span>
												</td>
												{/* Published */}
												<td className="px-4 py-3 text-right">
													<span className="text-white/30 text-xs">
														{formatDistanceToNow(parseISO(v.published_at), {
															addSuffix: true,
														})}
													</span>
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				</Card>
			</div>
		</div>
	);
}
