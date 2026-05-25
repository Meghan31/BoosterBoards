'use client';
import { Button } from '@/components/ui/button';
import { Bell, RefreshCw, Search } from 'lucide-react';

interface TopbarProps {
	title: string;
	subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
	return (
		<header className="h-16 border-b border-white/5 flex items-center justify-between px-6">
			<div>
				<h1 className="text-white font-semibold text-lg leading-none">
					{title}
				</h1>
				{subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					className="text-white/40 hover:text-white"
				>
					<Search className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="text-white/40 hover:text-white"
				>
					<RefreshCw className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="text-white/40 hover:text-white relative"
				>
					<Bell className="w-4 h-4" />
					<span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
				</Button>
			</div>
		</header>
	);
}
