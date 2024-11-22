import { POSTS } from "@/lib/constants";
import { getBlogPosts } from "./blog/utils";

export const baseUrl = "https://torres7707.wang";

export default async function sitemap() {
	let blogs = getBlogPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.metadata.category}/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	let routes = POSTS.map((route) => ({
		url: `${baseUrl}${route.href}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...blogs, ...routes];
}