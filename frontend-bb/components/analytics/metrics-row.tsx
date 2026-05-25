import { Card } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

const metrics = [
	{ label: 'Watch Time', value: '142.4K hrs', delta: '+12.3%', up: true },
	{ label: 'Impressions', value: '2.8M', delta: '+8.7%', up: true },
	{ label: 'Click-Through', value: '4.2%', delta: '-0.3%', up: false },
	{ label: 'Avg View Duration', value: '4:32', delta: '+0:18', up: true },
	{ label: 'New Subscribers', value: '+2,840', delta: '+19.1%', up: true },
];

export default function MetricsRow() {
	return (
		<div className="grid grid-cols-5 gap-3">
			{metrics.map(({ label, value, delta, up }) => (
				<Card key={label} className="bg-white/[0.03] border-white/5 px-4 py-3">
					<p className="text-white/30 text-xs mb-2">{label}</p>
					<p className="text-white font-bold text-lg leading-none mb-1.5">
						{value}
					</p>
					<div className="flex items-center gap-1">
						{up ? (
							<TrendingUp className="w-3 h-3 text-green-400" />
						) : (
							<TrendingDown className="w-3 h-3 text-red-400" />
						)}
						<span
							className={`text-xs font-medium ${up ? 'text-green-400' : 'text-red-400'}`}
						>
							{delta}
						</span>
					</div>
				</Card>
			))}
		</div>
	);
}
