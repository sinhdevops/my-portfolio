import Footer from "@/components/footer";
import { SWRProvider } from "@/components/providers/swr-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

import "./globals.css";

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL ??
	(process.env.NODE_ENV === "production" ? "https://xiro-portfolio.vercel.app" : "http://localhost:3000");

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	applicationName: "Em Sinh Kay - Portfolio",
	title: { default: "Em Sinh Kay - Web Developer", template: "Em Sinh Kay" },
	description: "Em Sinh Kay Portfolio - Frontend Developer",
	keywords: [
		"Web Developer",
		"React",
		"Next.js",
		"TypeScript",
		"Node.js",
		"Tailwind CSS",
		"Portfolio Developer",
		"Em Sinh Kay",
	],
	authors: [{ name: "Em Sinh Kay", url: "https://github.com/levansinh/" }],
	creator: "Em Sinh Kay",
	publisher: "Em Sinh Kay",
	robots: {
		index: true,
		follow: true,
		"max-snippet": -1,
		"max-image-preview": "large",
		"max-video-preview": -1,
	},
	openGraph: {
		title: "Em Sinh Kay - Web Developer",
		description: "Em Sinh Kay Portfolio - Frontend Developer",
		type: "website",
		locale: "vi_VN",
		countryName: "Vietnam",
		url: BASE_URL,
	},
	twitter: {
		card: "summary_large_image",
		title: "Em Sinh Kay - Web Developer",
		description: "Em Sinh Kay Portfolio - Frontend Developer",
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
	maximumScale: 1,
	userScalable: false,
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: [dark],
				variables: {
					colorPrimary: "#a855f7", // Purple-500 to match your blob animation
					colorBackground: "#18181b", // Zinc-900 to match your background
					colorText: "#ffffff",
					colorInputText: "#ffffff",
					colorInputBackground: "#27272a", // Zinc-800 for subtle contrast
					borderRadius: "0.5rem",
				},
				elements: {
					card: "backdrop-blur-lg bg-zinc-900/50",
					formButtonPrimary: "bg-purple-500 hover:bg-purple-600",
					socialButtonsIconButton: "hover:bg-zinc-800",
					footerActionLink: "text-purple-400 hover:text-purple-300",
				},
			}}
		>
			<html lang="en" dir="ltr" suppressHydrationWarning>
				<GoogleAnalytics gaId="G-MGK3BM8C3J" />
				<GoogleTagManager gtmId="GTM-MMWR3898" />

				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					{/* Preconnect to external domains */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link rel="preconnect" href="https://api.github.com" />
					<link rel="preconnect" href="https://vercel.live" />

					{/* DNS prefetch for performance */}
					<link rel="dns-prefetch" href="//fonts.googleapis.com" />
					<link rel="dns-prefetch" href="//api.github.com" />
					<link rel="dns-prefetch" href="//vercel.live" />
				</head>
				<body id="home" className="scroll-smooth">
					<ScrollProgress />
					<div className="pointer-events-none absolute inset-0 z-0">
						<div className="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
						<div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-yellow-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
						<div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
					</div>
					<div className="min-h-screen overflow-hidden bg-linear-to-b from-zinc-900 via-zinc-900 to-black text-white">
						<SWRProvider>
							{children}
							<Footer />
						</SWRProvider>
						<Analytics />
						<Toaster />
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
