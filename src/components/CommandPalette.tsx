"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  ExternalLink,
  Globe,
  Search,
  Sparkles,
  SunMedium,
  Terminal,
  BookOpen,
  Triangle,
  X,
} from "lucide-react";
import { usePortfolio, VISUAL_MODE_META } from "@/context/PortfolioContext";
import { PROJECTS } from "@/data/projects";
import { VERCEL_PROJECTS } from "@/data/vercel-projects";
import { VisualMode } from "@/types/portfolio";

export function CommandPalette() {
  const { isCommandOpen, setCommandOpen } = usePortfolio();

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <CommandPaletteDialog onClose={() => setCommandOpen(false)} />
      )}
    </AnimatePresence>
  );
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const { mode, setMode, locale, toggleLocale, openProject, setTerminalOpen } =
    usePortfolio();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.tagline[locale].toLowerCase().includes(q)
    );
  }, [locale, query]);

  const filteredVercel = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VERCEL_PROJECTS.slice(0, 6);
    return VERCEL_PROJECTS.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.liveUrl.toLowerCase().includes(q) ||
        v.stack.some((s) => s.toLowerCase().includes(q)) ||
        v.summary[locale].toLowerCase().includes(q)
    );
  }, [locale, query]);

  const modes: Array<{
    id: VisualMode;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "obsidian", icon: Sparkles },
    { id: "editorial", icon: BookOpen },
    { id: "hud", icon: Cpu },
    { id: "clarity", icon: SunMedium },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/65 px-4 pt-20 backdrop-blur-md sm:pt-28"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="reality-card hud-frame w-full max-w-2xl overflow-hidden"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-strong)",
        }}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-3 border-b px-4 py-3.5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <Search
            className="h-4 w-4 shrink-0"
            style={{ color: "var(--accent)" }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "id"
                ? "Cari proyek, stack (Rust, Three.js, ESP32...), atau perintah..."
                : "Search projects, stack (Rust, Three.js, ESP32...), or actions..."
            }
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 transition hover:bg-white/10"
            aria-label="Close Command Palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
          {/* Reality Mode Switcher */}
          <div>
            <div className="px-2 pb-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "id" ? "Ganti Reality Engine" : "Switch Reality Engine"}
            </div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {modes.map(({ id, icon: Icon }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMode(id);
                      onClose();
                    }}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition"
                    style={{
                      borderColor: active
                        ? "var(--accent)"
                        : "var(--border-subtle)",
                      backgroundColor: active
                        ? "var(--bg-pill)"
                        : "transparent",
                    }}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <div>
                      <div className="font-semibold">
                        {VISUAL_MODE_META[id].name}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">
                        Shortcut: {VISUAL_MODE_META[id].code.replace("0", "")}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Actions */}
          <div>
            <div className="px-2 pb-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "id" ? "Aksi Cepat" : "Quick Actions"}
            </div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTerminalOpen(true);
                }}
                className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs transition hover:border-[var(--accent)]"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
                  {locale === "id"
                    ? "Buka Terminal Interaktif"
                    : "Launch Interactive CLI"}
                </span>
                <kbd className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                  Ctrl+`
                </kbd>
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleLocale();
                  onClose();
                }}
                className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs transition hover:border-[var(--accent)]"
              >
                <span className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-[var(--accent)]" />
                  {locale === "id"
                    ? "Ganti Bahasa ke English"
                    : "Switch Language to Indonesian"}
                </span>
                <span className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                  {locale === "id" ? "EN" : "ID"}
                </span>
              </button>
            </div>
          </div>

          {/* Matching Projects */}
          <div>
            <div className="px-2 pb-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "id"
                ? `Proyek (${filteredProjects.length})`
                : `Projects (${filteredProjects.length})`}
            </div>
            <div className="space-y-1">
              {filteredProjects.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => {
                    onClose();
                    openProject(project.slug);
                  }}
                  className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-[var(--bg-pill)]"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: project.accentHex }}
                      />
                      <span className="truncate text-sm font-semibold">
                        {project.title}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">
                      {project.tagline[locale]}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
                </button>
              ))}
              {filteredProjects.length === 0 && filteredVercel.length === 0 && (
                <div className="px-3 py-6 text-center text-xs text-[var(--text-muted)]">
                  {locale === "id"
                    ? "Tidak ada proyek yang cocok dengan kata kunci tersebut."
                    : "No matching projects found."}
                </div>
              )}
            </div>
          </div>

          {/* Matching Live Vercel Deploys */}
          {filteredVercel.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                {locale === "id"
                  ? `Vercel Live Apps (${filteredVercel.length})`
                  : `Live Vercel Deployments (${filteredVercel.length})`}
              </div>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {filteredVercel.map((v) => (
                  <a
                    key={v.id}
                    href={v.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-[var(--bg-pill)]"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <Triangle className="h-3 w-3 shrink-0 fill-current text-[var(--accent)]" />
                        <span className="truncate text-xs font-semibold">
                          {v.name}
                        </span>
                      </div>
                      <p
                        className="mt-0.5 truncate font-mono-tech text-[10px]"
                        style={{ color: "var(--live-text)" }}
                      >
                        {v.liveUrl.replace("https://", "")}
                      </p>
                    </div>
                    <ExternalLink
                      className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
