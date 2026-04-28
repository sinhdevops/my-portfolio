"use client";

import { experiences } from "@/assets/data/experience";
import { GlassCard } from "@/components/glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function Timeline() {
	const isMobile = useIsMobile();

	return (
		<div className="relative space-y-16">
			{/* Vertical line — desktop only */}
			{!isMobile && (
				<div className="absolute left-1/2 h-full w-0.5 -translate-x-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
			)}

			{experiences.map((exp, index) => (
				<div
					key={index}
					className={cn(
						"relative z-10 flex items-center",
						index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row",
					)}
				>
					<motion.div
						className={cn("w-full md:w-1/2", index % 2 === 0 ? "md:pl-10" : "md:pr-10")}
						initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						viewport={{ once: true }}
					>
						<GlassCard glow>
							{/* Phase badge */}
							<div className="mb-4">
								<span className="inline-block rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
									{exp.phase}
								</span>
							</div>

							{/* Title */}
							<h3 className="mb-1 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-xl font-bold text-transparent">
								{exp.title}
							</h3>

							{/* Company & period */}
							<div className="mb-4 text-sm font-medium text-zinc-500">
								{exp.company} · {exp.period}
							</div>

							{/* Description */}
							<p className="mb-5 text-sm leading-relaxed text-zinc-400">{exp.description}</p>

							{/* Tech badges */}
							<div className="flex flex-wrap gap-2">
								{exp.technologies.map((tech) => (
									<span
										key={tech}
										className="rounded-lg border border-zinc-600/50 bg-zinc-700/50 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-purple-500/50 hover:text-white"
									>
										{tech}
									</span>
								))}
							</div>
						</GlassCard>
					</motion.div>

					{/* Desktop dot */}
					{!isMobile && (
						<div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
							<motion.div
								className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="h-3 w-3 rounded-full bg-white shadow-sm" />
							</motion.div>
						</div>
					)}

					{/* Mobile dot */}
					{isMobile && (
						<div className="absolute top-8 -left-4 flex items-center justify-center">
							<motion.div
								className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="h-2 w-2 rounded-full bg-white" />
							</motion.div>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
