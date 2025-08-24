import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

function AboutMeSection() {
	return (
		<section id="about" className="relative py-32">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				<div className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="About Me" subtitle="Information" />

				<div className="mx-auto mt-16 grid w-[80%] grid-cols-1 items-center justify-center gap-12 md:grid-cols-1">
					<div className="space-y-12">
						<div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm">
							<p className="text-lg text-zinc-300">
								I&apos;m a passionate software engineer with experience building web applications and
								digital products. I specialize in frontend development with React and Next.js, but
								I&apos;m also comfortable working with backend technologies like Node.js and NestJS.
							</p>
							<p className="mt-4 text-lg text-zinc-300">
								My journey in tech started with a strong foundation in software development. I&apos;ve
								worked with enthusiams friends to create intuitive, performant, and accessible digital
								experiences.
							</p>
							<p className="mt-4 text-lg text-zinc-300">
								When I&apos;m not coding, you can find me exploring new technologies, contributing to
								open-source projects, and staying up-to-date with the latest industry trends.
							</p>

							<div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
								<div className="space-y-1">
									<div className="text-sm text-zinc-500">Full Name</div>
									<div className="font-medium">Lê Văn Sinh</div>
								</div>
								<div className="space-y-1">
									<div className="text-sm text-zinc-500">Email</div>
									<div className="max-w-[180px] truncate font-medium">lesinh3005@gmail.com</div>
								</div>
								<div className="space-y-1">
									<div className="text-sm text-zinc-500">Location</div>
									<div className="font-medium">Viet Nam 🇻🇳</div>
								</div>
								<div className="space-y-1">
									<div className="text-sm text-zinc-500">Level</div>
									<div className="font-medium text-green-500">Junior</div>
								</div>
							</div>

							<div className="mt-8">
								<Link href="/sinhlv-cv-frontend.pdf" target="_blank" rel="noopener noreferrer">
									<Button className="bg-zinc-800 text-white hover:bg-zinc-700">
										<Download className="mr-2 h-4 w-4" />
										Download Resume
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AboutMeSection;
