import { SkillData } from "@/lib/skills-mapper";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/config/http.config";
import { useParams } from "next/navigation";

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
	const searchParams = useParams();
	const url = searchParams.username ? `/api/skills?username=${searchParams.username}` : "/api/skills";

	const getSkill = async () => {
		const response = await http.get<SkillsAPIResponse>("/api/skills");
		return response;
	};

	return useQuery<SkillsAPIResponse>({
		queryKey: ["get-skills"],
		queryFn: getSkill,
	});
};
