import { ContactForm } from "@/components/contact-form";
import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { Facebook, Github, Mail } from "lucide-react";
import Link from "next/link";

function ZaloIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2.3 27.6c-1.2.3-2.5.5-3.9.5-3.8 0-7-1.3-9.4-3.9-.5-.5-.9-1.1-1.3-1.7l2.8-1.6c.3.5.6.9 1 1.3 1.8 1.9 4.2 2.9 6.9 2.9.9 0 1.8-.1 2.6-.3l1.3 2.8zm1.5-4.4l-1.3-2.8c1.5-.7 2.7-1.8 3.5-3.2H20v-2.8h9.7c.1.5.1 1 .1 1.5 0 3.1-1.7 5.7-4.3 7.1l-2.3.2zm10.5 2.9c-1.8 1.9-4.2 3-6.9 3-.4 0-.8 0-1.2-.1l-1.3-2.8c.8.2 1.6.3 2.5.3 2.1 0 4-.8 5.4-2.1l2.7 1.5c-.4.4-.8.9-1.2 1.2zM34.3 22h-2.9c-.1-2.3-1.1-4.3-2.7-5.8l2-2.1c2.2 1.9 3.5 4.7 3.6 7.9z" />
		</svg>
	);
}

const CONTACT_ITEMS = [
	{
		icon: <Mail className="h-5 w-5 text-purple-400" />,
		label: "Email",
		value: "sinh.dev.ops@gmail.com",
		href: "mailto:sinh.dev.ops@gmail.com",
		external: false,
	},
	{
		icon: <ZaloIcon className="h-5 w-5 text-purple-400" />,
		label: "Zalo",
		value: "+84 325 610 016",
		href: "https://zalo.me/0325610016",
		external: true,
	},
	{
		icon: <Github className="h-5 w-5 text-purple-400" />,
		label: "GitHub",
		value: "github.com/sinhdevops",
		href: "https://github.com/sinhdevops",
		external: true,
	},
	{
		icon: <Facebook className="h-5 w-5 text-purple-400" />,
		label: "Facebook",
		value: "facebook.com/sinh.levan.39589",
		href: "https://www.facebook.com/sinh.levan.39589",
		external: true,
	},
];

function ContactSection() {
	return (
		<section id="contact" className="relative py-32">
			<div className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl" />
				<div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl" />
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="Get In Touch" subtitle="Let's work together" />

				<div className="mt-16 grid grid-cols-1 items-start gap-8 md:grid-cols-2">
					{/* Contact info card */}
					<GlassCard glow>
						<h3 className="mb-6 text-2xl font-bold">Contact Information</h3>

						<div className="space-y-4">
							{CONTACT_ITEMS.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									{...(item.external
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-zinc-700/30"
								>
									<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-700/50 transition-colors group-hover:bg-zinc-700">
										{item.icon}
									</div>
									<div className="min-w-0 flex-1">
										<div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
											{item.label}
										</div>
										<div className="truncate text-sm font-medium text-zinc-300 transition-colors group-hover:text-purple-400">
											{item.value}
										</div>
									</div>
								</Link>
							))}
						</div>

						<div className="mt-8 border-t border-zinc-700/50 pt-6">
							<div className="flex items-center gap-3">
								<div className="relative flex h-3 w-3 shrink-0">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
									<span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
								</div>
								<p className="text-sm text-zinc-400">
									Open to <span className="text-white font-medium">Frontend Developer</span> positions
									— onsite, remote, or freelance.
								</p>
							</div>
						</div>
					</GlassCard>

					{/* Contact form */}
					<ContactForm />
				</div>
			</div>
		</section>
	);
}

export default ContactSection;
