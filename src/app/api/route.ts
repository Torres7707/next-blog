import { prisma } from "@/db";

export async function GET(request: Request) {
	return new Response("Hello, world!", { status: 200 });
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
