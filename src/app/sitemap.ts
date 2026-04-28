import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://emsinhkay.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date().toISOString();

	return [
		// ─── Core pages ─────────────────────────────────────────────────────────────
		{
			url: BASE_URL,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${BASE_URL}/projects`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},

		// ─── Static assets served via Next.js ────────────────────────────────────
		{
			url: `${BASE_URL}/sinhlv-cv.pdf`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		},

		// ─── GitHub profile & repos (sinhdevops) ────────────────────────────────
		{
			url: "https://github.com/sinhdevops",
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://github.com/sinhdevops/my-portfolio",
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: "https://github.com/sinhdevops/english-center",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.75,
		},
		{
			url: "https://github.com/sinhdevops/viorawine",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.75,
		},

		// ─── Social profiles ─────────────────────────────────────────────────────
		{
			url: "https://www.facebook.com/sinh.levan.39589",
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: "https://zalo.me/0325610016",
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.4,
		},
	];
}
