'use client';
import { Card } from '@/components/ui/card';
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const mockData = [
	{ month: 'Nov', views: 38000 },
	{ month: 'Dec', views: 52000 },
	{ month: 'Jan', views: 47000 },
	{ month: 'Feb', views: 61000 },
	{ month: 'Mar', views: 55000 },
	{ month: 'Apr', views: 72000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
	if (!active || !payload?.length) return null;
	return (
		<div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs">
			<p className="text-white/40 mb-1">{label}</p>
			<p className="text-white font-semibold">
				{payload[0]?.value?.toLocaleString()} views
			</p>
		</div>
	);
};

export default function ViewsBarChart() {
	return (
		<Card className="bg-white/[0.03] border-white/5 p-5">
			<div className="mb-5">
				<p className="text-white font-semibold text-sm">Monthly Views</p>
				<p className="text-white/30 text-xs mt-0.5">Last 6 months</p>
			</div>
			<ResponsiveContainer width="100%" height={200}>
				<BarChart
					data={mockData}
					margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="rgba(255,255,255,0.04)"
						vertical={false}
					/>
					<XAxis
						dataKey="month"
						tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
						axisLine={false}
						tickLine={false}
					/>
					<YAxis
						tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
						axisLine={false}
						tickLine={false}
						tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
					/>
					<Tooltip
						content={<CustomTooltip />}
						cursor={{ fill: 'rgba(255,255,255,0.03)' }}
					/>
					<Bar
						dataKey="views"
						fill="#ef4444"
						radius={[4, 4, 0, 0]}
						maxBarSize={40}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
}
