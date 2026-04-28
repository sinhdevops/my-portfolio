import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://emsinhkay.vercel.app";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Các dự án của Lê Văn Sinh (sinhdevops / emsinhkay) – Web apps, open-source, và freelance projects với React, Next.js, TypeScript.",
	keywords: [
		"Em Sinh Kay projects",
		"sinhdevops projects",
		"emsinhkay portfolio",
		"Lê Văn Sinh dự án",
		"levansinh github",
		"React projects Vietnam",
		"Next.js projects",
		"TypeScript web apps",
		"frontend developer portfolio",
		"open source Vietnam",
		"web developer projects",
	],
	alternates: {
		canonical: `${BASE_URL}/projects`,
	},
	openGraph: {
		type: "website",
		locale: "vi_VN",
		url: `${BASE_URL}/projects`,
		siteName: "Em Sinh Kay Portfolio",
		title: "Projects | Em Sinh Kay – React & Next.js Developer",
		description:
			"Khám phá các dự án của Lê Văn Sinh – từ web app thương mại đến open-source, xây dựng với React, Next.js, TypeScript.",
		images: [
			{
				url: `${BASE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Em Sinh Kay – Projects Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects | Em Sinh Kay – React & Next.js Developer",
		description:
			"Khám phá các dự án của Lê Văn Sinh (sinhdevops) – React, Next.js, TypeScript.",
	},
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
