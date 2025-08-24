import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";

function ExperienceSection() {
	return (
		<section id="experience" className="relative py-32">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				<div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="Work Experience" subtitle="My professional journey" />

				<div className="mt-16">
					<Timeline />
				</div>
			</div>
		</section>
	);
}

export default ExperienceSection;
