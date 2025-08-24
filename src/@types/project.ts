export interface IDataProject {
	title: string;
	description: string;
	tags: string[];
	image: string;
	demoUrl: string;
	repoUrl: string;
	stars: number;
	forks: number;
	languages: Record<string, number>; // key: tên ngôn ngữ, value: % hoặc số dòng
	isFromGitHub: boolean;
	repoName: string;
}
