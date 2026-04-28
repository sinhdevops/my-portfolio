import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compress: true,
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "/**",
			},
		],
	},
	experimental: {
		optimizePackageImports: ["lucide-react", "motion/react", "@radix-ui/react-icons"],
	},
};

export default nextConfig;
