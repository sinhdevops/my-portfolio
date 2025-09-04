import { SkillData } from "@/lib/skills-mapper";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/config/http.config";

export interface SkillsAPIResponse {
	skills: SkillData[];
	metadata?: {
		username: string;
		totalRepositories: number;
		totalSkills: number;
		totalProjects: number;
		excludesForks?: boolean;
		cacheStats?: any;
	};
	error?: string;
	details?: string;
}

export const useSkills = () => {
	const getSkill = async () => {
		const response = await http.get<SkillsAPIResponse>("/api/skills");
		return response;
	};

	return useQuery<SkillsAPIResponse>({
		queryKey: ["get-skills"],
		queryFn: getSkill,
	});
};
