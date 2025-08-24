import { PROJECTS } from "@/assets/data";
import { ProjectCardSkeleton } from "@/components/loading-skeleton";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

const loading = false; // Replace with actual loading state
const error = false; // Replace with actual error state

function ProjectSection() {
	return (
		<section id="projects" className="relative py-32">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				<div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-yellow-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

				<div className="mt-16 grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{loading ? (
						// Loading skeleton
						<>
							{[...Array(6)].map((_, index) => (
								<ProjectCardSkeleton key={index} />
							))}
						</>
					) : error ? (
						// Error state
						<div className="col-span-full py-12 text-center">
							<div className="mb-4 text-red-400">Failed to load projects</div>
							<Button
								onClick={() => window.location.reload()}
								variant="outline"
								className="border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
							>
								Try Again
							</Button>
						</div>
					) : (
						// Projects from GitHub API
						<>
							{PROJECTS.map((project) => (
								<ProjectCard key={project.repoName} {...project} />
							))}
							{/* Coming Soon card */}
							<ProjectCard
								title="Coming Soon"
								description="An exciting new project is in development. Stay tuned for updates and be the first to know when it launches!"
								tags={["In Development", "Coming Soon", "Stay Tuned"]}
								image="/placeholder.png"
								demoUrl="#"
								repoUrl="#"
							/>
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default ProjectSection;
