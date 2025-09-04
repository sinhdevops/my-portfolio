import { NextResponse } from "next/server";

import { createGitHubAPI } from "@/lib/github-api";
import { formatGitHubTopics, sortTopicsByPriority } from "@/lib/github-topics";

const PROJECTS = [
	{
		title: "My Portfolio Website",
		repoName: "sinhdevops/my-portfolio",
		description:
			"A visually stunning, my portfolio website built with Next.js 15, Tailwind CSS, and TypeScript. Features animated UI, project showcases, and seamless integration with GitHub for dynamic project data.",
		fallbackTags: ["Next.js", "TypeScript", "Tailwind CSS", "Portfolio", "GitHub API"],
		image: "/repositories/my-portfolio.png",
		demoUrl: "https://my-portfolio-green-five-43.vercel.app/",
	},
	{
		title: "Viettel Đà Nẵng",
		repoName: "sinhdevops/viettel-danang",
		description:
			"A modern, SEO-optimized web application for Viettel Đà Nẵng, built with Next.js 15, Tailwind CSS, and TypeScript. The project is designed to provide users with fast, reliable, and mobile-first access to Viettel’s services and information.",
		fallbackTags: ["TypeScript", "React", "Next.js", "shadcn/ui", "tailwindcss", "zustands"],
		image: "/repositories/viettel-danang.png",
		demoUrl: "https://viettel-danang.vercel.app/",
	},
	{
		title: "Netflix Clone",
		repoName: "sinhdevops/netflix-clone",
		description:
			"A full-featured Netflix Clone built with Next.js 15, Tailwind CSS, and TypeScript. This project replicates the core streaming experience with a modern, responsive UI and a scalable architecture.",
		fallbackTags: ["TypeScript", "React", "Next.js", "TDMB API"],
		image: "/repositories/netflix-clone.png",
		demoUrl: "https://netflix-clone-lovat-pi.vercel.app/",
	},
	{
		title: "NextJS15-Template",
		repoName: "sinhdevops/NextJS15-Template",
		description:
			"A modern and customizable starter template built with Next.js 15, Tailwind CSS, and TypeScript. It provides a solid foundation for building fast, scalable, and production-ready web applications with clean architecture and best practices in mind.",
		fallbackTags: ["TypeScript", "React", "Next.js", "shadcn/ui", "tailwindcss", "zustands"],
		image: "/repositories/next-template-dashboard.png",
		demoUrl: "https://github.com/sinhdevops/NextJS15-Template",
	},
	{
		title: "Music Player App",
		repoName: "sinhdevops/music-app",
		description:
			"A modern web-based music player built with Next.js 15, Tailwind CSS, and TypeScript. The app provides a seamless and responsive user experience, allowing users to browse, search, and play tracks with an elegant interface.",
		fallbackTags: ["TypeScript", "React", "Next.js", "zingmp3-api-full", "shadcn/ui", "tailwindcss", "zustands"],
		image: "/repositories/music-app-dashboard.png",
		demoUrl: "https://github.com/sinhdevops/music-app",
	},
];

export async function GET() {
	try {
		// Try multiple sources for GitHub token
		const githubToken = process.env.GITHUB_TOKEN;

		console.log("GitHub Token:", githubToken);

		if (!githubToken) {
			console.warn("GitHub token not found, using fallback data");
			return NextResponse.json({
				projects: PROJECTS.map((project) => ({
					...project,
					tags: project.fallbackTags,
					repoUrl: `https://github.com/${project.repoName}`,
					stars: 0,
					forks: 0,
					language: null,
					languages: {},
					lastUpdated: new Date().toISOString(),
					isFromGitHub: false,
				})),
			});
		}

		// Create GitHub API instance with caching
		const githubAPI = createGitHubAPI();

		// Log cache statistics
		const cacheStats = githubAPI.getCacheStats();
		console.log("📊 Cache stats:", cacheStats);

		// Parallelize API calls for better performance
		const projectPromises = PROJECTS.map(async (project) => {
			try {
				// Fetch repository data and languages in parallel
				const [{ data }, languages] = await Promise.all([
					githubAPI.getRepository(project.repoName),
					githubAPI.getRepositoryLanguages(project.repoName),
				]);

				let tags: string[];
				if (data.topics && data.topics.length > 0) {
					const formattedTopics = formatGitHubTopics(data.topics);
					tags = sortTopicsByPriority(formattedTopics);
				} else {
					tags = project.fallbackTags;
				}

				return {
					...project,
					tags,
					repoUrl: data.html_url,
					stars: data.stargazers_count,
					forks: data.forks_count,
					language: data.language,
					languages,
					lastUpdated: data.updated_at,
					demoUrl: project.demoUrl || data.homepage || undefined,
					isFromGitHub: data.topics && data.topics.length > 0,
				};
			} catch (error) {
				console.log(2);
				console.error(
					`❌ Error processing ${project.repoName}:`,
					error instanceof Error ? error.message : error,
				);
				// Use fallback data
				return {
					...project,
					tags: project.fallbackTags,
					repoUrl: `https://github.com/${project.repoName}`,
					stars: 0,
					forks: 0,
					language: null,
					languages: {},
					lastUpdated: new Date().toISOString(),
					isFromGitHub: false,
				};
			}
		});
		console.log(1);
		// Wait for all promises to resolve
		const projectsData = await Promise.all(projectPromises);

		return NextResponse.json({ projects: projectsData });
	} catch (error) {
		console.error("Error in GitHub API route:", error instanceof Error ? error.message : error);
		return NextResponse.json(
			{
				error: "Failed to fetch GitHub data",
				projects: PROJECTS.map((project) => ({
					...project,
					tags: project.fallbackTags,
					repoUrl: `https://github.com/${project.repoName}`,
					stars: 0,
					forks: 0,
					language: null,
					languages: {},
					lastUpdated: new Date().toISOString(),
					isFromGitHub: false,
				})),
			},
			{ status: 500 },
		);
	}
}
