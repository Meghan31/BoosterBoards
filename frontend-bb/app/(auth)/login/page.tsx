'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/auth.store';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const router = useRouter();
	const { setAuth } = useAuthStore();

	const [form, setForm] = useState({ email: '', password: '' });
	const [showPw, setShowPw] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const { data } = await api.post('/auth/login/', form);
			setAuth(data.user, data.access, data.refresh);
			router.push('/dashboard');
		} catch (err: any) {
			setError(err.response?.data?.detail || 'Invalid credentials.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="bg-white/[0.03] border-white/5 p-6">
			<div className="mb-6">
				<h1 className="text-white font-semibold text-xl">Welcome back</h1>
				<p className="text-white/30 text-sm mt-1">Sign in to your account</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Email */}
				<div>
					<label className="text-white/40 text-xs mb-1.5 block">Email</label>
					<input
						type="email"
						value={form.email}
						onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
						placeholder="you@example.com"
						required
						className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
					/>
				</div>

				{/* Password */}
				<div>
					<label className="text-white/40 text-xs mb-1.5 block">Password</label>
					<div className="relative">
						<input
							type={showPw ? 'text' : 'password'}
							value={form.password}
							onChange={(e) =>
								setForm((f) => ({ ...f, password: e.target.value }))
							}
							placeholder="••••••••"
							required
							className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowPw(!showPw)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
						>
							{showPw ? (
								<EyeOff className="w-4 h-4" />
							) : (
								<Eye className="w-4 h-4" />
							)}
						</button>
					</div>
				</div>

				{error && (
					<p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
						{error}
					</p>
				)}

				<Button
					type="submit"
					disabled={loading}
					className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-10"
				>
					{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
				</Button>
			</form>

			<p className="text-white/30 text-xs text-center mt-5">
				Don't have an account?{' '}
				<Link
					href="/register"
					className="text-white hover:text-red-400 transition-colors"
				>
					Create one
				</Link>
			</p>
		</Card>
	);
}
