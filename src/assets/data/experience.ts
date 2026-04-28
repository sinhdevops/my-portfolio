export interface Experience {
	phase: string;
	title: string;
	company: string;
	period: string;
	description: string;
	technologies: string[];
}

export const experiences: Experience[] = [
	{
		phase: "Phase I — Internship",
		title: "Frontend Developer Intern",
		company: "TNHH MTV LIFT SOFTWARE",
		period: "Sep 2023 – Nov 2023",
		description:
			"Completed a 2-month internship focused on ReactJS, TypeScript, and Tailwind CSS. Contributed to training projects and built a solid foundation in modern frontend development workflows.",
		technologies: ["ReactJS", "TypeScript", "TailwindCSS"],
	},
	{
		phase: "Phase II — Fresher",
		title: "Frontend Developer (Fresher)",
		company: "TNHH MTV LIFT SOFTWARE",
		period: "Nov 2023 – Jan 2024",
		description:
			"Developed and maintained advertising websites and admin dashboards for content management. Implemented new features, integrated RESTful APIs, and optimized UI/UX workflows in collaboration with senior developers.",
		technologies: ["ReactJS", "React Query", "CoreUI", "NextUI", "TypeScript", "TailwindCSS"],
	},
	{
		phase: "Phase III — Junior",
		title: "Frontend Developer (Junior)",
		company: "TNHH MTV LIFT SOFTWARE",
		period: "Jan 2024 – Mar 2025",
		description:
			"Led the GRM_ANA analytics project end-to-end — architecture design, project setup, and full feature development. Built scalable component systems, ensured performance optimization, and delivered a production-ready application.",
		technologies: ["Next.js", "Shadcn UI", "React Query", "TypeScript", "TailwindCSS"],
	},
	{
		phase: "Phase IV — Freelance",
		title: "Frontend Developer (Freelance)",
		company: "Remote / Work From Home",
		period: "May 2024 – Present",
		description:
			"Outsourced as Frontend Developer on multiple projects for clients in Japan and Singapore. Collaborated with international teams to build, maintain, and optimize web applications with focus on performance, UI consistency, and SEO.",
		technologies: ["Next.js", "Shadcn UI", "React Query", "TypeScript", "TailwindCSS", "Next SEO"],
	},
];
