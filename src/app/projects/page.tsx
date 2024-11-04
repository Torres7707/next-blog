import { getGithubRepos } from "@/lib/github";
import Container from "@/components/Container";
import Link from "next/link";
import Header from "@/components/Header";
import MainNav from "@/components/main-nav";

export default async function ProjectsPage() {
	const repos = await getGithubRepos();

	return (
		<>
			<div className="bg-gray-100 dark:bg-gray-800">
				<Container>
					<MainNav />
				</Container>
			</div>
			<Header>
				<Container>
					<h1 className="title font-semibold text-2xl tracking-tighter mt-4">
						Projects
					</h1>
				</Container>
			</Header>
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
					{repos.map((repo) => (
						<Link
							key={repo.id}
							href={`/projects/${repo.name}`}
							className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
						>
							<h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								{repo.description}
							</p>
							<div className="flex items-center gap-4">
								{repo.language && (
									<span className="text-sm text-gray-500">
										<span className="mr-2">●</span>
										{repo.language}
									</span>
								)}
								{repo.stargazers_count > 0 && (
									<span className="text-sm text-gray-500">
										★ {repo.stargazers_count}
									</span>
								)}
							</div>
						</Link>
					))}
				</div>
			</Container>
		</>
	);
}
