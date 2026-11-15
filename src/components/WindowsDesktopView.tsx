"use client";

import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  CheckCircle2,
  Command,
  Copy,
  Cpu,
  ExternalLink,
  Eye,
  Film,
  Gauge,
  KeyRound,
  Layers,
  Lock,
  Mail,
  Maximize2,
  Minimize2,
  Minus,
  Monitor,
  Pin,
  RefreshCw,
  ScanEye,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  SunMedium,
  Terminal,
  Triangle,
  Tv,
  Volume2,
  Wrench,
  X,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { ProjectVisualPreview } from "@/components/ProjectVisualPreview";
import { usePortfolio, VISUAL_MODE_META } from "@/context/PortfolioContext";
import { GITHUB_SNAPSHOT } from "@/data/github-snapshot";
import { PROFILE_CONFIG } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { VERCEL_PROJECTS } from "@/data/vercel-projects";
import {
  GitHubRepoItem,
  ProjectCaseStudy,
  VercelDeploymentItem,
  VisualMode,
} from "@/types/portfolio";

type WindowKind = "project" | "about" | "vercel" | "github";

interface DesktopWindow {
  id: string;
  kind: WindowKind;
  title: string;
  slug?: string;
  minimized: boolean;
  maximized: boolean;
}

const PROJECT_ICON_STYLE: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
  }
> = {
  mterm: { icon: Terminal, gradient: "from-orange-500 to-amber-600" },
  "neural-driving": {
    icon: BrainCircuit,
    gradient: "from-sky-500 to-blue-600",
  },
  rallycross: { icon: Gauge, gradient: "from-purple-500 to-fuchsia-600" },
  "robot-vision-ai": { icon: Bot, gradient: "from-emerald-500 to-teal-600" },
  "hyperframes-pensil": { icon: Film, gradient: "from-rose-500 to-pink-600" },
  asisten: { icon: Sparkles, gradient: "from-blue-500 to-indigo-600" },
  "tts-api-indonesia": {
    icon: Volume2,
    gradient: "from-teal-500 to-cyan-600",
  },
  "gemma4-vision": { icon: ScanEye, gradient: "from-amber-500 to-orange-600" },
  "keyless-v2": { icon: KeyRound, gradient: "from-yellow-500 to-amber-600" },
  "remote-proyektor": { icon: Tv, gradient: "from-red-500 to-rose-600" },
  posman: { icon: ShoppingBag, gradient: "from-green-500 to-emerald-600" },
  inventory: { icon: Boxes, gradient: "from-violet-500 to-purple-600" },
  "keinarra-vision": { icon: Eye, gradient: "from-pink-500 to-fuchsia-600" },
  motoringv: { icon: Wrench, gradient: "from-amber-500 to-yellow-600" },
};

const MODE_OPTIONS: Array<{
  id: VisualMode;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "obsidian", icon: Sparkles },
  { id: "editorial", icon: BookOpen },
  { id: "hud", icon: Cpu },
  { id: "clarity", icon: SunMedium },
  { id: "windows", icon: Monitor },
];

function useDesktopClock() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);

  if (!isClient) return { time: "--:--", date: "---" };

  return {
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    date: now.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
}

export function WindowsDesktopView() {
  const {
    mode,
    setMode,
    locale,
    toggleLocale,
    pinnedSlugs,
    togglePinProject,
    setCommandOpen,
    setTerminalOpen,
  } = usePortfolio();

  const clock = useDesktopClock();

  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [desktopFilter, setDesktopFilter] = useState<
    "all" | "pinned" | "live"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startSearch, setStartSearch] = useState("");

  const pinnedSet = useMemo(() => new Set(pinnedSlugs), [pinnedSlugs]);

  const visibleDesktopProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (desktopFilter === "pinned" && !pinnedSet.has(p.slug)) return false;
      if (desktopFilter === "live" && !p.liveUrl) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
      );
    }).sort((a, b) => {
      const aPin = pinnedSet.has(a.slug);
      const bPin = pinnedSet.has(b.slug);
      if (aPin && !bPin) return -1;
      if (!aPin && bPin) return 1;
      return 0;
    });
  }, [desktopFilter, pinnedSet, searchQuery]);

  const startSearchResults = useMemo(() => {
    const q = startSearch.trim().toLowerCase();
    if (!q) return PROJECTS.filter((p) => pinnedSet.has(p.slug));
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
    );
  }, [pinnedSet, startSearch]);

  const openWindow = (
    kind: WindowKind,
    title: string,
    slug?: string
  ) => {
    const id = kind === "project" && slug ? `project:${slug}` : kind;
    setStartOpen(false);
    setThemeMenuOpen(false);

    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false } : w
        );
      }
      return [
        ...prev,
        { id, kind, title, slug, minimized: false, maximized: false },
      ];
    });
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => {
      const next = prev.filter((w) => w.id !== id);
      if (activeWindowId === id) {
        const remaining = next.filter((w) => !w.minimized);
        setActiveWindowId(
          remaining.length > 0 ? remaining[remaining.length - 1].id : null
        );
      }
      return next;
    });
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setActiveWindowId((curr) => (curr === id ? null : curr));
  };

  const toggleMaximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
    setActiveWindowId(id);
  };

  const handleTaskbarWindowClick = (win: DesktopWindow) => {
    if (win.minimized || activeWindowId !== win.id) {
      setWindows((prev) =>
        prev.map((w) => (w.id === win.id ? { ...w, minimized: false } : w))
      );
      setActiveWindowId(win.id);
    } else {
      minimizeWindow(win.id);
    }
  };

  const activeWindow =
    windows.find((w) => w.id === activeWindowId && !w.minimized) ?? null;

  return (
    <div
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(110% 85% at 75% 18%, rgba(56, 189, 248, 0.28), transparent 55%), radial-gradient(85% 75% at 18% 82%, rgba(37, 99, 235, 0.36), transparent 60%), linear-gradient(135deg, #071226 0%, #0d2247 50%, #091732 100%)",
      }}
      onClick={() => {
        if (startOpen) setStartOpen(false);
        if (themeMenuOpen) setThemeMenuOpen(false);
      }}
    >
      {/* Subtle Windows 11 Ambient Bloom Curve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            "radial-gradient(circle at 52% 46%, rgba(96, 165, 250, 0.25) 0%, rgba(37, 99, 235, 0.08) 38%, transparent 66%)",
        }}
      />

      {/* Top Desktop Widget Bar (Responsive Filter + Quick Profile) */}
      <div className="relative z-10 flex flex-col gap-2.5 border-b border-white/10 bg-slate-950/35 px-3 py-2.5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Image
              src={PROFILE_CONFIG.avatarUrl}
              alt={PROFILE_CONFIG.displayName}
              width={26}
              height={26}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-sky-400/70"
            />
            <div className="leading-tight">
              <div className="font-display text-xs font-bold text-white sm:text-sm">
                @{PROFILE_CONFIG.handle} · Windows Desktop
              </div>
              <div className="font-mono-tech text-[10px] text-sky-200/75">
                {locale === "id"
                  ? "Klik ikon aplikasi di desktop untuk membuka proyek"
                  : "Click any desktop icon to launch a project window"}
              </div>
            </div>
          </div>

          {/* Mobile Quick Theme Exit */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setThemeMenuOpen((v) => !v);
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 font-mono-tech text-[10px] text-white sm:hidden"
          >
            <SunMedium className="h-3 w-3 text-sky-300" />
            <span>Tema</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-white/12 bg-black/25 p-0.5 font-mono-tech text-[10px]">
            {(
              [
                { id: "all", label: `All (${PROJECTS.length})` },
                { id: "pinned", label: `Pinned (${pinnedSlugs.length})` },
                { id: "live", label: "Live Vercel" },
              ] as const
            ).map((tab) => {
              const active = desktopFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDesktopFilter(tab.id)}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${
                    active
                      ? "bg-sky-400 text-slate-950"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-white/12 bg-black/25 px-2.5 py-1 text-xs sm:flex-initial">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "id" ? "Cari ikon..." : "Filter icons..."}
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-400 sm:w-32"
            />
          </div>
        </div>
      </div>

      {/* Main Desktop Canvas + Scrollable Responsive Icon Grid */}
      <div className="relative z-10 flex-1 overflow-y-auto px-3 pt-4 pb-20 sm:px-6 sm:pt-6">
        <div className="mx-auto max-w-7xl">
          {/* Section Label: System Shortcuts */}
          <div className="mb-2.5 flex items-center gap-2 px-1 font-mono-tech text-[10px] tracking-wider text-sky-200/75 uppercase">
            <span>System &amp; Cloud</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            <DesktopShortcutIcon
              label={locale === "id" ? "This PC (Profil)" : "This PC (About)"}
              badge="SYS"
              gradient="from-sky-500 to-blue-700"
              icon={Monitor}
              onClick={() =>
                openWindow(
                  "about",
                  locale === "id"
                    ? "This PC — Profil & Skill @jajangking"
                    : "This PC — Profile & Skills"
                )
              }
            />
            <DesktopShortcutIcon
              label="Vercel Cloud (16)"
              badge="16 LIVE"
              badgeTone="live"
              gradient="from-slate-800 to-slate-950"
              icon={Triangle}
              onClick={() =>
                openWindow("vercel", "Vercel Production Explorer (16 Apps)")
              }
            />
            <DesktopShortcutIcon
              label="GitHub Vault"
              badge="54+ REPO"
              gradient="from-indigo-600 to-slate-900"
              icon={GitHubMark}
              onClick={() =>
                openWindow("github", "GitHub Repository Explorer (@jajangking)")
              }
            />
            <DesktopShortcutIcon
              label="Mterm CLI.exe"
              badge="SHELL"
              gradient="from-emerald-600 to-teal-800"
              icon={Terminal}
              onClick={() => setTerminalOpen(true)}
            />
          </div>

          {/* Section Label: Project Application Icons */}
          <div className="mt-6 mb-2.5 flex items-center justify-between gap-2 px-1 font-mono-tech text-[10px] tracking-wider text-sky-200/75 uppercase">
            <span>
              {locale === "id"
                ? `Aplikasi Proyek (${visibleDesktopProjects.length})`
                : `Project Shortcuts (${visibleDesktopProjects.length})`}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
            {visibleDesktopProjects.map((project) => {
              const style = PROJECT_ICON_STYLE[project.slug] ?? {
                icon: Layers,
                gradient: "from-indigo-500 to-sky-600",
              };
              const isPinned = pinnedSet.has(project.slug);
              return (
                <DesktopShortcutIcon
                  key={project.slug}
                  label={project.repoName}
                  sublabel={project.primaryLang}
                  badge={project.liveUrl ? "LIVE" : isPinned ? "PIN" : undefined}
                  badgeTone={project.liveUrl ? "live" : "accent"}
                  isPinned={isPinned}
                  gradient={style.gradient}
                  icon={style.icon}
                  onClick={() =>
                    openWindow("project", project.title, project.slug)
                  }
                />
              );
            })}
          </div>

          {visibleDesktopProjects.length === 0 && (
            <div className="mt-6 rounded-xl border border-white/15 bg-slate-900/65 p-8 text-center text-xs text-slate-300 backdrop-blur">
              {locale === "id"
                ? "Tidak ada ikon proyek yang cocok dengan pencarian."
                : "No desktop project icons match your search."}
            </div>
          )}
        </div>
      </div>

      {/* Active Floating / Fullscreen Window Layer */}
      <AnimatePresence>
        {activeWindow && (
          <motion.div
            key={activeWindow.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className={`fixed z-30 flex flex-col overflow-hidden border border-white/20 bg-[#0f172a]/95 text-slate-100 shadow-2xl backdrop-blur-2xl ${
              activeWindow.maximized
                ? "inset-1.5 bottom-16 rounded-xl sm:inset-2 sm:bottom-16"
                : "inset-2 bottom-16 rounded-xl md:inset-x-8 md:top-10 md:bottom-20 md:mx-auto md:max-w-5xl"
            }`}
          >
            {/* Windows 11 Title Bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/12 bg-slate-900/90 px-3 py-2.5 sm:px-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-500/20 text-sky-300">
                  {activeWindow.kind === "about" ? (
                    <Monitor className="h-3.5 w-3.5" />
                  ) : activeWindow.kind === "vercel" ? (
                    <Triangle className="h-3.5 w-3.5 fill-current" />
                  ) : activeWindow.kind === "github" ? (
                    <GitHubMark className="h-3.5 w-3.5" />
                  ) : (
                    <Layers className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="truncate font-display text-xs font-semibold sm:text-sm">
                  {activeWindow.title}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => minimizeWindow(activeWindow.id)}
                  aria-label="Minimize Window"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleMaximizeWindow(activeWindow.id)}
                  aria-label="Maximize Window"
                  className="hidden h-7 w-7 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 sm:flex"
                >
                  {activeWindow.maximized ? (
                    <Minimize2 className="h-3.5 w-3.5" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => closeWindow(activeWindow.id)}
                  aria-label="Close Window"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 transition hover:bg-rose-500 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Window Interior Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {activeWindow.kind === "project" && activeWindow.slug && (
                <WindowsProjectDetailBody
                  slug={activeWindow.slug}
                  locale={locale}
                  isPinned={pinnedSet.has(activeWindow.slug)}
                  onTogglePin={() => togglePinProject(activeWindow.slug!)}
                  onSelectProject={(nextSlug, nextTitle) =>
                    openWindow("project", nextTitle, nextSlug)
                  }
                />
              )}

              {activeWindow.kind === "about" && (
                <WindowsAboutBody
                  locale={locale}
                  onOpenProject={(s, t) => openWindow("project", t, s)}
                />
              )}

              {activeWindow.kind === "vercel" && (
                <WindowsVercelBody
                  locale={locale}
                  onOpenProject={(s, t) => openWindow("project", t, s)}
                />
              )}

              {activeWindow.kind === "github" && (
                <WindowsGitHubBody
                  locale={locale}
                  onOpenProject={(s, t) => openWindow("project", t, s)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Menu Flyout */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed right-2 bottom-16 left-2 z-40 flex max-h-[75dvh] flex-col overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 p-4 text-slate-100 shadow-2xl backdrop-blur-2xl sm:right-auto sm:left-4 sm:w-[460px] sm:p-5"
          >
            {/* Start Search */}
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3.5 py-2 text-xs">
              <Search className="h-3.5 w-3.5 text-sky-400" />
              <input
                value={startSearch}
                onChange={(e) => setStartSearch(e.target.value)}
                placeholder={
                  locale === "id"
                    ? "Cari proyek, stack, atau perintah..."
                    : "Type to search apps, projects, or stack..."
                }
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Pinned / Filtered App Grid */}
            <div className="mt-4 flex-1 overflow-y-auto pr-1">
              <div className="mb-2 flex items-center justify-between font-mono-tech text-[10px] tracking-wider text-slate-400 uppercase">
                <span>
                  {startSearch
                    ? locale === "id"
                      ? `Hasil (${startSearchResults.length})`
                      : `Matches (${startSearchResults.length})`
                    : locale === "id"
                      ? "Aplikasi Disematkan (Pinned)"
                      : "Pinned Apps"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDesktopFilter("all");
                    setStartOpen(false);
                  }}
                  className="text-sky-400 hover:underline"
                >
                  {locale === "id" ? "Lihat Semua →" : "All Icons →"}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {startSearchResults.slice(0, 8).map((p) => {
                  const style = PROJECT_ICON_STYLE[p.slug] ?? {
                    icon: Layers,
                    gradient: "from-sky-500 to-indigo-600",
                  };
                  const Icon = style.icon;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => openWindow("project", p.title, p.slug)}
                      className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center transition hover:bg-white/10"
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${style.gradient} text-white shadow`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="line-clamp-1 text-[11px] font-medium">
                        {p.repoName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Theme Switcher inside Start */}
              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="mb-2 font-mono-tech text-[10px] tracking-wider text-slate-400 uppercase">
                  {locale === "id" ? "Ganti Tema Portofolio" : "Switch Reality Theme"}
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {MODE_OPTIONS.map(({ id, icon: Icon }) => {
                    const active = mode === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setMode(id);
                          setStartOpen(false);
                        }}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-left text-[11px] font-medium transition ${
                          active
                            ? "border-sky-400 bg-sky-500/20 text-white"
                            : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-sky-300" />
                        <span className="truncate">
                          {VISUAL_MODE_META[id].shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Start Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
              <button
                type="button"
                onClick={() =>
                  openWindow(
                    "about",
                    "This PC — Profile & Skills (@jajangking)"
                  )
                }
                className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/10"
              >
                <Image
                  src={PROFILE_CONFIG.avatarUrl}
                  alt={PROFILE_CONFIG.displayName}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="font-semibold">@{PROFILE_CONFIG.handle}</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("clarity")}
                className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 font-mono-tech text-[10px] text-sky-300 transition hover:bg-white/15"
              >
                {locale === "id" ? "Mode Clean UI" : "Switch to Clean UI"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher Tray Popover */}
      <AnimatePresence>
        {themeMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed right-2 bottom-16 z-40 w-64 rounded-xl border border-white/20 bg-slate-900/95 p-3 text-slate-100 shadow-2xl backdrop-blur-2xl sm:right-4"
          >
            <div className="mb-2 font-mono-tech text-[10px] tracking-wider text-slate-400 uppercase">
              {locale === "id" ? "Pilih Tema Visual" : "Select Visual Reality"}
            </div>
            <div className="space-y-1">
              {MODE_OPTIONS.map(({ id, icon: Icon }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMode(id);
                      setThemeMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                      active
                        ? "bg-sky-500 text-slate-950 font-semibold"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{VISUAL_MODE_META[id].name}</span>
                    </span>
                    <span className="font-mono-tech text-[10px] opacity-75">
                      [{VISUAL_MODE_META[id].code.replace("0", "")}]
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentic Responsive Windows 11 Taskbar */}
      <footer
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-between border-t border-white/15 bg-slate-950/90 px-2 text-slate-100 backdrop-blur-2xl sm:px-4"
      >
        {/* Left/Center Taskbar Icons & Running Windows */}
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-1.5">
          {/* Windows Start Button */}
          <button
            type="button"
            onClick={() => {
              setStartOpen((v) => !v);
              setThemeMenuOpen(false);
            }}
            aria-label="Start Menu"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
              startOpen ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            <div className="grid grid-cols-2 gap-0.5">
              <span className="h-2 w-2 rounded-[1px] bg-sky-400" />
              <span className="h-2 w-2 rounded-[1px] bg-sky-300" />
              <span className="h-2 w-2 rounded-[1px] bg-blue-400" />
              <span className="h-2 w-2 rounded-[1px] bg-cyan-300" />
            </div>
          </button>

          {/* Search / Command */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            title="Command Menu (⌘K)"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs text-slate-300 transition hover:bg-white/10 md:flex"
          >
            <Command className="h-3.5 w-3.5 text-sky-400" />
            <span className="text-[11px]">Search</span>
          </button>

          {/* System Pinned Taskbar Launchers */}
          <button
            type="button"
            onClick={() => openWindow("vercel", "Vercel Production Explorer (16 Apps)")}
            title="Vercel Cloud (16 Live Apps)"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10"
          >
            <Triangle className="h-4 w-4 fill-current text-sky-400" />
          </button>

          <button
            type="button"
            onClick={() => setTerminalOpen(true)}
            title="CLI Shell"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/10"
          >
            <Terminal className="h-4 w-4 text-emerald-400" />
          </button>

          {/* Divider if windows open */}
          {windows.length > 0 && (
            <span className="mx-1 h-5 w-px shrink-0 bg-white/15" />
          )}

          {/* Open / Minimized Window Tabs */}
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {windows.map((win) => {
              const isFocused = activeWindowId === win.id && !win.minimized;
              return (
                <button
                  key={win.id}
                  type="button"
                  onClick={() => handleTaskbarWindowClick(win)}
                  className={`relative flex h-9 max-w-[130px] shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-medium transition sm:max-w-[175px] ${
                    isFocused
                      ? "border-sky-400/50 bg-white/15 text-white"
                      : "border-transparent bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span className="truncate">{win.slug || win.kind}</span>
                  <span
                    className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all ${
                      isFocused ? "w-5 bg-sky-400" : "w-2 bg-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right System Tray */}
        <div className="flex shrink-0 items-center gap-1.5 pl-2">
          <button
            type="button"
            onClick={() => {
              setThemeMenuOpen((v) => !v);
              setStartOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 font-mono-tech text-[10px] font-semibold text-white transition hover:border-sky-400"
          >
            <Monitor className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden sm:inline">05 · Win OS</span>
            <span className="sm:hidden">Tema</span>
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-lg px-2 py-1.5 font-mono-tech text-[10px] font-semibold text-slate-200 transition hover:bg-white/10"
          >
            {locale.toUpperCase()}
          </button>

          <div className="hidden flex-col items-end pl-1 text-right font-mono-tech text-[10px] leading-tight text-slate-200 sm:flex">
            <span>{clock.time}</span>
            <span className="text-[9px] text-slate-400">{clock.date}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Window Sub-Views ---------------- */

function DesktopShortcutIcon({
  label,
  sublabel,
  badge,
  badgeTone = "accent",
  isPinned = false,
  gradient,
  icon: Icon,
  onClick,
}: {
  label: string;
  sublabel?: string;
  badge?: string;
  badgeTone?: "live" | "accent";
  isPinned?: boolean;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center rounded-xl border border-transparent p-2 text-center transition hover:border-white/20 hover:bg-white/10 focus:border-sky-400/70 focus:bg-white/12 focus:outline-none sm:p-2.5"
    >
      <div className="relative">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14`}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>

        {/* Classic Windows Shortcut Corner Arrow */}
        <span className="absolute -bottom-1 -left-1 flex h-4 w-4 items-center justify-center rounded bg-white text-[9px] font-bold text-slate-900 shadow">
          ↗
        </span>

        {/* Pinned / Live Badge */}
        {badge && (
          <span
            className={`absolute -top-1.5 -right-2 rounded-full px-1.5 py-0.5 font-mono-tech text-[8px] font-bold shadow ${
              badgeTone === "live"
                ? "bg-emerald-400 text-slate-950"
                : "bg-sky-400 text-slate-950"
            }`}
          >
            {badge}
          </span>
        )}

        {isPinned && !badge && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow">
            <Star className="h-2.5 w-2.5 fill-current" />
          </span>
        )}
      </div>

      <span
        className="mt-2 line-clamp-2 text-[11px] font-semibold leading-tight text-white sm:text-xs"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
      >
        {label}
      </span>
      {sublabel && (
        <span className="mt-0.5 line-clamp-1 font-mono-tech text-[9px] text-sky-200/75">
          {sublabel}
        </span>
      )}
    </button>
  );
}

function WindowsProjectDetailBody({
  slug,
  locale,
  isPinned,
  onTogglePin,
  onSelectProject,
}: {
  slug: string;
  locale: "id" | "en";
  isPinned: boolean;
  onTogglePin: () => void;
  onSelectProject: (nextSlug: string, nextTitle: string) => void;
}) {
  const project: ProjectCaseStudy | undefined = PROJECTS.find(
    (p) => p.slug === slug
  );
  if (!project) return null;

  return (
    <div className="space-y-6">
      {/* Explorer Breadcrumb & Action Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 font-mono-tech text-[11px] text-slate-300">
          <span className="text-slate-500">Desktop</span>
          <span className="text-slate-600">&gt;</span>
          <span className="text-slate-500">Projects</span>
          <span className="text-slate-600">&gt;</span>
          <span className="font-semibold text-sky-300">@{project.repoName}</span>
          <span className="text-slate-500">· {project.year}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onTogglePin}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono-tech text-[11px] font-semibold transition ${
              isPinned
                ? "border-sky-400 bg-sky-500/20 text-sky-300"
                : "border-white/15 bg-white/5 text-slate-300 hover:border-sky-400"
            }`}
          >
            <Pin className="h-3 w-3" />
            <span>{isPinned ? "Pinned" : "Pin"}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/35 bg-emerald-500/15 px-3 py-1.5 font-mono-tech text-[11px] font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Live Deploy</span>
            </a>
          )}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-400 px-3 py-1.5 font-mono-tech text-[11px] font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              <GitHubMark className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          ) : project.isPrivateRepo ? (
            <span className="inline-flex items-center gap-1 rounded-lg border border-amber-400/35 bg-amber-500/15 px-2.5 py-1.5 font-mono-tech text-[11px] font-semibold text-amber-300">
              <Lock className="h-3 w-3" />
              <span>Private</span>
            </span>
          ) : null}

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 font-mono-tech text-[11px] text-slate-200 hover:border-sky-400"
          >
            <span>{locale === "id" ? "Halaman Penuh" : "Full Page"}</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <div className="h-60 overflow-hidden rounded-xl border border-white/15">
            <ProjectVisualPreview
              preset={project.simulationPreset}
              accentHex={project.accentHex}
              interactive={true}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label.en}
                className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-center"
              >
                <div className="font-display text-sm font-bold text-white sm:text-base">
                  {m.value}
                </div>
                <div className="mt-0.5 font-mono-tech text-[9px] uppercase text-slate-400">
                  {m.label[locale]}
                </div>
              </div>
            ))}
          </div>

          {project.relatedDeploys && project.relatedDeploys.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3.5">
              <div className="mb-2 font-mono-tech text-[10px] uppercase tracking-wider text-slate-400">
                {locale === "id"
                  ? "Deployment Terkait di Vercel"
                  : "Related Vercel Apps"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.relatedDeploys.map((d) => (
                  <a
                    key={d.url}
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono-tech text-[10px] text-emerald-300 hover:border-emerald-400/50"
                  >
                    <ExternalLink className="h-2.5 w-2.5" />
                    <span>{d.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {project.summary[locale]}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/65 p-4">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-sky-400">
                {locale === "id" ? "Tantangan Teknis" : "Challenge"}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {project.challenge[locale]}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/65 p-4">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-sky-400">
                {locale === "id" ? "Solusi Arsitektur" : "Architecture"}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                {project.architectureSummary[locale]}
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3">
            {project.architectureNodes.map((n) => (
              <div
                key={n.layer}
                className="rounded-xl border border-white/10 bg-slate-900/65 p-3"
              >
                <div
                  className="font-mono-tech text-[9px]"
                  style={{ color: project.accentHex }}
                >
                  {n.layer}
                </div>
                <div className="mt-1 text-xs font-bold text-white">
                  {n.title}
                </div>
                <p className="mt-1 text-[11px] leading-snug text-slate-300">
                  {n.detail[locale]}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/65 p-4">
            <div className="mb-2 font-mono-tech text-[10px] uppercase tracking-wider text-sky-400">
              {locale === "id" ? "Keunggulan Utama" : "Highlights"}
            </div>
            <ul className="space-y-1.5">
              {project.highlights[locale].map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-xs text-slate-300"
                >
                  <CheckCircle2
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{ color: project.accentHex }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono-tech text-[11px] text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Switcher Ribbon to other Projects */}
      <div className="border-t border-white/10 pt-4">
        <div className="mb-2 font-mono-tech text-[10px] uppercase tracking-wider text-slate-400">
          {locale === "id" ? "Buka Proyek Lainnya:" : "Jump to Another App:"}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PROJECTS.filter((p) => p.slug !== project.slug)
            .slice(0, 8)
            .map((other) => (
              <button
                key={other.slug}
                type="button"
                onClick={() => onSelectProject(other.slug, other.title)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono-tech text-[10px] text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
              >
                {other.repoName}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function WindowsAboutBody({
  locale,
  onOpenProject,
}: {
  locale: "id" | "en";
  onOpenProject: (slug: string, title: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 rounded-xl border border-white/12 bg-slate-900/75 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={PROFILE_CONFIG.avatarUrl}
            alt={PROFILE_CONFIG.displayName}
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl object-cover ring-2 ring-sky-400/70"
          />
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-wider text-sky-400">
              System Properties // @{PROFILE_CONFIG.handle}
            </div>
            <h2 className="font-display text-2xl font-bold text-white">
              {PROFILE_CONFIG.displayName}
            </h2>
            <p className="text-xs text-slate-300">
              {PROFILE_CONFIG.location} · {PROFILE_CONFIG.availability[locale]}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${PROFILE_CONFIG.email}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-400 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-300"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email</span>
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono-tech text-xs text-slate-200 hover:border-sky-400"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? "Copied" : PROFILE_CONFIG.email}</span>
          </button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">
        {PROFILE_CONFIG.subheadline[locale]}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PROFILE_CONFIG.stats.map((s) => (
          <div
            key={s.value + s.label.en}
            className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
          >
            <div className="font-display text-2xl font-bold text-sky-300">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-slate-400">{s.label[locale]}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PROFILE_CONFIG.pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
          >
            <div className="font-mono-tech text-[10px] text-sky-400">
              {pillar.code}
            </div>
            <h3 className="font-display mt-1 text-base font-bold text-white">
              {pillar.title[locale]}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
              {pillar.description[locale]}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {pillar.linkedProjects.map((slug) => {
                const proj = PROJECTS.find((p) => p.slug === slug);
                if (!proj) return null;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => onOpenProject(proj.slug, proj.title)}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono-tech text-[10px] text-sky-300 hover:border-sky-400"
                  >
                    {proj.repoName} ↗
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WindowsVercelBody({
  locale,
  onOpenProject,
}: {
  locale: "id" | "en";
  onOpenProject: (slug: string, title: string) => void;
}) {
  const [items, setItems] = useState<VercelDeploymentItem[]>(VERCEL_PROJECTS);
  const [filter, setFilter] = useState<string>("ALL");
  const [syncing, setSyncing] = useState(false);

  const visible = useMemo(() => {
    return items.filter((proj) => {
      if (filter === "ALL") return true;
      if (filter === "Private") return proj.visibility === "private";
      if (filter === "AI / Vision") {
        return proj.stack.some((s) =>
          /groq|mediapipe|onnx|tensorflow|vision/i.test(s)
        );
      }
      if (filter === "Firebase") {
        return proj.stack.some((s) => s.toLowerCase().includes("firebase"));
      }
      if (filter === "Supabase") {
        return proj.stack.some((s) => s.toLowerCase().includes("supabase"));
      }
      return true;
    });
  }, [filter, items]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/vercel");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setItems(data.projects);
        }
      }
    } catch {
      // keep snapshot
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {["ALL", "AI / Vision", "Firebase", "Supabase", "Private"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-2.5 py-1 font-mono-tech text-[11px] transition ${
                filter === f
                  ? "border-sky-400 bg-sky-400 text-slate-950 font-semibold"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono-tech text-[11px] text-sky-300 hover:border-sky-400 disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing..." : "Verify Vercel"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((proj) => {
          const isWarn = proj.readyState === "PROMOTED_WITH_LATEST_ERROR";
          const linked = proj.featuredSlug
            ? PROJECTS.find((p) => p.slug === proj.featuredSlug)
            : undefined;
          return (
            <div
              key={proj.id}
              className="flex flex-col justify-between rounded-xl border border-white/12 bg-slate-900/75 p-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Triangle className="h-3 w-3 shrink-0 fill-current text-sky-400" />
                    <span className="truncate font-display text-sm font-bold text-white">
                      {proj.name}
                    </span>
                    {proj.visibility === "private" && (
                      <Lock className="h-3 w-3 shrink-0 text-amber-300" />
                    )}
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 font-mono-tech text-[9px] font-semibold ${
                      isWarn
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-emerald-500/15 text-emerald-300"
                    }`}
                  >
                    {isWarn ? (
                      <AlertTriangle className="h-2.5 w-2.5" />
                    ) : (
                      <CheckCircle2 className="h-2.5 w-2.5" />
                    )}
                    {isWarn ? "PROMOTED" : "READY"}
                  </span>
                </div>

                <div className="mt-1 font-mono-tech text-[10px] text-slate-400">
                  {proj.framework} · Node {proj.nodeVersion} · {proj.updatedAt}
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-slate-300">
                  {proj.summary[locale]}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 font-mono-tech text-[10px]">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-300 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>{proj.liveUrl.replace("https://", "")}</span>
                </a>
                {linked && (
                  <button
                    type="button"
                    onClick={() => onOpenProject(linked.slug, linked.title)}
                    className="text-sky-300 hover:underline"
                  >
                    Case Study ↗
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WindowsGitHubBody({
  locale,
  onOpenProject,
}: {
  locale: "id" | "en";
  onOpenProject: (slug: string, title: string) => void;
}) {
  const [repos, setRepos] = useState<GitHubRepoItem[]>(GITHUB_SNAPSHOT);
  const [lang, setLang] = useState("ALL");
  const [syncing, setSyncing] = useState(false);

  const visible = useMemo(() => {
    return repos.filter(
      (r) => lang === "ALL" || (r.language || "Other") === lang
    );
  }, [lang, repos]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.repos) && data.repos.length > 0) {
          setRepos(data.repos);
        }
      }
    } catch {
      // keep snapshot
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {["ALL", "TypeScript", "JavaScript", "Rust", "HTML", "C++", "Java"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                className={`rounded-lg border px-2.5 py-1 font-mono-tech text-[11px] transition ${
                  lang === item
                    ? "border-sky-400 bg-sky-400 text-slate-950 font-semibold"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono-tech text-[11px] text-sky-300 hover:border-sky-400 disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing..." : "Sync GitHub API"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((repo) => {
          const linked = repo.featuredSlug
            ? PROJECTS.find((p) => p.slug === repo.featuredSlug)
            : undefined;
          return (
            <div
              key={repo.name}
              className="flex flex-col justify-between rounded-xl border border-white/12 bg-slate-900/75 p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-display text-sm font-bold text-white">
                    {repo.name}
                  </span>
                  <span className="font-mono-tech text-[10px] text-slate-400">
                    {repo.language || "Code"}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs text-slate-300">
                  {repo.description ||
                    (locale === "id"
                      ? "Repositori kode di github.com/jajangking."
                      : "Code repository on github.com/jajangking.")}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 font-mono-tech text-[10px]">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white"
                >
                  Code →
                </a>
                <div className="flex items-center gap-2">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-300 hover:underline"
                    >
                      Live ↗
                    </a>
                  )}
                  {linked && (
                    <button
                      type="button"
                      onClick={() => onOpenProject(linked.slug, linked.title)}
                      className="text-sky-300 hover:underline"
                    >
                      Case Study
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
