import { NextResponse } from "next/server";
import { GITHUB_SNAPSHOT } from "@/data/github-snapshot";
import { PROJECTS } from "@/data/projects";
import { GitHubRepoItem } from "@/types/portfolio";

interface GitHubApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  homepage: string | null;
  pushed_at: string;
  html_url: string;
  fork: boolean;
  size: number;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/jajangking/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "jajangking-master-porto",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({
        source: "snapshot",
        totalCount: GITHUB_SNAPSHOT.length,
        repos: GITHUB_SNAPSHOT,
      });
    }

    const rawRepos: GitHubApiRepo[] = await res.json();
    const projectSlugByRepo = new Map<string, string>();
    for (const p of PROJECTS) {
      projectSlugByRepo.set(p.repoName.toLowerCase(), p.slug);
    }

    const curatedFallbackByRepo = new Map(
      GITHUB_SNAPSHOT.map((item) => [item.name.toLowerCase(), item])
    );

    const normalized: GitHubRepoItem[] = rawRepos
      .filter((r) => !r.fork && r.name !== "porto" && r.size > 0)
      .map((r) => {
        const key = r.name.toLowerCase();
        const fallback = curatedFallbackByRepo.get(key);
        return {
          name: r.name,
          description: r.description || fallback?.description || null,
          language: r.language || fallback?.language || null,
          stars: r.stargazers_count ?? 0,
          homepage: r.homepage || fallback?.homepage || null,
          updatedAt: r.pushed_at ? r.pushed_at.slice(0, 10) : "",
          url: r.html_url,
          featuredSlug: projectSlugByRepo.get(key) || fallback?.featuredSlug,
        };
      });

    return NextResponse.json({
      source: "live-github",
      totalCount: rawRepos.length,
      repos: normalized,
    });
  } catch {
    return NextResponse.json({
      source: "snapshot",
      totalCount: GITHUB_SNAPSHOT.length,
      repos: GITHUB_SNAPSHOT,
    });
  }
}
