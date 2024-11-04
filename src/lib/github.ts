type Repository = {
	id: number;
	name: string;
	description: string;
	html_url: string;
	homepage: string;
	stargazers_count: number;
	language: string;
	topics: string[];
	created_at: string;
	updated_at: string;
	readme?: string;
};

export async function getGithubRepos(): Promise<Repository[]> {
	const query = `
		{
			viewer {
				pinnedItems(first: 6, types: [REPOSITORY]) {
					nodes {
						... on Repository {
							id
							name
							description
							url
							homepageUrl
							stargazerCount
							primaryLanguage {
								name
							}
							repositoryTopics(first: 10) {
								nodes {
									topic {
										name
									}
								}
							}
							createdAt
							updatedAt
						}
					}
				}
			}
		}
	`;

	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query }),
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch repos");
		}

		const { data } = await response.json();

		if (!data?.viewer?.pinnedItems?.nodes) {
			return [];
		}

		return data.viewer.pinnedItems.nodes.map((repo: any) => ({
			id: repo.id,
			name: repo.name,
			description: repo.description,
			html_url: repo.url,
			homepage: repo.homepageUrl,
			stargazers_count: repo.stargazerCount,
			language: repo.primaryLanguage?.name,
			topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
			created_at: repo.createdAt,
			updated_at: repo.updatedAt,
		}));
	} catch (error) {
		console.error("Error fetching pinned repos:", error);
		return [];
	}
}

export async function getGithubRepo(name: string): Promise<Repository | null> {
	const query = `
		{
			viewer {
				repository(name: "${name}") {
					id
					name
					description
					url
					homepageUrl
					stargazerCount
					primaryLanguage {
						name
					}
					object(expression: "HEAD:README.md") {
						... on Blob {
							text
						}
					}
				}
			}
		}
	`;

	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query }),
		});

		if (!response.ok) {
			return null;
		}

		const { data } = await response.json();
		const repo = data?.viewer?.repository;

		if (!repo) {
			return null;
		}

		return {
			id: repo.id,
			name: repo.name,
			description: repo.description,
			html_url: repo.url,
			homepage: repo.homepageUrl,
			stargazers_count: repo.stargazerCount,
			language: repo.primaryLanguage?.name,
			topics: [],
			created_at: "",
			updated_at: "",
			readme: repo.object?.text,
		};
	} catch (error) {
		console.error("Error fetching repo:", error);
		return null;
	}
}
