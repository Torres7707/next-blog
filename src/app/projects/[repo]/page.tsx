import { getGithubRepo } from "@/lib/github";
import Container from "@/components/Container";
import Header from "@/components/Header";
import MainNav from "@/components/main-nav";
import NotFound from "@/app/not-found";
import { CustomMDX } from "@/components/CustomMDX";
import Link from "next/link";
import { Icons } from "@/components/icon";

export default async function ProjectPage({
	params,
}: {
	params: { repo: string };
}) {
	const repo = await getGithubRepo(params.repo);

	if (!repo) {
		return <NotFound />;
	}

	return (
		<>
			<div className="bg-gray-100 dark:bg-gray-800">
				<Container>
					<MainNav />
				</Container>
			</div>
			<Header>
				<Container>
					<div className="flex items-center gap-4">
						<Link
							href="/projects"
							className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 hover:scale-110 transition-all dark:hover:text-gray-100"
						>
							<Icons.arrowLeft className="w-6 h-6 relative top-[1px]" />
						</Link>
						<h1 className="title font-semibold text-2xl tracking-tighter flex items-center">
							{repo.name}
						</h1>
					</div>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						{repo.description}
					</p>
					<div className="flex items-center gap-4 mt-4">
						{repo.language && (
							<span className="text-sm text-gray-500">
								<span className="mr-2">●</span>
								{repo.language}
							</span>
						)}
						<span className="text-sm text-gray-500">
							★ {repo.stargazers_count}
						</span>
						<a
							href={repo.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-600"
						>
							View on GitHub →
						</a>
					</div>
				</Container>
			</Header>
			<Container>
				<article className="prose dark:prose-invert max-w-none mt-10">
					{repo.readme ? (
						<CustomMDX source={repo.readme} />
					) : (
						<p>No README available</p>
					)}
				</article>
			</Container>
		</>
	);
}
