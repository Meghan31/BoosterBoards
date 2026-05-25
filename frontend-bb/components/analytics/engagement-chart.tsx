'use client';
import { Card } from '@/components/ui/card';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const mockData = [
	{ week: 'W1', likes: 1200, comments: 340, shares: 89 },
	{ week: 'W2', likes: 1800, comments: 420, shares: 134 },
	{ week: 'W3', likes: 1400, comments: 380, shares: 102 },
	{ week: 'W4', likes: 2200, comments: 510, shares: 178 },
	{ week: 'W5', likes: 1900, comments: 460, shares: 145 },
	{ week: 'W6', likes: 2600, comments: 590, shares: 210 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
	if (!active || !payload?.length) return null;
	return (
		<div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs space-y-1">
			<p className="text-white/40 mb-1">{label}</p>
			{payload.map((p: any) => (
				<p key={p.name} style={{ color: p.color }} className="font-medium">
					{p.name}: {p.value.toLocaleString()}
				</p>
			))}
		</div>
	);
};

export default function EngagementChart() {
	return (
		<Card className="bg-white/[0.03] border-white/5 p-5">
			<div className="mb-5">
				<p className="text-white font-semibold text-sm">Engagement Breakdown</p>
				<p className="text-white/30 text-xs mt-0.5">
					Likes · Comments · Shares
				</p>
			</div>
			<ResponsiveContainer width="100%" height={200}>
				<LineChart
					data={mockData}
					margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="rgba(255,255,255,0.04)"
					/>
					<XAxis
						dataKey="week"
						tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
						axisLine={false}
						tickLine={false}
					/>
					<YAxis
						tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
						axisLine={false}
						tickLine={false}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Line
						type="monotone"
						dataKey="likes"
						stroke="#ef4444"
						strokeWidth={2}
						dot={false}
						activeDot={{ r: 3 }}
					/>
					<Line
						type="monotone"
						dataKey="comments"
						stroke="#3b82f6"
						strokeWidth={2}
						dot={false}
						activeDot={{ r: 3 }}
					/>
					<Line
						type="monotone"
						dataKey="shares"
						stroke="#a855f7"
						strokeWidth={2}
						dot={false}
						activeDot={{ r: 3 }}
					/>
				</LineChart>
			</ResponsiveContainer>
			<div className="flex items-center gap-4 mt-3">
				{[
					['Likes', '#ef4444'],
					['Comments', '#3b82f6'],
					['Shares', '#a855f7'],
				].map(([label, color]) => (
					<div key={label} className="flex items-center gap-1.5">
						<span
							className="w-2 h-2 rounded-full"
							style={{ backgroundColor: color }}
						/>
						<span className="text-white/30 text-xs">{label}</span>
					</div>
				))}
			</div>
		</Card>
	);
}
