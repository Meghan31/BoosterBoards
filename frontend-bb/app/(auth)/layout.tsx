export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
			<div className="w-full max-w-sm">
				{/* Logo */}
				<div className="flex items-center justify-center gap-2.5 mb-8">
					<div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
						<span className="text-white font-bold text-sm">CB</span>
					</div>
					<span className="text-white font-semibold text-lg">CreatorBoost</span>
				</div>
				{children}
			</div>
		</div>
	);
}
