"use client";

import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp } from "@/lib/animation-variants";
import { Download } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const stats = [
	{ label: "Years Experience", value: "2+", emoji: "🚀" },
	{ label: "Projects Shipped", value: "10+", emoji: "⚡" },
	{ label: "Intl. Markets", value: "2", emoji: "🌏" },
	{ label: "Core Technologies", value: "5+", emoji: "🛠️" },
];

const info = [
	{ label: "Full Name", value: "Lê Văn Sinh" },
	{ label: "Location", value: "Viet Nam 🇻🇳" },
	{ label: "Email", value: "sinh.dev.ops@gmail.com", href: "mailto:sinh.dev.ops@gmail.com" },
	{ label: "Status", value: "Junior → Mid", accent: true },
];

function AboutMeSection() {
	return (
		<section id="about" className="relative py-32">
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl" />
				<div className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl" />
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="About Me" subtitle="Who I am" />

				<div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Left: Bio + personal info */}
					<GlassCard glow>
						<div className="space-y-6">
							<div className="space-y-4 leading-relaxed text-zinc-300">
								<p>
									I&apos;m a{" "}
									<span className="font-semibold text-white">Frontend Developer</span>{" "}
									specializing in React and Next.js, building modern, responsive, and scalable
									web applications.
								</p>
								<p>
									I focus on performance, accessibility, and clean architecture — collaborating
									closely with designers and backend teams to ship polished products.
								</p>
								<p>
									Beyond my day job, I work with international clients from{" "}
									<span className="font-medium text-white">Japan and Singapore</span>, contribute
									to open-source, and continuously push my craft forward.
								</p>
							</div>

							{/* Personal info grid */}
							<div className="grid grid-cols-2 gap-4 border-t border-zinc-700/50 pt-6">
								{info.map(({ label, value, href, accent }) => (
									<div key={label} className="space-y-1">
										<div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
											{label}
										</div>
										{href ? (
											<Link
												href={href}
												className="block truncate text-sm font-medium text-zinc-300 transition-colors hover:text-purple-400"
											>
												{value}
											</Link>
										) : (
											<div
												className={cn(
													"text-sm font-medium",
													accent ? "text-green-400" : "text-zinc-300",
												)}
											>
												{value}
											</div>
										)}
									</div>
								))}
							</div>

							<div className="pt-2">
								<Link href="/sinhlv-cv.pdf" target="_blank" rel="noopener noreferrer">
									<Button className="bg-zinc-700 text-white hover:bg-zinc-600">
										<Download className="mr-2 h-4 w-4" />
										Download Resume
									</Button>
								</Link>
							</div>
						</div>
					</GlassCard>

					{/* Right: Stats grid */}
					<motion.div
						className="grid grid-cols-2 gap-4 content-start"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{stats.map(({ label, value, emoji }) => (
							<motion.div key={label} variants={fadeUp}>
								<GlassCard glow className="p-6 text-center">
									<div className="mb-2 text-3xl">{emoji}</div>
									<div className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
										{value}
									</div>
									<div className="mt-1 text-sm text-zinc-400">{label}</div>
								</GlassCard>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default AboutMeSection;
