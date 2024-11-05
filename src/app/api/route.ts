import { prisma } from "@/db";

export async function GET() {
	try {
		const popularPosts = await prisma.blog.findMany({
			orderBy: { view_count: "desc" },
			take: 10,
			select: {
				title: true,
				slug: true,
				category: true,
			},
		});
		return new Response(JSON.stringify(popularPosts), { status: 200 });
	} catch (err) {
		console.error("Error fetching popular posts", err);
		return new Response("Failed to fetch popular posts", { status: 500 });
	}
}

export async function POST(request: Request) {
	const { slug, title, category } = await request.json();

	try {
		const existingBlog = await prisma.blog.findUnique({
			where: { slug },
		});

		if (existingBlog) {
			await prisma.blog.update({
				where: { slug },
				data: { view_count: { increment: 1 } },
			});
		} else {
			await prisma.blog.create({
				data: { slug, title, category },
			});
		}
	} catch (err) {
		console.error("Error updating page view count", err);
		return new Response("Failed to post to DB", { status: 500 });
	}

	return new Response("Successfully posted to DB", { status: 200 });
}
