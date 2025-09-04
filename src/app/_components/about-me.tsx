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
								I&apos;m a Frontend Developer specializing in React and Next.js, focused on crafting
								modern, responsive, and scalable web applications.
							</p>
							<p className="mt-4 text-lg text-zinc-300">
								I&apos;m love building intuitive UIs with attention to performance, accessibility, and
								great user experience, while collaborating closely with designers and backend teams.
							</p>
							<p className="mt-4 text-lg text-zinc-300">
								Beyond coding, I explore emerging technologies, contribute to open-source, and
								continuously improve my skills to stay ahead in the industry.
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
								<Link href="/sinhlv-cv.pdf" target="_blank" rel="noopener noreferrer">
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
