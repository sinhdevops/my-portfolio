import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { Mail, Github, Facebook } from "lucide-react";
import { SiZalo } from "react-icons/si";

function ContactSection() {
	return (
		<section id="contact" className="relative py-32">
			<div className="absolute inset-0 z-0">
				<div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				<div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
			</div>

			<div className="relative z-10 container">
				<SectionHeading title="Get In Touch" subtitle="Let's work together" />

				<div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
					<div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm">
						<h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
						<div className="space-y-6">
							{[
								{
									icon: <Mail className="h-5 w-5 text-purple-400" />,
									label: "Email",
									value: "lesinh3005@gmail.com",
								},
								{
									icon: <SiZalo className="h-5 w-5 text-purple-400" />,
									label: "Zalo",
									value: "zalo.me/0325610016",
								},
								{
									icon: <Github className="h-5 w-5 text-purple-400" />,
									label: "GitHub",
									value: "github.com/sinhdevops",
								},
								{
									icon: <Facebook className="h-5 w-5 text-purple-400" />,
									label: "Facebook",
									value: "facebook.com/sinh.levan.39589",
								},
							].map((item, idx) => (
								<div key={idx} className="flex items-center gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
										{item.icon}
									</div>
									<div className="min-w-0 flex-1">
										<div className="text-sm text-zinc-500">{item.label}</div>
										<div className="truncate font-medium">{item.value}</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 border-t border-zinc-800 pt-8">
							<h4 className="mb-4 text-lg font-medium">Current Status</h4>
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
								<span>Open to Junior Frontend Developer positions onsite, remote, or freelance.</span>
							</div>
						</div>
					</div>

					<ContactForm />
				</div>
			</div>
		</section>
	);
}

export default ContactSection;
