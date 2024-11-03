import { formatDate, getBlogPosts } from "@/app/blog/utils";
import Link from "next/link";

export default function LatestPosts() {
	const latestPosts = getBlogPosts()
		.filter((post) => post.metadata?.publishedAt)
		.sort((a, b) => {
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			);
		});

	return (
		<>
			<h1 className="inline-block font-heading text-2xl tracking-tight lg:text-4xl">
				Recently Published
			</h1>
			<div>
				{latestPosts.map((post) => (
					// <PostCard key={post.slug} post={post} />
					<article key={post.slug} className="text-wrap max-w-md my-10">
						<Link href={`/blog/${post.metadata.category}/${post.slug}`}>
							<h2 className="font-bold leading-5 hover:text-blue-400">
								{post.metadata.title}
							</h2>
							<p className="leading-5 my-5">{post.metadata.summary}</p>
							<p className="text-sm text-muted-foreground">
								{formatDate(post.metadata.publishedAt)}
							</p>
						</Link>
					</article>
				))}
			</div>
		</>
	);
}
