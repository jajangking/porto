"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lock,
  Pin,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { ProjectCaseStudy } from "@/types/portfolio";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectVisualPreview } from "@/components/ProjectVisualPreview";

export function ProjectDetailPageView({
  project,
  prevProject,
  nextProject,
}: {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
}) {
  const { locale, mode, pinnedSlugs, togglePinProject } = usePortfolio();
  const isPinned = pinnedSlugs.includes(project.slug);

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-32 sm:px-6 sm:pt-36">
      <Link
        href="/"
        className="inline-flex items-center gap-2 border px-4 py-2 font-mono-tech text-xs transition hover:border-[var(--accent)]"
        style={{
          borderRadius: "var(--radius-pill)",
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>
          {locale === "id" ? "Kembali ke Master Porto" : "Back to Master Porto"}
        </span>
      </Link>

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: project.accentHex }}
          />
          <span style={{ color: "var(--accent)" }}>@{project.repoName}</span>
          <span className="text-[var(--text-muted)]">· {project.primaryLang}</span>
          <span className="text-[var(--text-muted)]">· {project.year}</span>
        </div>

        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.summary[locale]}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold transition hover:opacity-90"
              style={{
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              <GitHubMark className="h-4 w-4" />
              <span>
                {locale === "id" ? "Buka Repositori GitHub" : "Open GitHub Repo"}
              </span>
            </a>
          ) : project.isPrivateRepo ? (
            <span
              className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono-tech text-xs font-semibold"
              style={{
                borderRadius: "var(--radius-pill)",
                borderColor: "var(--warn-border)",
                backgroundColor: "var(--warn-bg)",
                color: "var(--warn-text)",
              }}
            >
              <Lock className="h-3.5 w-3.5" />
              <span>
                {locale === "id" ? "Repositori Privat" : "Private GitHub Repo"}
              </span>
            </span>
          ) : null}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-semibold transition hover:opacity-85"
              style={{
                borderRadius: "var(--radius-pill)",
                borderColor: "var(--live-border)",
                backgroundColor: "var(--live-bg)",
                color: "var(--live-text)",
              }}
            >
              <ExternalLink className="h-4 w-4" />
              <span>
                {locale === "id" ? "Buka Live Deployment" : "Open Live Deploy"}
              </span>
            </a>
          )}
          <button
            type="button"
            onClick={() => togglePinProject(project.slug)}
            className="inline-flex items-center gap-2 border px-4 py-2.5 font-mono-tech text-xs font-semibold transition hover:border-[var(--accent)]"
            style={{
              borderRadius: "var(--radius-pill)",
              borderColor: isPinned ? "var(--accent)" : "var(--border-subtle)",
              backgroundColor: isPinned
                ? "var(--bg-pill)"
                : "var(--bg-elevated)",
              color: isPinned ? "var(--accent)" : "var(--text-secondary)",
            }}
          >
            <Pin className="h-3.5 w-3.5" />
            <span>
              {isPinned
                ? locale === "id"
                  ? "Tersemat di Top Picks"
                  : "Pinned to Top Picks"
                : locale === "id"
                  ? "Pin ke Top Picks"
                  : "Pin to Top Picks"}
            </span>
          </button>
        </div>

        {project.relatedDeploys && project.relatedDeploys.length > 0 && (
          <div className="mt-5">
            <div className="mb-2 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "id"
                ? "Deployment Terkait di Vercel"
                : "Related Live Vercel Deployments"}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.relatedDeploys.map((deploy) => (
                <a
                  key={deploy.url}
                  href={deploy.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border px-3 py-1 font-mono-tech text-xs transition hover:border-[var(--live-border)]"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-elevated)",
                    color: "var(--text-primary)",
                  }}
                >
                  <ExternalLink
                    className="h-3 w-3"
                    style={{ color: "var(--live-text)" }}
                  />
                  <span>{deploy.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Preview Stage */}
      <div
        className="mt-10 h-72 overflow-hidden border sm:h-96"
        style={{
          borderRadius: mode === "hud" ? "4px" : "20px",
          borderColor: "var(--border-strong)",
        }}
      >
        <ProjectVisualPreview
          preset={project.simulationPreset}
          accentHex={project.accentHex}
          interactive={true}
        />
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {project.metrics.map((m) => (
          <div key={m.label.en} className="reality-card hud-frame p-5 text-center">
            <div className="font-display text-2xl font-bold">{m.value}</div>
            <div className="mt-1 font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
              {m.label[locale]}
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="reality-card p-6">
          <div
            className="font-mono-tech text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            {locale === "id" ? "Tantangan Teknis" : "Engineering Challenge"}
          </div>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.challenge[locale]}
          </p>
        </div>
        <div className="reality-card p-6">
          <div
            className="font-mono-tech text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            {locale === "id" ? "Solusi Arsitektur" : "Architecture Solution"}
          </div>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.architectureSummary[locale]}
          </p>
        </div>
      </div>

      {/* 3-Layer Pipeline */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {project.architectureNodes.map((node) => (
          <div key={node.layer} className="reality-card hud-frame p-5">
            <div
              className="font-mono-tech text-[11px]"
              style={{ color: project.accentHex }}
            >
              {node.layer}
            </div>
            <div className="mt-1.5 text-base font-bold">{node.title}</div>
            <p
              className="mt-2 text-xs leading-relaxed sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {node.detail[locale]}
            </p>
          </div>
        ))}
      </div>

      {/* Highlights & Stack */}
      <div className="reality-card mt-8 p-6">
        <div
          className="mb-4 font-mono-tech text-xs tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          {locale === "id" ? "Keunggulan Utama" : "Key Breakthroughs"}
        </div>
        <ul className="space-y-3">
          {project.highlights[locale].map((h) => (
            <li
              key={h}
              className="flex items-start gap-3 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: project.accentHex }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 flex flex-wrap gap-2 border-t pt-5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border px-3 py-1 font-mono-tech text-xs"
              style={{
                borderRadius: "var(--radius-pill)",
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-pill)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Prev / Next Navigation */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="reality-card group flex items-center justify-between p-5"
        >
          <div>
            <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
              ← {locale === "id" ? "Sebelumnya" : "Previous"}
            </div>
            <div className="mt-1 font-display text-base font-bold group-hover:text-[var(--accent)]">
              {prevProject.title}
            </div>
          </div>
          <ArrowLeft className="h-4 w-4 text-[var(--text-muted)]" />
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="reality-card group flex items-center justify-between p-5 text-right"
        >
          <ArrowRight className="h-4 w-4 text-[var(--text-muted)]" />
          <div>
            <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
              {locale === "id" ? "Berikutnya" : "Next"} →
            </div>
            <div className="mt-1 font-display text-base font-bold group-hover:text-[var(--accent)]">
              {nextProject.title}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
