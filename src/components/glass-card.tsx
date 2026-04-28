import { cn } from "@/lib/utils";
import { memo, type ReactNode } from "react";

interface GlassCardProps {
	children: ReactNode;
	className?: string;
	glow?: boolean;
}

export const GlassCard = memo(function GlassCard({ children, className, glow = false }: GlassCardProps) {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm",
				glow &&
					"transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10",
				className,
			)}
		>
			{glow && (
				<div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-25 blur-sm transition duration-1000 hover:opacity-100 hover:duration-200" />
			)}
			<div className="relative">{children}</div>
		</div>
	);
});
