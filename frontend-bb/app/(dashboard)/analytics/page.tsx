'use client';
import EngagementChart from '@/components/analytics/engagement-chart';
import GrowthChart from '@/components/analytics/growth-chart';
import MetricsRow from '@/components/analytics/metrics-row';
import ViewsBarChart from '@/components/analytics/views-bar-chart';
import Topbar from '@/components/layout/topbar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboard } from '@/hooks/useAnalytics';
import { useState } from 'react';

export default function AnalyticsPage() {
	const [days, setDays] = useState(30);
	const { data, isLoading } = useDashboard(days);

	return (
		<div className="flex flex-col flex-1">
			<Topbar
				title="Analytics"
				subtitle="Deep dive into your channel performance"
			/>

			<div className="p-6 space-y-4">
				{/* Period selector */}
				<div className="flex items-center justify-between">
					<p className="text-white/40 text-sm">
						Showing data for the last{' '}
						<span className="text-white">{days} days</span>
					</p>
					<Tabs value={String(days)} onValueChange={(v) => setDays(Number(v))}>
						<TabsList className="bg-white/5 border border-white/5">
							<TabsTrigger
								value="7"
								className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/30"
							>
								7D
							</TabsTrigger>
							<TabsTrigger
								value="30"
								className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/30"
							>
								30D
							</TabsTrigger>
							<TabsTrigger
								value="90"
								className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/30"
							>
								90D
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* Metrics strip */}
				<MetricsRow />

				{/* Charts */}
				<div className="grid grid-cols-2 gap-4">
					<GrowthChart data={data?.subscriber_growth} loading={isLoading} />
					<ViewsBarChart />
				</div>

				<EngagementChart />
			</div>
		</div>
	);
}
