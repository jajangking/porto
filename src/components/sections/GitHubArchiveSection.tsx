"use client";

import React, { useMemo, useState } from "react";
import {
  ExternalLink,
  RefreshCw,
  Star,
  ArrowUpRight,
  Triangle,
  Lock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { usePortfolio } from "@/context/PortfolioContext";
import { GITHUB_SNAPSHOT } from "@/data/github-snapshot";
import { VERCEL_PROJECTS } from "@/data/vercel-projects";
import { GitHubRepoItem, VercelDeploymentItem } from "@/types/portfolio";

type VaultTab = "vercel" | "github";
type VercelFilter =
  | "ALL"
  | "Next.js"
  | "AI & Vision"
  | "Firebase"
  | "Supabase"
  | "Private Repo";

export function GitHubArchiveSection() {
  const { locale, openProject } = usePortfolio();
  const [vaultTab, setVaultTab] = useState<VaultTab>("vercel");

  // Vercel State
  const [vercelProjects, setVercelProjects] =
    useState<VercelDeploymentItem[]>(VERCEL_PROJECTS);
  const [vercelSource, setVercelSource] = useState<
    "verified-snapshot" | "live-vercel"
  >("verified-snapshot");
  const [vercelSyncing, setVercelSyncing] = useState(false);
  const [vercelFilter, setVercelFilter] = useState<VercelFilter>("ALL");

  // GitHub State
  const [repos, setRepos] = useState<GitHubRepoItem[]>(GITHUB_SNAPSHOT);
  const [sourceLabel, setSourceLabel] = useState<"snapshot" | "live-github">(
    "snapshot"
  );
  const [syncing, setSyncing] = useState(false);
  const [langFilter, setLangFilter] = useState<string>("ALL");
  const [onlyLive, setOnlyLive] = useState(false);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of repos) {
      const lang = r.language || "Other";
      counts.set(lang, (counts.get(lang) || 0) + 1);
    }
    return [
      "ALL",
      ...Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([k]) => k),
    ];
  }, [repos]);

  const visibleRepos = useMemo(() => {
    return repos.filter((r) => {
      if (onlyLive && !r.homepage) return false;
      if (langFilter !== "ALL" && (r.language || "Other") !== langFilter) {
        return false;
      }
      return true;
    });
  }, [langFilter, onlyLive, repos]);

  const visibleVercel = useMemo(() => {
    return vercelProjects.filter((proj) => {
      if (vercelFilter === "ALL") return true;
      if (vercelFilter === "Next.js") return proj.framework === "Next.js";
      if (vercelFilter === "Private Repo") return proj.visibility === "private";
      if (vercelFilter === "Firebase") {
        return proj.stack.some((s) => s.toLowerCase().includes("firebase"));
      }
      if (vercelFilter === "Supabase") {
        return proj.stack.some((s) => s.toLowerCase().includes("supabase"));
      }
      if (vercelFilter === "AI & Vision") {
        return proj.stack.some((s) =>
          /groq|mediapipe|onnx|tensorflow|tf\.js|vision/i.test(s)
        );
      }
      return true;
    });
  }, [vercelFilter, vercelProjects]);

  const handleLiveGitHubSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.repos) && data.repos.length > 0) {
          setRepos(data.repos);
          setSourceLabel(
            data.source === "live-github" ? "live-github" : "snapshot"
          );
        }
      }
    } catch {
      // keep existing snapshot
    } finally {
      setSyncing(false);
    }
  };

  const handleLiveVercelSync = async () => {
    setVercelSyncing(true);
    try {
      const res = await fetch("/api/vercel");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setVercelProjects(data.projects);
          setVercelSource(
            data.source === "live-vercel" ? "live-vercel" : "verified-snapshot"
          );
        }
      }
    } catch {
      // keep existing snapshot
    } finally {
      setVercelSyncing(false);
    }
  };

  const vercelFilters: VercelFilter[] = [
    "ALL",
    "Next.js",
    "AI & Vision",
    "Firebase",
    "Supabase",
    "Private Repo",
  ];

  return (
    <section id="archive" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="font-mono-tech text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              03 // VERCEL CLOUD &amp; GITHUB VAULT
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              {locale === "id"
                ? "16 Live Vercel Apps & Arsip GitHub"
                : "16 Live Vercel Apps & GitHub Vault"}
            </h2>
            <p
              className="mt-2.5 max-w-2xl text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {locale === "id"
                ? "Terhubung dengan deployment produksi di akun Vercel serta repositori kode @jajangking — termasuk proyek repositori privat yang aktif di cloud."
                : "Synced across all live production Vercel deployments and @jajangking GitHub repositories — including private cloud productions."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Source Switcher Tabs */}
            <div
              className="inline-flex border p-1"
              style={{
                borderRadius: "var(--radius-pill)",
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              <button
                type="button"
                onClick={() => setVaultTab("vercel")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono-tech text-xs font-semibold transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor:
                    vaultTab === "vercel" ? "var(--accent)" : "transparent",
                  color:
                    vaultTab === "vercel"
                      ? "var(--accent-contrast)"
                      : "var(--text-secondary)",
                }}
              >
                <Triangle className="h-3 w-3 fill-current" />
                <span>Vercel Live ({vercelProjects.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setVaultTab("github")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono-tech text-xs font-semibold transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor:
                    vaultTab === "github" ? "var(--accent)" : "transparent",
                  color:
                    vaultTab === "github"
                      ? "var(--accent-contrast)"
                      : "var(--text-secondary)",
                }}
              >
                <GitHubMark className="h-3.5 w-3.5" />
                <span>GitHub Repos ({repos.length})</span>
              </button>
            </div>

            {vaultTab === "vercel" ? (
              <button
                type="button"
                onClick={handleLiveVercelSync}
                disabled={vercelSyncing}
                className="inline-flex items-center gap-2 border px-4 py-2 font-mono-tech text-xs transition hover:border-[var(--accent)] disabled:opacity-60"
                style={{
                  borderRadius: "var(--radius-pill)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-[var(--accent)] ${
                    vercelSyncing ? "animate-spin" : ""
                  }`}
                />
                <span>
                  {vercelSyncing
                    ? locale === "id"
                      ? "Menyinkronkan..."
                      : "Syncing Vercel..."
                    : vercelSource === "live-vercel"
                      ? "Live Vercel · Refresh"
                      : locale === "id"
                        ? "Cek Status Vercel API"
                        : "Verify Vercel API"}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLiveGitHubSync}
                disabled={syncing}
                className="inline-flex items-center gap-2 border px-4 py-2 font-mono-tech text-xs transition hover:border-[var(--accent)] disabled:opacity-60"
                style={{
                  borderRadius: "var(--radius-pill)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-[var(--accent)] ${
                    syncing ? "animate-spin" : ""
                  }`}
                />
                <span>
                  {syncing
                    ? locale === "id"
                      ? "Menyinkronkan..."
                      : "Syncing GitHub..."
                    : sourceLabel === "live-github"
                      ? "Synced Live · Refresh"
                      : locale === "id"
                        ? "Sync Live GitHub API"
                        : "Sync Live GitHub API"}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* VERCEL DEPLOYMENTS PANEL */}
        {vaultTab === "vercel" && (
          <>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {vercelFilters.map((filter) => {
                  const active = vercelFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setVercelFilter(filter)}
                      className="px-3 py-1.5 font-mono-tech text-[11px] transition"
                      style={{
                        borderRadius: "var(--radius-pill)",
                        border: "1px solid var(--border-subtle)",
                        backgroundColor: active
                          ? "var(--accent)"
                          : "var(--bg-elevated)",
                        color: active
                          ? "var(--accent-contrast)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                {locale === "id"
                  ? `Menampilkan ${visibleVercel.length} dari ${vercelProjects.length} aplikasi produksi`
                  : `Showing ${visibleVercel.length} of ${vercelProjects.length} production apps`}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleVercel.map((proj) => {
                const isLatestBuildAlert =
                  proj.readyState === "PROMOTED_WITH_LATEST_ERROR";
                return (
                  <div
                    key={proj.id}
                    className="reality-card hud-frame flex flex-col justify-between p-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <Triangle className="h-3.5 w-3.5 shrink-0 fill-current text-[var(--accent)]" />
                          <span className="truncate font-display text-base font-bold">
                            {proj.name}
                          </span>
                          {proj.visibility === "private" && (
                            <span
                              title="Private GitHub Repository"
                              className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono-tech text-[9px] font-semibold"
                              style={{
                                borderColor: "var(--warn-border)",
                                backgroundColor: "var(--warn-bg)",
                                color: "var(--warn-text)",
                              }}
                            >
                              <Lock className="h-2.5 w-2.5" />
                              Private
                            </span>
                          )}
                        </div>

                        <span
                          className="inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.5 font-mono-tech text-[9px] font-semibold"
                          style={
                            isLatestBuildAlert
                              ? {
                                  borderColor: "var(--warn-border)",
                                  backgroundColor: "var(--warn-bg)",
                                  color: "var(--warn-text)",
                                }
                              : {
                                  borderColor: "var(--live-border)",
                                  backgroundColor: "var(--live-bg)",
                                  color: "var(--live-text)",
                                }
                          }
                          title={
                            isLatestBuildAlert
                              ? "Promoted production URL is live; latest commit errored on build"
                              : "Promoted production deployment READY"
                          }
                        >
                          {isLatestBuildAlert ? (
                            <AlertTriangle className="h-2.5 w-2.5" />
                          ) : (
                            <CheckCircle2 className="h-2.5 w-2.5" />
                          )}
                          <span>{isLatestBuildAlert ? "PROMOTED" : "READY"}</span>
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono-tech text-[10px] text-[var(--text-muted)]">
                        <span>{proj.framework}</span>
                        <span>· Node {proj.nodeVersion}</span>
                        <span>· {proj.region}</span>
                        <span>· {proj.updatedAt}</span>
                      </div>

                      <p
                        className="mt-2.5 line-clamp-2 text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {proj.summary[locale]}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {proj.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded px-1.5 py-0.5 font-mono-tech text-[9px]"
                            style={{
                              backgroundColor: "var(--bg-pill)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="mt-4 flex items-center justify-between border-t pt-3 font-mono-tech text-[10px]"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold hover:underline"
                        style={{ color: "var(--live-text)" }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>{proj.liveUrl.replace("https://", "")}</span>
                      </a>

                      <div className="flex items-center gap-2">
                        {proj.featuredSlug && (
                          <button
                            type="button"
                            onClick={() => openProject(proj.featuredSlug!)}
                            className="inline-flex items-center gap-0.5 text-[var(--accent)] hover:underline"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        )}
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          >
                            Repo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* GITHUB REPOS PANEL */}
        {vaultTab === "github" && (
          <>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => {
                  const active = langFilter === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLangFilter(lang)}
                      className="px-3 py-1.5 font-mono-tech text-[11px] transition"
                      style={{
                        borderRadius: "var(--radius-pill)",
                        border: "1px solid var(--border-subtle)",
                        backgroundColor: active
                          ? "var(--accent)"
                          : "var(--bg-elevated)",
                        color: active
                          ? "var(--accent-contrast)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setOnlyLive((v) => !v)}
                className="inline-flex items-center gap-2 border px-3.5 py-1.5 font-mono-tech text-[11px] transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  borderColor: onlyLive
                    ? "var(--accent)"
                    : "var(--border-subtle)",
                  backgroundColor: onlyLive
                    ? "var(--bg-pill)"
                    : "var(--bg-elevated)",
                  color: onlyLive ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>
                  {locale === "id" ? "Hanya Live Deploy" : "Live Deploys Only"}
                </span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="reality-card hud-frame flex flex-col justify-between p-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <GitHubMark className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                        <span className="truncate font-display text-base font-bold">
                          {repo.name}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 font-mono-tech text-[10px] text-[var(--text-muted)]">
                        {repo.stars > 0 && (
                          <span className="inline-flex items-center gap-0.5 text-amber-400">
                            <Star className="h-3 w-3 fill-current" />
                            {repo.stars}
                          </span>
                        )}
                        <span>{repo.updatedAt}</span>
                      </div>
                    </div>

                    <p
                      className="mt-2 line-clamp-2 text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {repo.description ||
                        (locale === "id"
                          ? "Repositori eksperimen & rekayasa perangkat lunak di github.com/jajangking."
                          : "Software engineering & prototyping repository on github.com/jajangking.")}
                    </p>
                  </div>

                  <div
                    className="mt-4 flex items-center justify-between border-t pt-3 font-mono-tech text-[10px]"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <span
                      className="rounded px-2 py-0.5"
                      style={{
                        backgroundColor: "var(--bg-pill)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {repo.language || "Multi-Stack"}
                    </span>

                    <div className="flex items-center gap-2.5">
                      {repo.featuredSlug && (
                        <button
                          type="button"
                          onClick={() => openProject(repo.featuredSlug!)}
                          className="inline-flex items-center gap-0.5 font-semibold text-[var(--accent)] hover:underline"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      )}
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-semibold hover:underline"
                          style={{ color: "var(--live-text)" }}
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Live</span>
                        </a>
                      )}
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        Code →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
