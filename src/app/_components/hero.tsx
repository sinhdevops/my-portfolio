import { CONTACTS } from "@/assets/data";
import { ErrorBoundary } from "@/components/error-boundary";
import { HeroSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CreativeHero = dynamic(
	() => import("@/components/creative-hero").then((mod) => ({ default: mod.CreativeHero })),
	{
		ssr: false,
		loading: () => <HeroSkeleton />,
	},
);

const AnimatedName = dynamic(
	() => import("@/components/animated-name").then((mod) => ({ default: mod.AnimatedName })),
	{
		ssr: false,
	},
);

function HeroSection() {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
			<div className="relative z-10 container grid grid-cols-1 items-center gap-12 md:ml-30 lg:grid-cols-2">
				<div className="space-y-6">
					<div className="inline-block">
						<div className="relative mt-4 mb-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-xs">
							<span className="relative z-10">Frontend Developer</span>
							<span className="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20"></span>
						</div>
					</div>
					<h1 className="text-5xl font-bold tracking-tight md:text-7xl">
						<span className="block">Hi, I&apos;m</span>
						<AnimatedName />
					</h1>
					{/* <p id="description" className="max-w-[600px] text-xl text-zinc-400">
							I craft exceptional digital experiences with code, creativity, and a passion for innovation.
						</p> */}
					<div className="flex flex-wrap gap-4 pt-4">
						<Button variant="primary" className="group relative overflow-hidden">
							<span className="relative z-10 flex items-center">
								View Projects{" "}
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</span>
							<span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
						</Button>
						<Button
							variant="outline"
							className="border-zinc-700 bg-transparent text-pink-500 hover:border-zinc-500 hover:text-pink-700"
						>
							Contact Me
						</Button>
					</div>
					<div className="flex gap-4 pt-4">
						{CONTACTS.map(({ href, target, rel, icon, label }) => (
							<Link key={label} href={href} target={target} rel={rel}>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white"
								>
									{icon}
									<span className="sr-only">{label}</span>
								</Button>
							</Link>
						))}
					</div>
				</div>
				<div className="flex justify-center">
					<ErrorBoundary>
						<CreativeHero />
					</ErrorBoundary>
				</div>
			</div>

			{/* <Link
					href="#about"
					className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 animate-bounce lg:inline-block"
				>
					<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1">
						<div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60"></div>
					</div>
				</Link> */}
		</section>
	);
}

export default HeroSection;
