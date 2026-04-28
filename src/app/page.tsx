import { FloatingNav } from "@/components/floating-nav";
import AboutMeSection from "./_components/about-me";
import HeroSection from "./_components/hero";
import SkillSection from "./_components/skill";
import ProjectSection from "./_components/project";
import ExperienceSection from "./_components/experience";
import ContactSection from "./_components/contact";

export default function Portfolio() {
	return (
		<>
			<FloatingNav />
			<HeroSection />
			<AboutMeSection />
			<SkillSection />
			<ProjectSection />
			<ExperienceSection />
			<ContactSection />
		</>
	);
}
