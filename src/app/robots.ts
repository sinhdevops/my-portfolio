import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://emsinhkay.vercel.app";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/repository/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/api/", "/repository/"],
			},
			{
				userAgent: "Googlebot-Image",
				allow: ["/", "/*.jpg", "/*.jpeg", "/*.png", "/*.gif", "/*.webp", "/*.avif"],
			},
		],
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
