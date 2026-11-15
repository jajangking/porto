"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  LayoutGrid,
  List,
  Lock,
  Pin,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROJECT_CATEGORY_LABELS, PROJECTS } from "@/data/projects";
import { ProjectCaseStudy, ProjectCategory } from "@/types/portfolio";
import { ProjectVisualPreview } from "@/components/ProjectVisualPreview";

export function ProjectShowcaseSection() {
  const {
    mode,
    locale,
    openProject,
    pinnedSlugs,
    togglePinProject,
    resetPinnedProjects,
    isPinnedCustomized,
  } = usePortfolio();
  const [scope, setScope] = useState<"pinned" | "all">("pinned");
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [search, setSearch] = useState("");
  const [viewLayout, setViewLayout] = useState<"bento" | "list">("bento");

  const pinnedSet = useMemo(() => new Set(pinnedSlugs), [pinnedSlugs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const isFiltering = category !== "all" || q.length > 0;

    let list = PROJECTS.filter((p) => {
      if (!isFiltering && scope === "pinned" && !pinnedSet.has(p.slug)) {
        return false;
      }
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

    // Always surface pinned projects first in consistent pinned order
    list = [...list].sort((a, b) => {
      const aPinned = pinnedSet.has(a.slug);
      const bPinned = pinnedSet.has(b.slug);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      if (aPinned && bPinned) {
        return pinnedSlugs.indexOf(a.slug) - pinnedSlugs.indexOf(b.slug);
      }
      return 0;
    });

    return list;
  }, [category, locale, pinnedSet, pinnedSlugs, scope, search]);

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
                ? "01 // PILIHAN TERBAIK & SHOWCASE PROYEK"
                : "01 // PINNED TOP PICKS & PROJECT SHOWCASE"}
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
                ? "Menampilkan proyek unggulan teratas secara default. Klik ikon Pin pada kartu mana saja untuk menyusun daftar prioritas Anda atau lihat ke-14 studi kasus."
                : "Curated pinned top picks by default for instant clarity. Click the Pin icon on any card to customize your shortlist or expand all 14 case studies."}
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

        {/* Best Picks (Pinned) vs All Projects Switcher + Category Filter */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Pinned vs All Switcher */}
          <div className="flex flex-wrap items-center gap-2">
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
                onClick={() => {
                  setScope("pinned");
                  setCategory("all");
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono-tech text-xs font-semibold transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor:
                    scope === "pinned" && category === "all" && !search
                      ? "var(--accent)"
                      : "transparent",
                  color:
                    scope === "pinned" && category === "all" && !search
                      ? "var(--accent-contrast)"
                      : "var(--text-secondary)",
                }}
              >
                <Pin className="h-3 w-3" />
                <span>
                  {locale === "id"
                    ? `Pilihan Terbaik (${pinnedSlugs.length})`
                    : `Pinned Picks (${pinnedSlugs.length})`}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setScope("all")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono-tech text-xs font-semibold transition"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor:
                    scope === "all" || category !== "all" || search
                      ? "var(--accent)"
                      : "transparent",
                  color:
                    scope === "all" || category !== "all" || search
                      ? "var(--accent-contrast)"
                      : "var(--text-secondary)",
                }}
              >
                <Sparkles className="h-3 w-3" />
                <span>
                  {locale === "id"
                    ? `Semua Studi Kasus (${PROJECTS.length})`
                    : `All Case Studies (${PROJECTS.length})`}
                </span>
              </button>
            </div>

            {isPinnedCustomized && (
              <button
                type="button"
                onClick={resetPinnedProjects}
                className="inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono-tech text-[11px] transition hover:border-[var(--accent)]"
                style={{
                  borderRadius: "var(--radius-pill)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                  color: "var(--text-secondary)",
                }}
              >
                <RotateCcw className="h-3 w-3" />
                <span>{locale === "id" ? "Reset Pin" : "Reset Pins"}</span>
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {PROJECT_CATEGORY_LABELS.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className="relative px-3.5 py-1.5 text-xs font-medium transition-colors"
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
        </div>

        {/* Projects Grid / List */}
        {viewLayout === "bento" ? (
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12"
          >
            {filtered.map((project, index) => {
              const isWide =
                category === "all" &&
                !search &&
                (index === 0 || index === 1 || (scope === "all" && index === 4));
              return (
                <BentoProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  mode={mode}
                  isWide={isWide}
                  isPinned={pinnedSet.has(project.slug)}
                  onTogglePin={() => togglePinProject(project.slug)}
                  onOpen={() => openProject(project.slug)}
                />
              );
            })}
          </motion.div>
        ) : (
          <div className="mt-8 space-y-3">
            {filtered.map((project) => {
              const isPinned = pinnedSet.has(project.slug);
              return (
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
                      {isPinned && (
                        <span
                          className="inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono-tech text-[10px] font-semibold"
                          style={{
                            backgroundColor: "var(--bg-pill)",
                            color: "var(--accent)",
                          }}
                        >
                          <Pin className="h-2.5 w-2.5" />
                          PINNED
                        </span>
                      )}
                      {project.liveUrl && (
                        <span
                          className="inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono-tech text-[10px] font-semibold"
                          style={{
                            backgroundColor: "var(--live-bg)",
                            borderColor: "var(--live-border)",
                            color: "var(--live-text)",
                          }}
                        >
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

                  <div className="flex shrink-0 items-center gap-2.5">
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePinProject(project.slug);
                      }}
                      title={isPinned ? "Unpin Project" : "Pin to Top Picks"}
                      aria-label={isPinned ? "Unpin Project" : "Pin to Top Picks"}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-[var(--accent)]"
                      style={{
                        borderColor: isPinned
                          ? "var(--accent)"
                          : "var(--border-subtle)",
                        backgroundColor: isPinned
                          ? "var(--bg-pill)"
                          : "transparent",
                        color: isPinned
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      <Pin className="h-3.5 w-3.5" />
                    </button>
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
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
  isPinned,
  onTogglePin,
  onOpen,
}: {
  project: ProjectCaseStudy;
  locale: "id" | "en";
  mode: string;
  isWide: boolean;
  isPinned: boolean;
  onTogglePin: () => void;
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
      {mode !== "editorial" && mode !== "clarity" && (
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
          borderRadius: mode === "hud" ? "3px" : "12px",
          borderColor: "var(--border-subtle)",
        }}
      >
        <ProjectVisualPreview
          preset={project.simulationPreset}
          accentHex={project.accentHex}
        />

        {/* Top-left Pin Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          title={
            isPinned
              ? locale === "id"
                ? "Lepas Pin Proyek"
                : "Unpin Project"
              : locale === "id"
                ? "Pin ke Pilihan Terbaik"
                : "Pin to Top Picks"
          }
          aria-label={isPinned ? "Unpin Project" : "Pin Project"}
          className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono-tech text-[10px] font-semibold backdrop-blur transition"
          style={{
            backgroundColor: isPinned
              ? "var(--accent)"
              : "rgba(9, 11, 18, 0.72)",
            color: isPinned ? "var(--accent-contrast)" : "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <Pin className="h-2.5 w-2.5" />
          <span>{isPinned ? "PINNED" : "PIN"}</span>
        </button>

        {/* Top-right Flagship / Live Pills */}
        <div className="pointer-events-none absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 font-mono-tech text-[9px] text-white backdrop-blur">
              <Sparkles className="h-2.5 w-2.5 text-amber-300" />
              TOP PICK
            </span>
          )}
          {project.liveUrl && (
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 font-mono-tech text-[9px] font-bold text-black">
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            <span className="font-semibold">{project.primaryLang}</span>
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

          {/* Compact High-Readability Metrics Strip (extra clear in Clean UI) */}
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {project.metrics.slice(0, 2).map((m) => (
              <div
                key={m.label.en}
                className="rounded-lg border px-2.5 py-1.5"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <div className="font-mono-tech text-[9px] uppercase text-[var(--text-muted)]">
                  {m.label[locale]}
                </div>
                <div className="truncate font-display text-xs font-bold">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stack + Links */}
        <div
          className="mt-4 border-t pt-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
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
            <span className="inline-flex items-center gap-1 font-semibold transition-colors group-hover:text-[var(--accent)]">
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
                  className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono-tech text-[10px] font-semibold transition hover:opacity-85"
                  style={{
                    backgroundColor: "var(--live-bg)",
                    color: "var(--live-text)",
                  }}
                  title="Live Deployment"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Live</span>
                </a>
              )}
              {project.repoUrl ? (
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
              ) : project.isPrivateRepo ? (
                <span
                  className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono-tech text-[10px] font-semibold"
                  style={{
                    backgroundColor: "var(--warn-bg)",
                    color: "var(--warn-text)",
                  }}
                  title="Private GitHub Repository"
                >
                  <Lock className="h-3 w-3" />
                  <span>Private</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
