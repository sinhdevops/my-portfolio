"use client";

import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const experiences = [
	{
		title: "Frontend Developer Intern",
		company: "TNHH MTV LIFT SOFTWARE",
		period: "9/2023 - 11/2023",
		phaseDescription:
			"Completed a 2-month internship to learn company technologies and workflows. Focused on ReactJS, TypeScript, and Tailwind CSS while contributing to training projects and building a solid foundation in frontend development.",
		technologies: ["ReactJS", "TypeScript", "TailwindCSS"],
		phase: "Phase I: Internship",
	},
	{
		title: "Frontend Developer (Fresher)",
		company: "TNHH MTV LIFT SOFTWARE",
		period: "11/2023 - 1/2024",
		description:
			"Developed and maintained advertising websites and admin dashboards for content and data management. Focused on optimizing user interfaces and enhancing user experience while ensuring performance and system stability. Collaborated on building new features, integrating APIs, and streamlining frontend development workflows.",
		phaseDescription:
			"Worked with a professional team for 2 months on admin dashboard projects. Implemented features, integrated APIs, and optimized UI/UX for data management workflows in collaboration with senior developers.",
		technologies: ["ReactJS", "React Query", "CoreUI", "NextUI", "TypeScript", "TailwindCSS"],
		phase: "Phase II: Fresher Developer",
	},
	{
		title: "Frontend Developer (Junior)",
		company: "TNHH MTV LIFT SOFTWARE",
		description:
			"Developed and maintained advertising websites and admin dashboards for content and data management. Focused on optimizing user interfaces and enhancing user experience while ensuring performance and system stability. Collaborated on building new features, integrating APIs, and streamlining frontend development workflows.",
		period: "1/2024 - 3/2025",
		phaseDescription:
			"Led the GRM_ANA project from scratch, including project setup, architecture design, and full feature development. Built scalable components, ensured performance optimization, and delivered a production-ready application.",
		technologies: ["Next.js", "Shadcn UI", "React Query", "TypeScript", "TailwindCSS"],
		phase: "Phase III: Junior Developer",
	},
];

export function Timeline() {
	const isMobile = useIsMobile();

	return (
		<div className="relative space-y-16">
			{/* Timeline line for desktop */}
			{!isMobile && (
				<div className="absolute left-1/2 h-full w-0.5 -translate-x-px transform bg-gradient-to-b from-blue-500 via-purple-500 to-purple-600"></div>
			)}

			{experiences.map((experience, index) => (
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
						<div className="relative overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
							{/* Gradient background effect */}
							<div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-25 blur-sm transition duration-1000 hover:opacity-100 hover:duration-200"></div>

							<div className="relative">
								{/* Phase indicator */}
								<div className="mb-4">
									<span className="inline-block rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
										{experience.phase}
									</span>
								</div>

								{/* Title and company */}
								<h3 className="mb-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-2xl font-bold text-transparent">
									{experience.title}
								</h3>
								<div className="mb-4 font-medium text-zinc-400">
									{experience.company} | {experience.period}
								</div>

								{/* Phase description */}
								<p className="mb-4 text-sm text-zinc-500 italic">{experience.phaseDescription}</p>

								{/* Description */}
								<p className="mb-6 leading-relaxed text-zinc-300">{experience.phaseDescription}</p>

								{/* Technologies */}
								<div className="flex flex-wrap gap-2">
									{experience.technologies.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="rounded-lg border border-zinc-600/50 bg-zinc-700/50 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors duration-200 hover:border-purple-500/50"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					</motion.div>

					{/* Timeline dot for desktop */}
					{!isMobile && (
						<div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
							<motion.div
								className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="h-3 w-3 rounded-full bg-white shadow-sm"></div>
							</motion.div>
						</div>
					)}

					{/* Mobile timeline dot */}
					{isMobile && (
						<div className="absolute top-8 left-0 flex -translate-x-1/2 items-center justify-center">
							<motion.div
								className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="h-2 w-2 rounded-full bg-white shadow-sm"></div>
							</motion.div>
						</div>
					)}
				</div>
			))}

			{/* Career progression summary */}
			<motion.div
				className="mt-16 rounded-2xl border border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 p-8 backdrop-blur-sm"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<h3 className="mb-4 text-xl font-bold text-white">Career Development Path</h3>
				<div className="grid gap-6 text-sm text-zinc-300 md:grid-cols-2">
					<div>
						<h4 className="mb-2 font-semibold text-purple-300">Key Lessons:</h4>
						<ul className="space-y-2">
							<li>• Begin by mastering core web fundamentals (HTML, CSS, JavaScript)</li>
							<li>
								• Gain backend experience early through simple real-world projects (e.g., small APIs,
								hobby apps)
							</li>
							<li>• Build both frontend and backend in parallel to understand full-stack workflows</li>
							<li>• Take on challenging projects to push beyond comfort zones and accelerate growth</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-2 font-semibold text-pink-300">Development Model:</h4>
						<ul className="space-y-2">
							<li>• Progress systematically from foundational knowledge to advanced concepts</li>
							<li>• Continuously apply what you learn in real, production-like projects</li>
							<li>• Deepen expertise in a primary area while exploring adjacent technologies</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
