interface GitHubApiRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    fork: boolean;
    private: boolean;
}

export interface Repository {
    id: number;
    name: string;
    description: string | null;
    url: string;
    homepage: string | null;
    stars: number;
    language: string | null;
    topics: string[];
    updatedAt: string;
}

export async function getPublicRepositories(username: string): Promise<Repository[]> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?type=public&sort=updated`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.statusText}`);
        }

        const repos: GitHubApiRepo[] = await response.json();

        return repos
            .filter(repo => !repo.private)
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                homepage: repo.homepage,
                stars: repo.stargazers_count,
                language: repo.language,
                topics: repo.topics,
                updatedAt: new Date(repo.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            }));
    } catch (error) {
        console.error('Error fetching public repositories:', error);
        return [];
    }
}