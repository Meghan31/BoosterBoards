'use client';
import GrowthChart from '@/components/analytics/growth-chart';
import StatCard from '@/components/analytics/stat-card';
import TopVideos from '@/components/analytics/top-videos';
import Topbar from '@/components/layout/topbar';
import { useDashboard } from '@/hooks/useAnalytics';
import { Eye, TrendingUp, Users, Video } from 'lucide-react';

export default function DashboardPage() {
	const { data, isLoading } = useDashboard(30);

	return (
		<div className="flex flex-col flex-1">
			<Topbar
				title="Dashboard"
				subtitle="Your channel performance at a glance"
			/>
			<div className="p-6 space-y-4">
				{/* KPI Cards */}
				<div className="grid grid-cols-4 gap-4">
					<StatCard
						title="Total Views"
						value={data?.total_views ?? 0}
						icon={Eye}
						color="blue"
						loading={isLoading}
					/>
					<StatCard
						title="Subscribers"
						value={data?.total_subscribers ?? 0}
						icon={Users}
						color="green"
						loading={isLoading}
					/>
					<StatCard
						title="Total Videos"
						value={data?.total_videos ?? 0}
						icon={Video}
						color="purple"
						loading={isLoading}
					/>
					<StatCard
						title="Avg Engagement"
						value={`${data?.avg_engagement_rate ?? 0}%`}
						icon={TrendingUp}
						color="red"
						loading={isLoading}
					/>
				</div>

				{/* Charts Row */}
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2">
						<GrowthChart data={data?.subscriber_growth} loading={isLoading} />
					</div>
					<TopVideos videos={data?.top_videos} loading={isLoading} />
				</div>
			</div>
		</div>
	);
}
