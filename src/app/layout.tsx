import Footer from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://emsinhkay.vercel.app";

const SEO_KEYWORDS = [
	// Identity
	"Em Sinh Kay",
	"sinhdevops",
	"emsinhkay",
	"Lê Văn Sinh",
	"Le Van Sinh",
	"levansinh",
	"sinh le van",
	// Role
	"Frontend Developer",
	"Web Developer",
	"React Developer",
	"Next.js Developer",
	"TypeScript Developer",
	"JavaScript Developer",
	"Full Stack Developer",
	"Software Engineer",
	// Tech stack
	"React",
	"Next.js",
	"TypeScript",
	"JavaScript",
	"Node.js",
	"Tailwind CSS",
	"Framer Motion",
	"Supabase",
	"PostgreSQL",
	// Portfolio
	"Portfolio",
	"Portfolio Developer Vietnam",
	"Web Developer Vietnam",
	"Frontend Developer Vietnam",
	"Developer Da Nang",
	"Developer Viet Nam",
	// Intent
	"hire frontend developer",
	"freelance web developer",
	"react nextjs developer for hire",
];

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	applicationName: "Em Sinh Kay - Portfolio",
	title: {
		default: "Em Sinh Kay | Frontend Developer – React & Next.js",
		template: "%s | Em Sinh Kay",
	},
	description:
		"Portfolio của Lê Văn Sinh (sinhdevops / emsinhkay) – Frontend Developer chuyên React, Next.js, TypeScript. 2+ năm kinh nghiệm, open to work.",
	keywords: SEO_KEYWORDS,
	authors: [
		{ name: "Lê Văn Sinh", url: BASE_URL },
		{ name: "Em Sinh Kay", url: "https://github.com/sinhdevops" },
	],
	creator: "Lê Văn Sinh",
	publisher: "Em Sinh Kay",
	category: "Technology",
	classification: "Portfolio, Software Development",
	robots: {
		index: true,
		follow: true,
		"max-snippet": -1,
		"max-image-preview": "large",
		"max-video-preview": -1,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1,
		},
	},
	alternates: {
		canonical: BASE_URL,
		languages: {
			"vi-VN": BASE_URL,
			"en-US": BASE_URL,
		},
	},
	openGraph: {
		type: "website",
		locale: "vi_VN",
		alternateLocale: ["en_US"],
		url: BASE_URL,
		siteName: "Em Sinh Kay Portfolio",
		title: "Em Sinh Kay | Frontend Developer – React & Next.js",
		description:
			"Portfolio của Lê Văn Sinh (sinhdevops) – Frontend Developer với 2+ năm kinh nghiệm React, Next.js, TypeScript. Xem dự án & liên hệ.",
		images: [
			{
				url: `${BASE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Em Sinh Kay – Frontend Developer Portfolio",
				type: "image/png",
			},
		],
		countryName: "Vietnam",
	},
	twitter: {
		card: "summary_large_image",
		site: "@sinhdevops",
		creator: "@sinhdevops",
		title: "Em Sinh Kay | Frontend Developer – React & Next.js",
		description:
			"Portfolio của Lê Văn Sinh (sinhdevops) – Frontend Developer chuyên React, Next.js, TypeScript.",
		images: [`${BASE_URL}/og-image.png`],
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
	},
	formatDetection: {
		email: true,
		address: false,
		telephone: false,
	},
	referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: "#000000",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${BASE_URL}/#person`,
	name: "Lê Văn Sinh",
	alternateName: ["Em Sinh Kay", "sinhdevops", "emsinhkay", "levansinh"],
	url: BASE_URL,
	image: `${BASE_URL}/apple-icon.png`,
	jobTitle: "Frontend Developer",
	description:
		"Frontend Developer chuyên React, Next.js, TypeScript với 2+ năm kinh nghiệm xây dựng web application.",
	knowsAbout: [
		"React",
		"Next.js",
		"TypeScript",
		"JavaScript",
		"Node.js",
		"Tailwind CSS",
		"Supabase",
		"PostgreSQL",
		"Frontend Development",
		"Web Development",
	],
	nationality: {
		"@type": "Country",
		name: "Vietnam",
	},
	sameAs: [
		"https://github.com/sinhdevops",
		"https://www.facebook.com/sinh.levan.39589",
		"https://zalo.me/0325610016",
	],
	email: "sinh.dev.ops@gmail.com",
	worksFor: {
		"@type": "Organization",
		name: "Freelance",
	},
	hasOccupation: {
		"@type": "Occupation",
		name: "Frontend Developer",
		occupationLocation: {
			"@type": "Country",
			name: "Vietnam",
		},
		skills: "React, Next.js, TypeScript, Node.js, Tailwind CSS",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" dir="ltr" suppressHydrationWarning>
			<GoogleAnalytics gaId="G-MGK3BM8C3J" />
			<GoogleTagManager gtmId="GTM-MMWR3898" />

			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://api.github.com" />
				<link rel="dns-prefetch" href="//fonts.googleapis.com" />
				<link rel="dns-prefetch" href="//api.github.com" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body id="home" className="scroll-smooth">
				<ScrollProgress />
				<div className="pointer-events-none absolute inset-0 z-0">
					<div className="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
					<div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-yellow-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
					<div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
				</div>
				<div className="min-h-screen overflow-hidden bg-linear-to-b from-zinc-900 via-zinc-900 to-black text-white">
					<ReactQueryProvider>
						{children}
						<Footer />
					</ReactQueryProvider>
					<Analytics />
					<Toaster />
				</div>
			</body>
		</html>
	);
}
