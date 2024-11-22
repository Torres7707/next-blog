import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { BreadcrumbWithCustomSeparator } from "@/components/Breadcrump";
import Container from "@/components/Container";
import { CustomMDX } from "@/components/CustomMDX";
import Header from "@/components/Header";
import NotFound from "@/app/not-found";
import ReportViews from "@/components/ReportViews";
import { baseUrl } from "@/app/sitemap";

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export function generateMetadata({
	params,
}: {
	params: { slug: string; category: string };
}) {
	let post = getBlogPosts().find((post) => post.slug === params.slug);
	if (!post) {
		return;
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;

	let ogImage = image
		? image
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/blog/${post?.metadata.category}/${post?.slug}}`,
			images: [{ url: ogImage }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: { category: string; slug: string };
}) {
	const { slug } = params;
	const post = getBlogPosts().find((post) => post.slug === slug);

	if (!post) {
		return <NotFound />;
	}

	return (
		<>
			<ReportViews
				slug={post.slug}
				title={post.metadata.title}
				category={post.metadata.category}
			/>
			<Header>
				<Container>
					<BreadcrumbWithCustomSeparator
						category={post.metadata.category}
						slug={post.slug}
					/>
					<h1 className="title font-semibold text-2xl tracking-tighter mt-4">
						{post.metadata.title}
					</h1>
					<div className="flex justify-between items-center mt-2 mb-4 text-sm">
						<p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
							{formatDate(post.metadata.publishedAt)}
						</p>
					</div>
				</Container>
			</Header>
			<Container>
				<article className="prose">
					<CustomMDX source={post.content} />
				</article>
			</Container>
		</>
	);
}
