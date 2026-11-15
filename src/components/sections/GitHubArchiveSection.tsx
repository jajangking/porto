"use client";

import React, { useMemo, useState } from "react";
import {
  ExternalLink,
  RefreshCw,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { usePortfolio } from "@/context/PortfolioContext";
import { GITHUB_SNAPSHOT } from "@/data/github-snapshot";
import { GitHubRepoItem } from "@/types/portfolio";

export function GitHubArchiveSection() {
  const { locale, openProject } = usePortfolio();
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

  const handleLiveSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.repos) && data.repos.length > 0) {
          setRepos(data.repos);
          setSourceLabel(data.source === "live-github" ? "live-github" : "snapshot");
        }
      }
    } catch {
      // keep existing snapshot
    } finally {
      setSyncing(false);
    }
  };

  return (
    <section id="archive" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="font-mono-tech text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              03 // GITHUB REPOSITORY VAULT
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              {locale === "id"
                ? "Arsip Kode & Deployment Live"
                : "Repository Vault & Live Deploys"}
            </h2>
            <p
              className="mt-2.5 max-w-2xl text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {locale === "id"
                ? "Terhubung langsung ke akun GitHub @jajangking — filter berdasarkan bahasa pemrograman atau buka aplikasi yang sudah live di Vercel."
                : "Synced with GitHub @jajangking — filter by programming language or jump straight into live Vercel deployments."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLiveSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 self-start border px-4 py-2.5 font-mono-tech text-xs transition hover:border-[var(--accent)] disabled:opacity-60"
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
        </div>

        {/* Filters */}
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
              borderColor: onlyLive ? "var(--accent)" : "var(--border-subtle)",
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

        {/* Repository Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRepos.map((repo) => (
            <div
              key={repo.name}
              className="reality-card hud-frame flex flex-col justify-between p-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
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
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
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
      </div>
    </section>
  );
}
