"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lock,
  Maximize2,
  Pin,
  X,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectVisualPreview } from "@/components/ProjectVisualPreview";

export function ProjectStageDrawer() {
  const {
    activeProject,
    closeProject,
    stepProject,
    pinnedSlugs,
    togglePinProject,
    locale,
    mode,
  } = usePortfolio();

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md"
          onClick={closeProject}
        >
          <motion.aside
            key={activeProject.slug}
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-3xl flex-col overflow-y-auto border-l shadow-2xl"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-strong)",
            }}
          >
            {/* Sticky Stage Top Bar */}
            <div
              className="sticky top-0 z-20 flex items-center justify-between border-b px-5 py-3.5 backdrop-blur-xl sm:px-7"
              style={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex items-center gap-2.5 font-mono-tech text-xs">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: activeProject.accentHex }}
                />
                <span className="font-semibold">@{activeProject.repoName}</span>
                <span className="text-[var(--text-muted)]">
                  · {activeProject.year}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => togglePinProject(activeProject.slug)}
                  className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-mono-tech text-[11px] font-semibold transition"
                  style={{
                    borderColor: pinnedSlugs.includes(activeProject.slug)
                      ? "var(--accent)"
                      : "var(--border-subtle)",
                    backgroundColor: pinnedSlugs.includes(activeProject.slug)
                      ? "var(--bg-pill)"
                      : "transparent",
                    color: pinnedSlugs.includes(activeProject.slug)
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  }}
                >
                  <Pin className="h-3.5 w-3.5" />
                  <span>
                    {pinnedSlugs.includes(activeProject.slug)
                      ? "Pinned"
                      : "Pin"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => stepProject(-1)}
                  aria-label="Previous Project"
                  className="rounded-lg border p-1.5 transition hover:border-[var(--accent)]"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => stepProject(1)}
                  aria-label="Next Project"
                  className="rounded-lg border p-1.5 transition hover:border-[var(--accent)]"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href={`/projects/${activeProject.slug}`}
                  onClick={closeProject}
                  className="hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono-tech text-[11px] transition hover:border-[var(--accent)] sm:inline-flex"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>{locale === "id" ? "Halaman Penuh" : "Full Page"}</span>
                </Link>
                <button
                  type="button"
                  onClick={closeProject}
                  aria-label="Close Case Study"
                  className="ml-1 rounded-lg border p-1.5 transition hover:border-[var(--accent)]"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stage Body */}
            <div className="space-y-7 p-5 sm:p-8">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
                  {activeProject.title}
                </h2>
                <p
                  className="mt-2.5 text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {activeProject.summary[locale]}
                </p>

                {/* Action Links */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {activeProject.repoUrl ? (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition hover:opacity-90"
                      style={{
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-contrast)",
                      }}
                    >
                      <GitHubMark className="h-4 w-4" />
                      <span>
                        {locale === "id"
                          ? "Lihat Source Code"
                          : "View GitHub Repo"}
                      </span>
                    </a>
                  ) : activeProject.isPrivateRepo ? (
                    <span
                      className="inline-flex items-center gap-2 border px-4 py-2 font-mono-tech text-xs font-semibold"
                      style={{
                        borderRadius: "var(--radius-pill)",
                        borderColor: "var(--warn-border)",
                        backgroundColor: "var(--warn-bg)",
                        color: "var(--warn-text)",
                      }}
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>
                        {locale === "id"
                          ? "Repositori Privat"
                          : "Private GitHub Repo"}
                      </span>
                    </span>
                  ) : null}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border px-4 py-2 text-xs font-semibold transition hover:border-[var(--accent)]"
                      style={{
                        borderRadius: "var(--radius-pill)",
                        borderColor: "var(--live-border)",
                        backgroundColor: "var(--live-bg)",
                        color: "var(--live-text)",
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>
                        {locale === "id" ? "Buka Live Demo" : "Open Live Deploy"}
                      </span>
                    </a>
                  )}
                </div>

                {activeProject.relatedDeploys &&
                  activeProject.relatedDeploys.length > 0 && (
                    <div className="mt-4">
                      <div className="mb-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        {locale === "id"
                          ? "Deployment Terkait di Vercel"
                          : "Related Live Vercel Deployments"}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.relatedDeploys.map((deploy) => (
                          <a
                            key={deploy.url}
                            href={deploy.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 border px-2.5 py-1 font-mono-tech text-[10px] font-medium transition hover:border-[var(--live-border)]"
                            style={{
                              borderRadius: "var(--radius-pill)",
                              borderColor: "var(--border-subtle)",
                              backgroundColor: "var(--bg-elevated)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <ExternalLink
                              className="h-2.5 w-2.5"
                              style={{ color: "var(--live-text)" }}
                            />
                            <span>{deploy.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Interactive Simulation Preview */}
              <div
                className="h-64 overflow-hidden border sm:h-72"
                style={{
                  borderRadius: mode === "hud" ? "4px" : "18px",
                  borderColor: "var(--border-strong)",
                }}
              >
                <ProjectVisualPreview
                  preset={activeProject.simulationPreset}
                  accentHex={activeProject.accentHex}
                  interactive={true}
                />
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-3">
                {activeProject.metrics.map((m) => (
                  <div
                    key={m.label.en}
                    className="reality-card p-3.5 text-center sm:p-4"
                  >
                    <div className="font-display text-lg font-bold sm:text-xl">
                      {m.value}
                    </div>
                    <div
                      className="mt-0.5 font-mono-tech text-[10px] uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {m.label[locale]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge & Architecture */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="reality-card p-5">
                  <div
                    className="font-mono-tech text-[10px] tracking-widest uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {locale === "id" ? "Tantangan Teknis" : "Engineering Challenge"}
                  </div>
                  <p
                    className="mt-2 text-xs leading-relaxed sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {activeProject.challenge[locale]}
                  </p>
                </div>
                <div className="reality-card p-5">
                  <div
                    className="font-mono-tech text-[10px] tracking-widest uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {locale === "id" ? "Solusi Arsitektur" : "System Architecture"}
                  </div>
                  <p
                    className="mt-2 text-xs leading-relaxed sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {activeProject.architectureSummary[locale]}
                  </p>
                </div>
              </div>

              {/* 3-Layer Interactive Pipeline */}
              <div>
                <div
                  className="mb-3 font-mono-tech text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {locale === "id"
                    ? "Alur Pipeline Sistem"
                    : "System Pipeline Layers"}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {activeProject.architectureNodes.map((node) => (
                    <div key={node.layer} className="reality-card hud-frame p-4">
                      <div
                        className="font-mono-tech text-[10px]"
                        style={{ color: activeProject.accentHex }}
                      >
                        {node.layer}
                      </div>
                      <div className="mt-1 text-sm font-bold">{node.title}</div>
                      <p
                        className="mt-1.5 text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {node.detail[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="reality-card p-5">
                <div
                  className="mb-3 font-mono-tech text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  {locale === "id"
                    ? "Terobosan & Keunggulan"
                    : "Key Engineering Highlights"}
                </div>
                <ul className="space-y-2.5">
                  {activeProject.highlights[locale].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed sm:text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: activeProject.accentHex }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Stack Badges */}
              <div>
                <div
                  className="mb-2.5 font-mono-tech text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
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
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
