import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://emsinhkay.vercel.app";

function formatSlugToTitle(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const title = formatSlugToTitle(slug);
	const canonicalUrl = `${BASE_URL}/projects/${slug}`;

	return {
		title,
		description: `Chi tiết dự án "${title}" của Lê Văn Sinh (sinhdevops / emsinhkay) – Frontend Developer. Xem source code, công nghệ sử dụng, và demo.`,
		keywords: [
			`${title} project`,
			`sinhdevops ${slug}`,
			`emsinhkay ${slug}`,
			"Lê Văn Sinh project",
			"Em Sinh Kay portfolio",
			"React Next.js project",
			"frontend developer Vietnam",
			"web developer project",
		],
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type: "website",
			locale: "vi_VN",
			url: canonicalUrl,
			siteName: "Em Sinh Kay Portfolio",
			title: `${title} | Em Sinh Kay`,
			description: `Dự án "${title}" – xây dựng bởi Lê Văn Sinh (sinhdevops). Xem code, demo, và chi tiết kỹ thuật.`,
			images: [
				{
					url: `${BASE_URL}/og-image.png`,
					width: 1200,
					height: 630,
					alt: `${title} – Em Sinh Kay`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | Em Sinh Kay`,
			description: `Dự án "${title}" của Lê Văn Sinh (sinhdevops) – Frontend Developer.`,
		},
	};
}

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
