import { http } from "@/config/http.config";
import { useQuery } from "@tanstack/react-query";

interface ProjectData {
	title: string;
	repoName: string;
	description: string;
	tags: string[];
	image: string;
	demoUrl?: string;
	repoUrl: string;
	stars: number;
	forks: number;
	language: string | null;
	languages: { [key: string]: number };
	lastUpdated: string;
	isFromGitHub: boolean;
}

interface GitHubAPIResponse {
	projects: ProjectData[];
	error?: string;
}

const getProjectGithub = async () => {
	const response = await http.get<GitHubAPIResponse>("/api/github");
	return response.projects;
};

export const useGitHubProjects = () => {
	return useQuery({
		queryKey: ["get-github-projects"],
		queryFn: getProjectGithub,
	});
};
