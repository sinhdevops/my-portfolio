"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { http } from "@/config/http.config";
import { useMutation } from "@tanstack/react-query";
import { InputValidation } from "./ui/input";
import { TextareaValidation } from "./ui/textarea";

const INITIAL_VALUES = {
	name: "",
	email: "",
	subject: "",
	message: "",
};

const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
	email: z.email("Please enter a valid email address"),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters")
		.max(100, "Subject must be less than 100 characters"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ApiResponse {
	error?: string;
	message?: string;
	id?: string;
}

export function ContactForm() {
	const { toast } = useToast();

	const uploadContact = async ({ ...payload }) => {
		const response = await http.post<ApiResponse>("/api/contact", {
			payload,
		});

		return response;
	};

	const { mutate, isPending } = useMutation({ mutationFn: uploadContact });

	const methods = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: INITIAL_VALUES,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = methods;

	const submitHandler = handleSubmit(async (data: ContactFormData) => {
		mutate(data, {
			onSuccess: () => {
				toast({
					title: "Message sent!",
					description: "Thanks for reaching out. I'll get back to you soon.",
				});
				reset();
			},
			onError: (result: ApiResponse) => {
				toast({
					title: "Error",
					description: result.error || "Failed to send message. Please try again.",
					variant: "destructive",
				});
			},
		});
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 backdrop-blur-xs transition-all duration-300 hover:border-purple-500/50">
				<div className="absolute -inset-1 rounded-xl bg-linear-to-r from-purple-500/10 to-pink-500/10 opacity-25 blur-sm transition duration-1000 hover:opacity-100 hover:duration-200"></div>

				<div className="relative">
					<h3 className="mb-6 text-2xl font-bold">Send Me a Message</h3>

					<FormProvider {...methods}>
						<form onSubmit={submitHandler} className="space-y-6">
							<div className="space-y-2">
								<InputValidation
									label="Name"
									id="name"
									placeholder="Your Name"
									{...register("name")}
									aria-invalid={!!errors.name}
									aria-describedby={errors.name ? "name-error" : undefined}
									disabled={isPending}
									className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
								/>
							</div>

							<div className="space-y-2">
								<InputValidation
									label="Email"
									id="email"
									type="email"
									name="email"
									placeholder="Your Email"
									aria-invalid={!!errors.email}
									aria-describedby={errors.email ? "email-error" : undefined}
									disabled={isPending}
									className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
								/>
							</div>

							<div className="space-y-2">
								<InputValidation
									id="subject"
									name="subject"
									label="Subject"
									placeholder="Subject"
									aria-invalid={!!errors.subject}
									aria-describedby={errors.subject ? "subject-error" : undefined}
									disabled={isPending}
									className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
								/>
							</div>

							<div className="space-y-2">
								<TextareaValidation
									id="message"
									label="Message"
									placeholder="Your Message"
									rows={5}
									name="message"
									aria-invalid={!!errors.message}
									aria-describedby={errors.message ? "message-error" : undefined}
									disabled={isPending}
									className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
								/>
							</div>

							<Button type="submit" variant="primary" className="w-full" disabled={isPending}>
								{isPending ? (
									<>Sending...</>
								) : (
									<>
										Send Message <Send className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</form>
					</FormProvider>
				</div>
			</div>
		</motion.div>
	);
}
