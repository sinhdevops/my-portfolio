import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

import { MultipleRepositoriesReport, MultipleRepositoriesResponse } from "@/@types/github";

import { CACHE_CONFIGS, generateCacheKey, githubCache } from "./github-cache";

interface FetchOptions {
	cache?: boolean;
	ttl?: number;
	concurrency?: number;
	rateLimitDelay?: number;
}

export class GitHubRepositoryError extends Error {
	constructor(
		message: string,
		public readonly statusCode?: number,
		public readonly repoName?: string,
		public readonly originalError?: unknown,
	) {
		super(message);
		this.name = "GitHubRepositoryError";
	}
}

class GitHubAPI {
	private token: string;
	private octokit: Octokit;

	constructor() {
		const token = process.env.GITHUB_TOKEN;
		if (!token) {
			throw new Error("GitHub token not found");
		}
		this.token = token;
		this.octokit = new Octokit({ auth: this.token });
	}

	async getRepository(
		repoName: string,
		options: FetchOptions = {},
	): Promise<{
		data: RestEndpointMethodTypes["repos"]["get"]["response"]["data"];
		wasRenamed: boolean;
		originalName?: string;
		newName?: string;
	}> {
		const cacheKey = generateCacheKey("repos", { repo: repoName });
		if (options.cache !== false) {
			const cached = githubCache.get(cacheKey);
			if (cached) {
				return { data: cached, wasRenamed: false };
			}
		}

		try {
			const [owner, repo] = repoName.split("/");
			const res = await this.octokit.rest.repos.get({ owner, repo });

			// Check if repository was renamed
			const currentFullName = res.data.full_name;
			const requestedFullName = repoName;
			const wasRenamed = currentFullName !== requestedFullName;

			if (options.cache !== false) {
				githubCache.set(cacheKey, res.data, options.ttl || CACHE_CONFIGS.REPO_INFO.ttl);

				// Also cache with the new name if renamed
				if (wasRenamed) {
					const newCacheKey = generateCacheKey("repos", { repo: currentFullName });
					githubCache.set(newCacheKey, res.data, options.ttl || CACHE_CONFIGS.REPO_INFO.ttl);
				}
			}

			return {
				data: res.data,
				wasRenamed,
				originalName: wasRenamed ? requestedFullName : undefined,
				newName: wasRenamed ? currentFullName : undefined,
			};
		} catch {
			throw new GitHubRepositoryError("Repository not found", 404, repoName);
		}
	}

	async getRepositoryLanguages(repoName: string, options: FetchOptions = {}): Promise<Record<string, number>> {
		const cacheKey = generateCacheKey("languages", { repo: repoName });
		if (options.cache !== false) {
			const cached = githubCache.get(cacheKey);
			if (cached) {
				return cached as Record<string, number>;
			}
		}
		try {
			const [owner, repo] = repoName.split("/");
			const res = await this.octokit.rest.repos.listLanguages({ owner, repo });
			if (options.cache !== false) {
				githubCache.set(cacheKey, res.data, options.ttl || CACHE_CONFIGS.REPO_LANGUAGES.ttl);
			}
			return res.data;
		} catch (error) {
			console.error(
				`❌ Error fetching languages for ${repoName}:`,
				error instanceof Error ? error.message : error,
			);
			return {};
		}
	}

	async getRateLimit(): Promise<RestEndpointMethodTypes["rateLimit"]["get"]["response"]["data"] | null> {
		const cacheKey = generateCacheKey("rate_limit");
		const cached = githubCache.get(cacheKey);
		if (cached) {
			return cached;
		}
		try {
			const res = await this.octokit.rest.rateLimit.get();
			githubCache.set(cacheKey, res.data, CACHE_CONFIGS.RATE_LIMIT.ttl);
			return res.data;
		} catch (error) {
			console.error("❌ Error checking rate limit:", error);
			return null;
		}
	}

	async getMultipleRepositories(
		repoNames: string[],
		options: FetchOptions = {},
	): Promise<MultipleRepositoriesReport> {
		const results: MultipleRepositoriesResponse = new Map();
		const summary = {
			total: repoNames.length,
			successful: 0,
			failed: 0,
			renamed: 0,
			renamedRepos: [] as Array<{ original: string; new: string }>,
			errors: [] as Array<{ repoName: string; error: string }>,
		};

		// Process repositories with optional concurrency control
		const concurrency = options.concurrency || 3; // Limit concurrent requests
		const chunks = this.chunkArray(repoNames, concurrency);

		for (const chunk of chunks) {
			const promises = chunk.map(async (repoName) => {
				try {
					const repoResult = await this.getRepository(repoName, options);

					results.set(repoName, repoResult);
					summary.successful++;

					// Track renamed repositories
					if (repoResult.wasRenamed) {
						summary.renamed++;
						summary.renamedRepos.push({
							original: repoResult.originalName!,
							new: repoResult.newName!,
						});

						console.log(
							`🔄 Repository renamed detected: ${repoResult.originalName} -> ${repoResult.newName}`,
						);
					}

					return { repoName, success: true, result: repoResult };
				} catch (error) {
					const errorMessage =
						error instanceof GitHubRepositoryError
							? error.message
							: error instanceof Error
								? error.message
								: "Unknown error";

					console.error(`❌ Failed to fetch ${repoName}:`, error);

					results.set(repoName, null);
					summary.failed++;
					summary.errors.push({ repoName, error: errorMessage });

					return { repoName, success: false, error: errorMessage };
				}
			});

			// Wait for current chunk to complete before processing next chunk
			await Promise.all(promises);

			// Rate limiting between chunks
			if (options.rateLimitDelay && chunks.indexOf(chunk) < chunks.length - 1) {
				await new Promise((resolve) => setTimeout(resolve, options.rateLimitDelay));
			}
		}

		// Log summary
		console.log(
			`📊 Repository fetch summary: ${summary.successful}/${summary.total} successful, ${summary.renamed} renamed, ${summary.failed} failed`,
		);

		if (summary.renamedRepos.length > 0) {
			console.log("🔄 Renamed repositories:", summary.renamedRepos);
		}

		if (summary.errors.length > 0) {
			console.log("❌ Failed repositories:", summary.errors);
		}

		return { results, summary };
	}

	async addCollaborator(
		repoName: string,
		username: string,
		permission: "pull" | "push" | "admin" = "pull",
	): Promise<boolean> {
		const [owner, repo] = repoName.split("/");
		try {
			await this.octokit.rest.repos.addCollaborator({
				owner,
				repo,
				username,
				permission,
			});
			return true;
		} catch (error: any) {
			// 422: already a collaborator
			if (error.status === 422) return true;
			console.error(`GitHub API error (addCollaborator):`, error);
			throw error;
		}
	}

	async getReadonlyRepository(
		repoName: string,
		username: string,
	): Promise<RestEndpointMethodTypes["repos"]["get"]["response"]["data"]> {
		const [sourceOwner, sourceRepo] = repoName.split("/");
		const targetOrg = "sinhdevops-minor";

		try {
			let forkedRepo;
			try {
				const res = await this.octokit.rest.repos.get({
					owner: targetOrg,
					repo: sourceRepo,
				});
				forkedRepo = res.data;
			} catch (err: any) {
				// 404: NOT FOUND
				if (err.status === 404) {
					const forkResponse = await this.octokit.rest.repos.createFork({
						owner: sourceOwner,
						repo: sourceRepo,
						organization: targetOrg,
					});
					await new Promise((resolve) => setTimeout(resolve, 8000));
					forkedRepo = forkResponse.data;
				} else {
					throw err;
				}
			}

			if (forkedRepo && forkedRepo.owner.login === targetOrg) {
				try {
					await this.octokit.rest.repos.mergeUpstream({
						owner: targetOrg,
						repo: sourceRepo,
						branch: forkedRepo.default_branch,
					});
				} catch (syncErr: any) {
					console.warn("Sync upstream failed or not enabled:", syncErr?.message || syncErr);
				}
			}

			await this.octokit.rest.repos.addCollaborator({
				owner: targetOrg,
				repo: sourceRepo,
				username,
				permission: "pull",
			});

			return forkedRepo;
		} catch (error: any) {
			console.error(`GitHub API error (getReadonlyRepository):`, error);
			throw error;
		}
	}

	async removeCollaborator(repoName: string, username: string): Promise<void> {
		const [owner, repo] = repoName.split("/");
		await this.octokit.rest.repos.removeCollaborator({
			owner,
			repo,
			username,
		});
	}

	async getAllUserRepositories(
		username: string,
		options: FetchOptions = {},
	): Promise<RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"]> {
		const cacheKey = generateCacheKey("user_repos", { username });
		if (options.cache !== false) {
			const cached = githubCache.get(cacheKey);
			if (cached) {
				return cached;
			}
		}

		try {
			// Fetch all repositories for the user with pagination
			const allRepositories = await this.octokit.paginate(this.octokit.rest.repos.listForUser, {
				username,
				type: "all",
				sort: "updated",
				direction: "desc",
				per_page: 100,
			});

			// Filter out forked repositories to only show original repositories
			const repositories = allRepositories.filter((repo) => !repo.fork);

			if (options.cache !== false) {
				githubCache.set(cacheKey, repositories, options.ttl || CACHE_CONFIGS.REPO_INFO.ttl);
			}

			return repositories;
		} catch (error) {
			console.error(`❌ Error fetching repositories for ${username}:`, error);
			throw new GitHubRepositoryError("Failed to fetch user repositories", 404, username);
		}
	}

	getCacheStats() {
		return githubCache.getStats();
	}

	clearCache(): void {
		githubCache.clear();
	}

	clearCacheEntry(key: string): void {
		githubCache.delete(key);
	}

	private chunkArray<T>(array: T[], size: number): T[][] {
		const chunks: T[][] = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	}
}

// Type for the factory function
export function createGitHubAPI(): GitHubAPI {
	return new GitHubAPI();
}

// Type for the fallback function
export async function fetchRepositoryWithFallback<T extends NonNullable<unknown>>(
	api: GitHubAPI,
	repoName: string,
	fallbackData: T,
) {
	try {
		const repoData = await api.getRepository(repoName);
		return {
			...fallbackData,
			...repoData,
			isFromGitHub: true,
		};
	} catch (error) {
		console.warn(`Using fallback data for ${repoName}:`, error instanceof Error ? error.message : error);
		return {
			...fallbackData,
			isFromGitHub: false,
		};
	}
}
