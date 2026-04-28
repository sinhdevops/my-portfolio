import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Repository Access Portal",
	description: "Secure portal để request quyền truy cập private GitHub repositories.",
	robots: {
		index: false,
		follow: false,
		noarchive: true,
		nosnippet: true,
	},
};

export default function RepositoryLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
