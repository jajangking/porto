import { NextResponse } from "next/server";
import { VERCEL_PROJECTS } from "@/data/vercel-projects";
import { VercelDeploymentItem } from "@/types/portfolio";

interface VercelApiProject {
  id: string;
  name: string;
  framework: string | null;
  nodeVersion?: string;
  updatedAt?: number;
  updated_at?: number;
  link?: {
    type?: string;
    org?: string;
    repo?: string;
  };
  targets?: {
    production?: {
      alias?: string[];
      readyState?: string;
      createdAt?: number;
      meta?: {
        githubCommitMessage?: string;
        githubRepoVisibility?: string;
      };
    };
  };
}

export async function GET() {
  const token = process.env.VERCEL_API_TOKEN;
  const teamId =
    process.env.VERCEL_TEAM_ID || "team_P6HXirCFtY1olB2hDK9TrMaj";

  if (!token) {
    return NextResponse.json({
      source: "verified-snapshot",
      totalCount: VERCEL_PROJECTS.length,
      projects: VERCEL_PROJECTS,
    });
  }

  try {
    const res = await fetch(
      `https://api.vercel.com/v9/projects?teamId=${encodeURIComponent(teamId)}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({
        source: "verified-snapshot",
        totalCount: VERCEL_PROJECTS.length,
        projects: VERCEL_PROJECTS,
      });
    }

    const payload = (await res.json()) as { projects?: VercelApiProject[] };
    const snapshotMap = new Map(
      VERCEL_PROJECTS.map((item) => [item.name.toLowerCase(), item])
    );

    const normalized: VercelDeploymentItem[] = (payload.projects || []).map(
      (proj) => {
        const fallback = snapshotMap.get(proj.name.toLowerCase());
        const prod = proj.targets?.production;
        const primaryAlias = prod?.alias?.[0];
        const liveUrl = primaryAlias
          ? `https://${primaryAlias}`
          : fallback?.liveUrl || `https://${proj.name}.vercel.app`;
        const isPrivate =
          prod?.meta?.githubRepoVisibility === "private" ||
          fallback?.visibility === "private";
        const updatedMs = proj.updatedAt ?? proj.updated_at;

        return {
          id: proj.id,
          name: proj.name,
          liveUrl,
          framework:
            proj.framework === "nextjs"
              ? "Next.js"
              : proj.framework === "express"
                ? "Express"
                : fallback?.framework || "Web App",
          nodeVersion: proj.nodeVersion || fallback?.nodeVersion || "24.x",
          region: fallback?.region || "iad1",
          readyState:
            prod?.readyState === "ERROR"
              ? "PROMOTED_WITH_LATEST_ERROR"
              : "READY",
          visibility: isPrivate ? "private" : "public",
          githubRepo:
            proj.link?.org && proj.link?.repo
              ? `${proj.link.org}/${proj.link.repo}${isPrivate ? " (Private)" : ""}`
              : fallback?.githubRepo || `jajangking/${proj.name}`,
          repoUrl:
            !isPrivate && proj.link?.org && proj.link?.repo
              ? `https://github.com/${proj.link.org}/${proj.link.repo}`
              : fallback?.repoUrl,
          summary: fallback?.summary || {
            id: `Aplikasi web live yang di-deploy otomatis melalui Vercel (${proj.framework || "Web"}).`,
            en: `Live web application deployed continuously via Vercel (${proj.framework || "Web"}).`,
          },
          latestCommitMessage:
            prod?.meta?.githubCommitMessage?.split("\n")[0] ||
            fallback?.latestCommitMessage ||
            "Production deployment active",
          updatedAt: updatedMs
            ? new Date(updatedMs).toISOString().slice(0, 10)
            : fallback?.updatedAt || "",
          stack: fallback?.stack || [proj.framework || "Vercel", "Edge"],
          featuredSlug: fallback?.featuredSlug,
        };
      }
    );

    return NextResponse.json({
      source: "live-vercel",
      totalCount: normalized.length,
      projects: normalized.length > 0 ? normalized : VERCEL_PROJECTS,
    });
  } catch {
    return NextResponse.json({
      source: "verified-snapshot",
      totalCount: VERCEL_PROJECTS.length,
      projects: VERCEL_PROJECTS,
    });
  }
}
