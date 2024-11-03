import { popularPosts } from "@/lib/placeholder-data";
import { Icons } from "../icon";
import Link from "next/link";

export default function PopularPosts() {
	return (
		<ul className="overflow-auto">
			{popularPosts.map((post) => (
				<Link href={`/blog/${post.title}`} key={post.title}>
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
