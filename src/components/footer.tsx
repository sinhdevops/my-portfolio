import { Facebook, Github, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
	return (
		<footer className="relative overflow-hidden border-t border-zinc-800 py-12">
			<div className="animate-border-flow absolute top-0 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:300%_300%] opacity-90" />
			<div className="relative z-10 container flex flex-col items-center justify-between gap-8 md:flex-row">
				<div>
					<Link href="/" className="text-xl font-bold">
						<span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
							Em Sinh {""}
						</span>
						<span className="text-white">Kay</span>
					</Link>
					<p className="mt-2 text-sm text-zinc-500">
						© {new Date().getFullYear()} Em Sinh Kay. All rights reserved.
					</p>
				</div>
				<div className="flex gap-4">
					{[
						{
							href: "https://github.com/sinhdevops",
							icon: <Github className="h-5 w-5" />,
							label: "GitHub",
							external: true,
						},
						{
							href: "mailto:lesinh3005@gmail.com",
							icon: <Mail className="h-5 w-5" />,
							label: "Email",
							external: false,
						},
						{
							href: "https://zalo.me/0325610016",
							icon: <MessageCircle className="h-5 w-5" />,
							label: "Zalo",
							external: true,
						},
						{
							href: "https://www.facebook.com/sinh.levan.39589",
							icon: <Facebook className="h-5 w-5" />,
							label: "Facebook",
							external: true,
						},
					].map(({ href, icon, label, external }) => (
						<Link
							key={label}
							href={href}
							{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
						>
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
		</footer>
	);
}
