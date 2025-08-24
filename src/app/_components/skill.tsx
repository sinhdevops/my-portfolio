import { SectionHeading } from "@/components/section-heading";
import { SkillsWithProjects } from "@/components/skills-with-projects";

function SkillSection() {
	return (
		<section id="skills" className="relative py-32">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				<div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="My Skills" subtitle="Technologies I work with" />

				<div className="mt-16">
					<SkillsWithProjects />
				</div>
			</div>
		</section>
	);
}

export default SkillSection;
