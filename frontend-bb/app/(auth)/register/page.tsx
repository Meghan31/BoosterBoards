'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/auth.store';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
	const router = useRouter();
	const { setAuth } = useAuthStore();

	const [form, setForm] = useState({
		email: '',
		username: '',
		password: '',
		password2: '',
	});
	const [showPw, setShowPw] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});
		try {
			const { data } = await api.post('/auth/register/', form);
			setAuth(data.user, data.tokens.access, data.tokens.refresh);
			router.push('/dashboard');
		} catch (err: any) {
			setErrors(err.response?.data || { general: 'Registration failed.' });
		} finally {
			setLoading(false);
		}
	};

	const field = (
		key: keyof typeof form,
		label: string,
		type = 'text',
		placeholder = '',
	) => (
		<div>
			<label className="text-white/40 text-xs mb-1.5 block">{label}</label>
			<input
				type={type === 'password' ? (showPw ? 'text' : 'password') : type}
				value={form[key]}
				onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
				placeholder={placeholder}
				required
				className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
			/>
			{errors[key] && (
				<p className="text-red-400 text-xs mt-1">{errors[key]}</p>
			)}
		</div>
	);

	return (
		<Card className="bg-white/[0.03] border-white/5 p-6">
			<div className="mb-6">
				<h1 className="text-white font-semibold text-xl">
					Create your account
				</h1>
				<p className="text-white/30 text-sm mt-1">
					Start growing your channel with AI
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				{field('email', 'Email', 'email', 'you@example.com')}
				{field('username', 'Username', 'text', 'yourchannel')}

				{/* Password with toggle */}
				<div>
					<label className="text-white/40 text-xs mb-1.5 block">Password</label>
					<div className="relative">
						<input
							type={showPw ? 'text' : 'password'}
							value={form.password}
							onChange={(e) =>
								setForm((f) => ({ ...f, password: e.target.value }))
							}
							placeholder="Min. 8 characters"
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
					{errors.password && (
						<p className="text-red-400 text-xs mt-1">{errors.password}</p>
					)}
				</div>

				{field('password2', 'Confirm Password', 'password', 'Repeat password')}

				{errors.general && (
					<p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
						{errors.general}
					</p>
				)}

				<Button
					type="submit"
					disabled={loading}
					className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-10"
				>
					{loading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						'Create Account'
					)}
				</Button>
			</form>

			<p className="text-white/30 text-xs text-center mt-5">
				Already have an account?{' '}
				<Link
					href="/login"
					className="text-white hover:text-red-400 transition-colors"
				>
					Sign in
				</Link>
			</p>
		</Card>
	);
}
