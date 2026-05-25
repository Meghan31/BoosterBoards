'use client';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import {
	BarChart2,
	Bell,
	LayoutDashboard,
	Lightbulb,
	LogOut,
	Play,
	Settings,
	TrendingUp,
	Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const nav = [
	{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ label: 'Analytics', href: '/analytics', icon: BarChart2 },
	{ label: 'Videos', href: '/videos', icon: Video },
	{ label: 'Growth', href: '/growth', icon: TrendingUp },
	{ label: 'AI Insights', href: '/insights', icon: Lightbulb },
	{ label: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
];

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	return (
		<aside className="fixed left-0 top-0 h-screen w-60 bg-[#0f0f0f] border-r border-white/5 flex flex-col z-50">
			{/* Logo */}
			<div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/5">
				<div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
					<Play className="w-4 h-4 text-white fill-white" />
				</div>
				<span className="text-white font-semibold text-sm tracking-wide">
					CreatorBoost
				</span>
			</div>

			{/* Nav */}
			{/* <nav className="flex-1 px-3 py-4 space-y-0.5">
				{nav.map(({ label, href, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						className={cn(
							'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
							pathname === href
								? 'bg-white/10 text-white font-medium'
								: 'text-white/40 hover:text-white hover:bg-white/5',
						)}
					>
						<Icon className="w-4 h-4 flex-shrink-0" />
						{label}
					</Link>
				))}
			</nav> */}
			{nav.map(({ label, href, icon: Icon, badge }) => (
				<Link
					key={href}
					href={href}
					className={cn(
						'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
						pathname === href
							? 'bg-white/10 text-white font-medium'
							: 'text-white/40 hover:text-white hover:bg-white/5',
					)}
				>
					<Icon className="w-4 h-4 flex-shrink-0" />
					<span className="flex-1">{label}</span>
					{badge && (
						<span className="bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
							{badge}
						</span>
					)}
				</Link>
			))}

			{/* Settings + User */}
			<div className="px-3 py-4 border-t border-white/5 space-y-0.5">
				<Link
					href="/settings"
					className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
				>
					<Settings className="w-4 h-4" />
					Settings
				</Link>
				<button
					onClick={handleLogout}
					className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
				>
					<LogOut className="w-4 h-4" />
					Logout
				</button>
			</div>

			{/* User info */}
			<div className="px-4 py-4 border-t border-white/5">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
						{user?.email?.[0]?.toUpperCase() ?? 'U'}
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-white text-xs font-medium truncate">
							{user?.username ?? 'Creator'}
						</p>
						<p className="text-white/30 text-xs truncate">
							{user?.email ?? ''}
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
