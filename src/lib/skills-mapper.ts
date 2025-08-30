import { RestEndpointMethodTypes } from "@octokit/rest";

type Repository = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];

export interface SkillData {
	name: string;
	type: string;
	color: string;
	projects: ProjectData[];
}

export interface ProjectData {
	name: string;
	description: string;
	demoUrl?: string;
	repoUrl: string;
	stars: number;
	forks: number;
	language: string | null;
	lastUpdated: string;
	private: boolean;
}

// Skill mapping configuration
const SKILL_MAPPINGS: Record<
	string,
	{
		type: string;
		color: string;
		keywords: string[];
		languages: string[];
		topics: string[];
	}
> = {
	JavaScript: {
		type: "Programming Language",
		color: "bg-yellow-500",
		keywords: ["javascript", "js", "node", "npm"],
		languages: ["JavaScript"],
		topics: ["javascript", "js", "nodejs", "node", "npm", "yarn", "webpack", "babel"],
	},
	TypeScript: {
		type: "Programming Language",
		color: "bg-blue-600",
		keywords: ["typescript", "ts"],
		languages: ["TypeScript"],
		topics: ["typescript", "ts", "types", "type-safety"],
	},

	// Frontend Frameworks
	React: {
		type: "Frontend Framework",
		color: "bg-cyan-500",
		keywords: ["react", "jsx", "hooks"],
		languages: ["JavaScript", "TypeScript"],
		topics: ["react", "reactjs", "jsx", "hooks", "redux", "next", "gatsby"],
	},
	"Next.js": {
		type: "Frontend Framework",
		color: "bg-black",
		keywords: ["next", "nextjs"],
		languages: ["JavaScript", "TypeScript"],
		topics: ["nextjs", "next", "ssr", "static-site", "vercel"],
	},

	"Node.js": {
		type: "JavaScript Runtime",
		color: "bg-green-600",
		keywords: ["node", "nodejs", "npm", "express"],
		languages: ["JavaScript", "TypeScript"],
		topics: ["nodejs", "node", "express", "koa", "fastify", "npm", "yarn"],
	},
	Express: {
		type: "Backend Framework",
		color: "bg-gray-600",
		keywords: ["express", "expressjs"],
		languages: ["JavaScript", "TypeScript"],
		topics: ["express", "expressjs", "middleware", "api"],
	},

	"Tailwind CSS": {
		type: "CSS Framework",
		color: "bg-teal-500",
		keywords: ["tailwind", "tailwindcss"],
		languages: ["CSS"],
		topics: ["tailwindcss", "tailwind", "utility-first", "css"],
	},

	Sass: {
		type: "CSS Preprocessor",
		color: "bg-pink-500",
		keywords: ["sass", "scss"],
		languages: ["SCSS", "Sass"],
		topics: ["sass", "scss", "css", "preprocessor"],
	},

	MongoDB: {
		type: "Database",
		color: "bg-green-500",
		keywords: ["mongo", "mongodb"],
		languages: ["JavaScript"],
		topics: ["mongodb", "mongo", "nosql", "database", "document"],
	},

	Git: {
		type: "Version Control System",
		color: "bg-red-500",
		keywords: ["git", "github", "gitlab"],
		languages: [],
		topics: ["git", "version-control", "github", "gitlab", "vcs"],
	},
};

export function mapRepositoriesToSkills(
	repositories: Repository[],
	languagesData: Record<string, Record<string, number>> = {},
): SkillData[] {
	const skillsMap = new Map<string, SkillData>();

	// Initialize skills map
	Object.entries(SKILL_MAPPINGS).forEach(([skillName, config]) => {
		skillsMap.set(skillName, {
			name: skillName,
			type: config.type,
			color: config.color,
			projects: [],
		});
	});

	// Process each repository
	repositories.forEach((repo) => {
		const repoLanguages = languagesData[repo.full_name] || {};
		const repoTopics = repo.topics || [];
		const repoName = repo.name.toLowerCase();
		const repoDescription = (repo.description || "").toLowerCase();

		// Create project data
		const projectData: ProjectData = {
			name: repo.name,
			description: repo.description || "No description available",
			demoUrl: repo.homepage || undefined,
			repoUrl: repo.html_url,
			stars: repo.stargazers_count ?? 0,
			forks: repo.forks_count ?? 0,
			language: repo.language ?? null,
			lastUpdated: repo.updated_at ?? new Date().toISOString(),
			private: repo.private ?? false,
		};

		// Match repository to skills
		Object.entries(SKILL_MAPPINGS).forEach(([skillName, config]) => {
			let matches = false;

			// Check primary language
			if (repo.language && config.languages.includes(repo.language)) {
				matches = true;
			}

			// Check repository languages
			if (Object.keys(repoLanguages).some((lang) => config.languages.includes(lang))) {
				matches = true;
			}

			// Check topics
			if (repoTopics.some((topic) => config.topics.includes(topic.toLowerCase()))) {
				matches = true;
			}

			// Check keywords in name and description
			if (config.keywords.some((keyword) => repoName.includes(keyword) || repoDescription.includes(keyword))) {
				matches = true;
			}

			// Add project to skill if it matches
			if (matches) {
				const skill = skillsMap.get(skillName);
				if (skill) {
					// Avoid duplicates
					const existingProject = skill.projects.find((p) => p.repoUrl === projectData.repoUrl);
					if (!existingProject) {
						skill.projects.push(projectData);
					}
				}
			}
		});
	});

	// Filter out skills with no projects and sort projects by stars
	const skillsWithProjects = Array.from(skillsMap.values())
		.filter((skill) => skill.projects.length > 0)
		.map((skill) => ({
			...skill,
			projects: skill.projects
				.sort((a, b) => b.stars - a.stars) // Sort by stars descending
				.slice(0, 10), // Limit to top 10 projects per skill
		}))
		.sort((a, b) => b.projects.length - a.projects.length); // Sort skills by number of projects

	return skillsWithProjects;
}

export function getSkillColor(skillName: string): string {
	const skill = SKILL_MAPPINGS[skillName as keyof typeof SKILL_MAPPINGS];
	return skill?.color || "bg-gray-500";
}

export function getSkillType(skillName: string): string {
	const skill = SKILL_MAPPINGS[skillName as keyof typeof SKILL_MAPPINGS];
	return skill?.type || "Technology";
}

export { SKILL_MAPPINGS };
