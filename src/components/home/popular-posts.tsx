"use client";

import { popularPosts } from "@/lib/placeholder-data";
import { Icons } from "../icon";
import Link from "next/link";
import useSWR from "swr";
import { fetchUrl, fetcher } from "@/lib/utils";
import { SkeletonCard } from "@/components/skeleton/popular-posts-skeleton";
export default function PopularPosts() {
	const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

	if (error) return <div>Error loading popular posts</div>;
	if (isLoading) return <SkeletonCard />;

	return (
		<ul className="overflow-auto">
			{data?.map((post: { title: string; slug: string; category: string }) => (
				<Link href={`/blog/${post.category}/${post.slug}`} key={post.title}>
					<li
						key={post.title}
						className="flex items-center gap-2 cursor-pointer py-2 hover:text-blue-400 group"
					>
						<Icons.arrowRight className="size-5 group-hover:translate-x-1 transition-all" />
						{post.title}
					</li>
				</Link>
			))}
		</ul>
	);
}
