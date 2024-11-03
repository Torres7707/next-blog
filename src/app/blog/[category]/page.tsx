import { notFound } from "next/navigation";
import { getBlogPosts } from "../utils";
import Container from "@/components/Container";
import CardCategory from "@/components/CardCategory";
import Link from "next/link";
import Header from "@/components/Header";
import NotFound from "@/app/not-found";

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ category: post.metadata.category }));
}

export default function BlogCategoryPage({
	params,
}: {
	params: { category: string };
}) {
	const posts = getBlogPosts()
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		)
		.filter((post) => post.metadata.category === params.category);
	if (posts.length === 0) {
		return <NotFound />;
	}
	return (
		<>
			<Header>
				<Container>
					<h1 className="title font-semibold text-2xl tracking-wider mt-4">
						{posts?.[0]?.metadata.category}
					</h1>
				</Container>
			</Header>
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.metadata.category}/${post.slug}`}
						>
							<CardCategory
								key={post.slug}
								title={post.metadata.title}
								summary={post.metadata.summary}
								date={post.metadata.publishedAt}
							/>
						</Link>
					))}
				</div>
			</Container>
		</>
	);
}
