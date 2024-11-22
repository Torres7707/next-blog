type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		linkedin: string;
		github: string;
	};
};

export const siteConfig: SiteConfig = {
	name: "Torres7707 Blog",
	description:
		"An Open source Technical Blog platform with Next.js 14 with shadcn/ui, prisma and markdown support.",
	url: "https://www.torres7707.wang/",
	ogImage: "https://www.torres7707.wang/og",
	links: {
		linkedin: "https://www.linkedin.com/in/dong-wang-7798aa17b/",
		github: "https://github.com/Torres7707",
	},
};
