"use client";

import { CONTACTS } from "@/assets/data";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animation-variants";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const AnimatedName = dynamic(
	() => import("@/components/animated-name").then((mod) => ({ default: mod.AnimatedName })),
	{ ssr: false },
);

// ─── Syntax tokens for the code card ────────────────────────────────────────

const CODE_LINES: Array<Array<{ t: string; c: string }>> = [
	[
		{ t: "const", c: "text-purple-400" },
		{ t: " developer", c: "text-cyan-300" },
		{ t: " = {", c: "text-zinc-400" },
	],
	[
		{ t: "  name", c: "text-blue-300" },
		{ t: ":  ", c: "text-zinc-400" },
		{ t: '"Lê Văn Sinh"', c: "text-green-400" },
		{ t: ",", c: "text-zinc-400" },
	],
	[
		{ t: "  role", c: "text-blue-300" },
		{ t: ":  ", c: "text-zinc-400" },
		{ t: '"Frontend Developer"', c: "text-green-400" },
		{ t: ",", c: "text-zinc-400" },
	],
	[
		{ t: "  location", c: "text-blue-300" },
		{ t: ": ", c: "text-zinc-400" },
		{ t: '"Vietnam 🇻🇳"', c: "text-green-400" },
		{ t: ",", c: "text-zinc-400" },
	],
	[
		{ t: "  stack", c: "text-blue-300" },
		{ t: ": ", c: "text-zinc-400" },
		{ t: "[", c: "text-zinc-400" },
		{ t: '"React"', c: "text-yellow-300" },
		{ t: ", ", c: "text-zinc-400" },
		{ t: '"Next.js"', c: "text-yellow-300" },
		{ t: ", ", c: "text-zinc-400" },
		{ t: '"TypeScript"', c: "text-yellow-300" },
		{ t: "],", c: "text-zinc-400" },
	],
	[
		{ t: "  experience", c: "text-blue-300" },
		{ t: ": ", c: "text-zinc-400" },
		{ t: "2", c: "text-orange-400" },
		{ t: ",", c: "text-zinc-400" },
		{ t: "  // years", c: "text-zinc-600" },
	],
	[
		{ t: "  passion", c: "text-blue-300" },
		{ t: ":  ", c: "text-zinc-400" },
		{ t: '"Clean code & great UX"', c: "text-green-400" },
		{ t: ",", c: "text-zinc-400" },
	],
	[
		{ t: "  status", c: "text-blue-300" },
		{ t: ":  ", c: "text-zinc-400" },
		{ t: '"open_to_work" as const', c: "text-green-400" },
		{ t: ",", c: "text-zinc-400" },
	],
	[{ t: "}", c: "text-zinc-400" }],
	[],
	[
		{ t: "export default", c: "text-purple-400" },
		{ t: " developer", c: "text-cyan-300" },
	],
];

// ─── Code Editor Card ────────────────────────────────────────────────────────

function CodeCard() {
	const [cursorVisible, setCursorVisible] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => setCursorVisible((v) => !v), 530);
		return () => clearInterval(timer);
	}, []);

	return (
		<motion.div
			className="w-full max-w-[440px] overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/90 shadow-2xl shadow-purple-500/10 backdrop-blur-sm"
			initial={{ opacity: 0, y: 30, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
		>
			{/* Window title bar */}
			<div className="flex items-center gap-2 border-b border-zinc-700/50 bg-zinc-800/60 px-4 py-3">
				<span className="h-3 w-3 rounded-full bg-red-500/80" />
				<span className="h-3 w-3 rounded-full bg-yellow-500/80" />
				<span className="h-3 w-3 rounded-full bg-green-500/80" />
				<span className="ml-3 font-mono text-xs text-zinc-500">developer.ts</span>
				<div className="ml-auto flex items-center gap-1.5">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
					<span className="font-mono text-xs text-zinc-600">TypeScript</span>
				</div>
			</div>

			{/* Code lines */}
			<div className="p-5">
				{CODE_LINES.map((line, lineIdx) => (
					<div key={lineIdx} className="flex font-mono text-[13px] leading-7">
						{/* Line number */}
						<span className="mr-4 w-5 shrink-0 select-none text-right text-xs text-zinc-700">
							{lineIdx + 1}
						</span>

						{/* Tokens */}
						<span>
							{line.map((token, i) => (
								<span key={i} className={token.c}>
									{token.t}
								</span>
							))}

							{/* Blinking cursor on last non-empty line */}
							{lineIdx === CODE_LINES.length - 1 && (
								<span
									className={`ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] rounded-sm bg-purple-400 transition-opacity duration-100 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
								/>
							)}
						</span>
					</div>
				))}
			</div>

			{/* Status bar */}
			<div className="flex items-center justify-between border-t border-zinc-700/50 bg-zinc-800/40 px-4 py-2 font-mono text-xs text-zinc-600">
				<span>Ln {CODE_LINES.length}, Col 22</span>
				<span className="flex items-center gap-1.5">
					<span className="text-green-400">✓</span>
					<span>0 errors · UTF-8</span>
				</span>
			</div>
		</motion.div>
	);
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
			{/* Subtle grid background */}
			<div
				className="pointer-events-none absolute inset-0 z-0 opacity-30"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
					backgroundSize: "64px 64px",
				}}
			/>

			<div className="relative z-10 container grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
				{/* Left: Content */}
				<motion.div
					className="space-y-8"
					variants={staggerContainer}
					initial="hidden"
					animate="visible"
				>
					{/* Availability badge */}
					<motion.div variants={fadeUp}>
						<div className="flex w-fit items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
							</span>
							<span className="font-medium text-green-400">Open to opportunities</span>
						</div>
					</motion.div>

					{/* Name + role */}
					<motion.div variants={fadeUp} className="space-y-3">
						<p className="text-base font-medium uppercase tracking-[0.2em] text-zinc-500">
							Hi, I&apos;m
						</p>
						<div className="text-5xl font-bold tracking-tight md:text-6xl">
							<AnimatedName />
						</div>
						<p className="text-xl font-semibold text-zinc-300">
							Frontend Developer{" "}
							<span className="text-zinc-600">/</span>{" "}
							<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								Web Craftsman
							</span>
						</p>
					</motion.div>

					{/* Description */}
					<motion.p
						variants={fadeUp}
						className="max-w-md leading-relaxed text-zinc-400"
					>
						I build fast, accessible, and production-ready web experiences with React &
						Next.js. Clean code, great UX, and attention to detail — every time.
					</motion.p>

					{/* CTA buttons */}
					<motion.div variants={fadeUp} className="flex flex-wrap gap-3">
						<Button variant="primary" className="group relative overflow-hidden" asChild>
							<Link href="#projects">
								<span className="relative z-10 flex items-center">
									View Projects
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</span>
								<span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
							</Link>
						</Button>
						<Button
							variant="outline"
							className="border-zinc-700 bg-transparent text-zinc-300 hover:border-purple-500 hover:text-white"
							asChild
						>
							<Link href="#contact">Let&apos;s Talk</Link>
						</Button>
					</motion.div>

					{/* Social links */}
					<motion.div variants={fadeUp} className="flex gap-2">
						{CONTACTS.map(({ href, target, rel, icon, label }) => (
							<Link key={label} href={href} target={target} rel={rel}>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full bg-zinc-800/50 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-white hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
									aria-label={label}
								>
									{icon}
								</Button>
							</Link>
						))}
					</motion.div>
				</motion.div>

				{/* Right: Code editor card */}
				<div className="flex justify-center lg:justify-end">
					<CodeCard />
				</div>
			</div>

			{/* Scroll indicator */}
			<Link
				href="#about"
				aria-label="Scroll to About"
				className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600 transition-colors hover:text-zinc-400"
			>
				<ArrowDown className="h-5 w-5" />
			</Link>
		</section>
	);
}

export default HeroSection;
