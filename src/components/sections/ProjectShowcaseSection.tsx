"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  LayoutGrid,
  List,
  Search,
  Sparkles,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECT_CATEGORY_LABELS, PROJECTS } from "@/data/projects";
import { ProjectCaseStudy, ProjectCategory } from "@/types/portfolio";
import { ProjectVisualPreview } from "@/components/ProjectVisualPreview";

export function ProjectShowcaseSection() {
  const { mode, locale, openProject } = usePortfolio();
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [search, setSearch] = useState("");
  const [viewLayout, setViewLayout] = useState<"bento" | "list">("bento");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const catMatch = category === "all" || p.category === category;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.tagline[locale].toLowerCase().includes(q)
      );
    });
  }, [category, locale, search]);

  return (
    <section id="showcase" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="font-mono-tech text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              {locale === "id"
                ? "01 // CURATED MASTER SHOWCASE"
                : "01 // CURATED MASTER SHOWCASE"}
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
              {locale === "id"
                ? "Karya Pilihan & Eksperimen Sistem"
                : "Flagship Works & Systems Lab"}
            </h2>
            <p
              className="mt-3 max-w-2xl text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {locale === "id"
                ? "Klik kartu mana saja untuk masuk ke Case Study Stage interaktif tanpa reload—lengkap dengan diagram arsitektur dan pratinjau simulasi."
                : "Click any project to morph into the zero-reload Interactive Case Study Stage—complete with architecture schematics and live simulation previews."}
            </p>
          </div>

          {/* Search & Layout Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div
              className="flex items-center gap-2 border px-3 py-2 text-xs"
              style={{
                borderRadius: "var(--radius-pill)",
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  locale === "id" ? "Filter stack / nama..." : "Filter stack / name..."
                }
                className="w-36 bg-transparent outline-none placeholder:text-[var(--text-muted)] sm:w-44"
              />
            </div>

            <div
              className="flex items-center border p-1"
              style={{
                borderRadius: "var(--radius-pill)",
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              <button
                type="button"
                onClick={() => setViewLayout("bento")}
                aria-label="Bento Grid View"
                className="p-1.5 transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor:
                    viewLayout === "bento" ? "var(--accent)" : "transparent",
                  color:
                    viewLayout === "bento"
                      ? "var(--accent-contrast)"
                      : "var(--text-muted)",
                }}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewLayout("list")}
                aria-label="Index List View"
                className="p-1.5 transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor:
                    viewLayout === "list" ? "var(--accent)" : "transparent",
                  color:
                    viewLayout === "list"
                      ? "var(--accent-contrast)"
                      : "var(--text-muted)",
                }}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {PROJECT_CATEGORY_LABELS.map((tab) => {
            const active = category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className="relative px-4 py-2 text-xs font-medium transition-colors"
                style={{
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-subtle)",
                  color: active ? "var(--accent-contrast)" : "var(--text-secondary)",
                }}
              >
                {active && (
                  <motion.span
                    layoutId="showcase-filter-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10"
                    style={{
                      borderRadius: "var(--radius-pill)",
                      backgroundColor: "var(--accent)",
                    }}
                  />
                )}
                {tab.label[locale]}
              </button>
            );
          })}
        </div>

        {/* Projects Grid / List */}
        {viewLayout === "bento" ? (
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12"
          >
            {filtered.map((project, index) => {
              const isWide =
                category === "all" && !search && (index === 0 || index === 1 || index === 4);
              return (
                <BentoProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  mode={mode}
                  isWide={isWide}
                  onOpen={() => openProject(project.slug)}
                />
              );
            })}
          </motion.div>
        ) : (
          <div className="mt-8 space-y-3">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.slug}
                onClick={() => openProject(project.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProject(project.slug);
                  }
                }}
                className="reality-card hud-frame group flex cursor-pointer flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: project.accentHex }}
                    />
                    <span className="font-display text-lg font-bold">
                      {project.title}
                    </span>
                    <span
                      className="rounded px-2 py-0.5 font-mono-tech text-[10px]"
                      style={{
                        backgroundColor: "var(--bg-pill)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {project.primaryLang}
                    </span>
                    {project.liveUrl && (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 font-mono-tech text-[10px] text-emerald-400">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-1.5 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.tagline[locale]}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div className="hidden flex-wrap justify-end gap-1.5 lg:flex">
                    {project.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 font-mono-tech text-[10px]"
                        style={{
                          borderRadius: "var(--radius-pill)",
                          backgroundColor: "var(--bg-pill)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="reality-card mt-8 p-10 text-center text-sm text-[var(--text-muted)]">
            {locale === "id"
              ? "Tidak ada proyek yang cocok dengan filter saat ini."
              : "No projects match the current filter."}
          </div>
        )}
      </div>
    </section>
  );
}

function BentoProjectCard({
  project,
  locale,
  mode,
  isWide,
  onOpen,
}: {
  project: ProjectCaseStudy;
  locale: "id" | "en";
  mode: string;
  isWide: boolean;
  onOpen: () => void;
}) {
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  return (
    <motion.article
      layout
      initial={{ y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35 }}
      onClick={onOpen}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          active: true,
        });
      }}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      data-interactive="true"
      className={`reality-card hud-frame group relative flex cursor-pointer flex-col justify-between overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1 ${
        isWide ? "lg:col-span-6" : "lg:col-span-4"
      }`}
    >
      {/* Interactive Cursor Spotlight Glow (Obsidian & HUD) */}
      {mode !== "editorial" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spot.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${project.accentHex}22, transparent 55%)`,
          }}
        />
      )}

      {/* Visual Simulation Stage */}
      <div
        className="relative mb-4 h-44 overflow-hidden border"
        style={{
          borderRadius: mode === "hud" ? "3px" : "14px",
          borderColor: "var(--border-subtle)",
        }}
      >
        <ProjectVisualPreview
          preset={project.simulationPreset}
          accentHex={project.accentHex}
        />

        <div className="pointer-events-none absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 font-mono-tech text-[9px] text-white backdrop-blur">
              <Sparkles className="h-2.5 w-2.5 text-amber-300" />
              FLAGSHIP
            </span>
          )}
          {project.liveUrl && (
            <span className="rounded-full bg-emerald-500/85 px-2 py-0.5 font-mono-tech text-[9px] font-semibold text-black">
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            <span>{project.primaryLang}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-display mt-1.5 text-lg font-bold leading-snug sm:text-xl">
            {project.title}
          </h3>
          <p
            className="mt-2 line-clamp-2 text-xs leading-relaxed sm:text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.tagline[locale]}
          </p>
        </div>

        {/* Footer Stack + Links */}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 font-mono-tech text-[10px]"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--bg-pill)",
                  color: "var(--text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-3.5 flex items-center justify-between text-xs">
            <span
              className="inline-flex items-center gap-1 font-semibold transition-colors group-hover:text-[var(--accent)]"
            >
              <span>
                {locale === "id" ? "Buka Case Study" : "Inspect Case Study"}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono-tech text-[10px] transition hover:bg-[var(--bg-pill)]"
                  title="Live Deployment"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Live</span>
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono-tech text-[10px] transition hover:bg-[var(--bg-pill)]"
                title="GitHub Repository"
              >
                <GitHubMark className="h-3 w-3" />
                <span>Repo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
