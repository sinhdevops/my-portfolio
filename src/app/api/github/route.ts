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
		demoUrl: "https://github.com/sinhdevops/my-portfolios",
	},
	{
		title: "Netflix Clone",
		repoName: "sinhdevops/netflix-clone",
		description:
			"A robust template for rapid development of Discord bots with multi-language support, modular command/event handling, and PostgreSQL integration.",
		fallbackTags: ["TypeScript", "Discord.js", "PostgreSQL", "Node.js"],
		image: "/repositories/discord.js-template-v14.png",
		demoUrl: "https://github.com/sinhdevops/netflix-clone",
	},
	{
		title: "NextJS15-Template",
		repoName: "sinhdevops/NextJS15-Template",
		description:
			"A modern, intuitive platform for managing Discord bots with real-time monitoring and powerful customization features.",
		fallbackTags: ["TypeScript", "React", "Next.js", "Discord API"],
		image: "/repositories/discord-bot-dashboard.png",
		demoUrl: "https://github.com/sinhdevops/NextJS15-Template",
	},
	{
		title: "Music Player App",
		repoName: "sinhdevops/music-app",
		description:
			"A modern, intuitive platform for managing Discord bots with real-time monitoring and powerful customization features.",
		fallbackTags: ["TypeScript", "React", "Next.js", "Discord API"],
		image: "/repositories/discord-bot-dashboard.png",
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
