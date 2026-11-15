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
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Command,
  Cpu,
  ExternalLink,
  Eye,
  Film,
  Gamepad2,
  Gauge,
  KeyRound,
  Layers,
  Lock,
  Monitor,
  Pin,
  Play,
  RefreshCw,
  ScanEye,
  ShoppingBag,
  Sparkles,
  SunMedium,
  Terminal,
  Triangle,
  Trophy,
  Tv,
  Volume2,
  Wrench,
} from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { ProjectVisualPreview } from "@/components/ProjectVisualPreview";
import { usePortfolio, VISUAL_MODE_META } from "@/context/PortfolioContext";
import { PROFILE_CONFIG } from "@/data/profile";
import { PROJECT_CATEGORY_LABELS, PROJECTS } from "@/data/projects";
import { VERCEL_PROJECTS } from "@/data/vercel-projects";
import {
  ProjectCaseStudy,
  ProjectCategory,
  VercelDeploymentItem,
  VisualMode,
} from "@/types/portfolio";

type Ps5TopTab = "games" | "media" | "trophies";

const GAME_TILE_ICON: Record<
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
  { id: "ps5", icon: Gamepad2 },
];

function usePs5Clock() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);

  if (!isClient) return "--:--";
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Ps5CatalogView() {
  const {
    mode,
    setMode,
    locale,
    toggleLocale,
    openProject,
    pinnedSlugs,
    togglePinProject,
    setCommandOpen,
    setTerminalOpen,
    isCommandOpen,
    isTerminalOpen,
    activeProject,
  } = usePortfolio();

  const clock = usePs5Clock();

  const [topTab, setTopTab] = useState<Ps5TopTab>("games");
  const [category, setCategory] = useState<ProjectCategory>("all");
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>(PROJECTS[0].slug);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const pinnedSet = useMemo(() => new Set(pinnedSlugs), [pinnedSlugs]);

  const catalogList = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (onlyPinned && !pinnedSet.has(p.slug)) return false;
      if (category !== "all" && p.category !== category) return false;
      return true;
    }).sort((a, b) => {
      const aPin = pinnedSet.has(a.slug);
      const bPin = pinnedSet.has(b.slug);
      if (aPin && !bPin) return -1;
      if (!aPin && bPin) return 1;
      return 0;
    });
  }, [category, onlyPinned, pinnedSet]);

  const activeCatalogProject: ProjectCaseStudy = useMemo(() => {
    const found = catalogList.find((p) => p.slug === selectedSlug);
    return found ?? catalogList[0] ?? PROJECTS[0];
  }, [catalogList, selectedSlug]);

  const stepCatalog = (delta: 1 | -1) => {
    if (catalogList.length === 0) return;
    const idx = catalogList.findIndex(
      (p) => p.slug === activeCatalogProject.slug
    );
    const nextIdx =
      (Math.max(0, idx) + delta + catalogList.length) % catalogList.length;
    setSelectedSlug(catalogList[nextIdx].slug);
  };

  // DualSense Left / Right D-Pad browsing
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (
        isTyping ||
        isCommandOpen ||
        isTerminalOpen ||
        activeProject ||
        topTab !== "games"
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepCatalog(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepCatalog(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[#060911] text-white"
      onClick={() => {
        if (themeMenuOpen) setThemeMenuOpen(false);
      }}
    >
      {/* Dynamic Reactive PS5 Ambient Wallpaper based on highlighted project */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(85% 65% at 74% 28%, ${activeCatalogProject.accentHex}34, transparent 62%), radial-gradient(65% 60% at 15% 82%, rgba(56, 189, 248, 0.16), transparent 60%), linear-gradient(160deg, #05070e 0%, #0b1121 55%, #050811 100%)`,
        }}
      />

      {/* Subtle PS5 Horizontal Horizon Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.28) 0.75px, transparent 0.75px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Top PS5 Shell Header Bar */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-2 sm:px-8 sm:pt-5">
        {/* Left Tabs: Games | Media (Vercel) | Trophies */}
        <div className="flex items-center gap-4 sm:gap-7">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-white/90" />
            <span className="hidden font-mono-tech text-[11px] tracking-widest text-white/60 uppercase sm:inline">
              PS5 UI
            </span>
          </div>

          <nav
            aria-label="PS5 Home Navigation"
            className="flex items-center gap-3 text-sm font-medium sm:gap-6 sm:text-base"
          >
            {(
              [
                {
                  id: "games",
                  label: locale === "id" ? "Katalog Proyek" : "Projects",
                },
                {
                  id: "media",
                  label: `Vercel (${VERCEL_PROJECTS.length})`,
                },
                {
                  id: "trophies",
                  label: locale === "id" ? "Trofi & Profil" : "Trophies",
                },
              ] as const
            ).map((tab) => {
              const active = topTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTopTab(tab.id)}
                  className={`relative pb-1 transition-colors ${
                    active
                      ? "font-semibold text-white"
                      : "text-white/50 hover:text-white/85"
                  }`}
                >
                  <span>{tab.label}</span>
                  {active && (
                    <motion.span
                      layoutId="ps5-top-tab-underline"
                      className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-white"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right PS5 System Tray */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setThemeMenuOpen((v) => !v);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono-tech text-[11px] font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/15"
          >
            <Gamepad2 className="h-3.5 w-3.5 text-sky-300" />
            <span className="hidden sm:inline">06 · PS5 Hub</span>
            <span className="sm:hidden">Tema</span>
          </button>

          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Search Catalog"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition hover:bg-white/20"
          >
            <Command className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setTerminalOpen(true)}
            aria-label="Open CLI"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition hover:bg-white/20 sm:flex"
          >
            <Terminal className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono-tech text-[10px] font-semibold text-white/90 hover:bg-white/20"
          >
            {locale.toUpperCase()}
          </button>

          <div className="flex items-center gap-2 pl-1">
            <Image
              src={PROFILE_CONFIG.avatarUrl}
              alt={PROFILE_CONFIG.displayName}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover ring-2 ring-white/40"
            />
            <span className="hidden font-mono-tech text-xs font-medium text-white/85 md:inline">
              {clock}
            </span>
          </div>
        </div>
      </header>

      {/* Theme Switcher Popover */}
      <AnimatePresence>
        {themeMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-16 right-4 z-40 w-64 rounded-2xl border border-white/20 bg-[#0d1424]/95 p-3 shadow-2xl backdrop-blur-2xl sm:right-8"
          >
            <div className="mb-2 font-mono-tech text-[10px] tracking-wider text-slate-400 uppercase">
              {locale === "id" ? "Ganti Tema Visual" : "Switch Reality Engine"}
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
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      active
                        ? "bg-white font-semibold text-slate-950"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{VISUAL_MODE_META[id].name}</span>
                    </span>
                    <span className="font-mono-tech text-[10px] opacity-70">
                      [{VISUAL_MODE_META[id].code.replace("0", "")}]
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Body */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-3 pb-14 sm:px-8">
        {topTab === "games" && (
          <>
            {/* Quick Category / Pinned Filter Bar */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setOnlyPinned((v) => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono-tech text-[11px] font-semibold transition ${
                    onlyPinned
                      ? "border-white bg-white text-slate-950"
                      : "border-white/20 bg-white/5 text-white/80 hover:bg-white/15"
                  }`}
                >
                  <Pin className="h-3 w-3" />
                  <span>
                    {locale === "id"
                      ? `Pilihan Terbaik (${pinnedSlugs.length})`
                      : `Pinned (${pinnedSlugs.length})`}
                  </span>
                </button>

                {PROJECT_CATEGORY_LABELS.map((cat) => {
                  const active = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                        active
                          ? "border-white/60 bg-white/20 text-white"
                          : "border-white/10 bg-white/5 text-white/65 hover:text-white"
                      }`}
                    >
                      {cat.label[locale]}
                    </button>
                  );
                })}
              </div>

              {/* D-Pad Prev/Next Controls */}
              <div className="hidden items-center gap-1.5 sm:flex">
                <button
                  type="button"
                  onClick={() => stepCatalog(-1)}
                  aria-label="Previous Catalog Tile"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/15"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => stepCatalog(1)}
                  aria-label="Next Catalog Tile"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/15"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Iconic PS5 Horizontal Game Launcher Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-4">
              {catalogList.map((project) => {
                const selected = project.slug === activeCatalogProject.slug;
                const style = GAME_TILE_ICON[project.slug] ?? {
                  icon: Layers,
                  gradient: "from-indigo-500 to-sky-600",
                };
                const Icon = style.icon;
                const isPinned = pinnedSet.has(project.slug);

                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => setSelectedSlug(project.slug)}
                    className={`group relative flex shrink-0 flex-col items-start text-left transition-all duration-300 focus:outline-none ${
                      selected ? "scale-100" : "scale-95 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} transition-all duration-300 sm:h-24 sm:w-24 ${
                        selected
                          ? "ring-[3px] ring-white ring-offset-2 ring-offset-[#070b15] shadow-[0_14px_34px_-8px_rgba(255,255,255,0.35)]"
                          : "border border-white/15"
                      }`}
                    >
                      <Icon className="h-8 w-8 text-white drop-shadow sm:h-10 sm:w-10" />

                      {/* Corner Status Pills */}
                      {project.liveUrl && (
                        <span className="absolute top-1.5 right-1.5 rounded-full bg-emerald-400 px-1.5 py-0.5 font-mono-tech text-[8px] font-bold text-slate-950">
                          LIVE
                        </span>
                      )}
                      {isPinned && (
                        <span className="absolute bottom-1.5 left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/55 text-amber-300 backdrop-blur">
                          <Pin className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>

                    <span
                      className={`mt-2 max-w-[82px] truncate font-display text-[11px] sm:max-w-[98px] sm:text-xs ${
                        selected ? "font-bold text-white" : "text-white/65"
                      }`}
                    >
                      {project.repoName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected PS5 Game Spotlight Stage */}
            <AnimatePresence mode="wait">
              <motion.section
                key={activeCatalogProject.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
                className="mt-2 grid flex-1 items-start gap-6 lg:grid-cols-12"
              >
                {/* Left: PS5 Game Details, Actions & Trophies */}
                <div className="space-y-5 lg:col-span-6">
                  <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[11px]">
                    <span
                      className="rounded border border-white/20 bg-white/10 px-2 py-0.5 font-semibold text-white"
                    >
                      PS5 // {activeCatalogProject.primaryLang.toUpperCase()}
                    </span>
                    <span className="text-white/60">
                      {activeCatalogProject.year}
                    </span>
                    {activeCatalogProject.liveUrl && (
                      <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 font-semibold text-emerald-300">
                        ● LIVE ON VERCEL
                      </span>
                    )}
                    {activeCatalogProject.isPrivateRepo && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 font-semibold text-amber-300">
                        <Lock className="h-3 w-3" />
                        PRIVATE REPO
                      </span>
                    )}
                  </div>

                  <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                      {activeCatalogProject.title}
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                      {activeCatalogProject.summary[locale]}
                    </p>
                  </div>

                  {/* Iconic PS5 Play & Utility Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => openProject(activeCatalogProject.slug)}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      <span>
                        {locale === "id"
                          ? "Buka Case Study"
                          : "Launch Case Study"}
                      </span>
                    </button>

                    {activeCatalogProject.liveUrl && (
                      <a
                        href={activeCatalogProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/45 bg-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-200 backdrop-blur transition hover:bg-emerald-500/30"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>
                          {locale === "id" ? "Mainkan Live" : "Play Live"}
                        </span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        togglePinProject(activeCatalogProject.slug)
                      }
                      aria-label="Pin Project"
                      className={`inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition ${
                        pinnedSet.has(activeCatalogProject.slug)
                          ? "border-amber-300 bg-amber-400/20 text-amber-200"
                          : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Pin className="h-3.5 w-3.5" />
                      <span>
                        {pinnedSet.has(activeCatalogProject.slug)
                          ? "Pinned"
                          : "Pin"}
                      </span>
                    </button>

                    {activeCatalogProject.repoUrl && (
                      <a
                        href={activeCatalogProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repo"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                      >
                        <GitHubMark className="h-4 w-4" />
                      </a>
                    )}

                    <Link
                      href={`/projects/${activeCatalogProject.slug}`}
                      className="inline-flex h-11 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 font-mono-tech text-xs text-white/90 transition hover:bg-white/20"
                    >
                      <span>{locale === "id" ? "Detail" : "Full"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* PS5 Trophy & Telemetry Cards */}
                  <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-xl">
                    <div className="mb-3 flex items-center justify-between font-mono-tech text-[10px] tracking-wider text-slate-300 uppercase">
                      <span className="flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-amber-300" />
                        <span>
                          {locale === "id"
                            ? "Pencapaian & Metrik Sistem"
                            : "Project Trophies & Telemetry"}
                        </span>
                      </span>
                      <span>{activeCatalogProject.stack.slice(0, 2).join(" · ")}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {activeCatalogProject.metrics.map((m, idx) => (
                        <div
                          key={m.label.en}
                          className="rounded-xl border border-white/10 bg-black/30 p-3 text-center"
                        >
                          <div className="font-mono-tech text-[9px] text-amber-300 uppercase">
                            {idx === 0
                              ? "PLATINUM"
                              : idx === 1
                                ? "GOLD"
                                : "SILVER"}
                          </div>
                          <div className="font-display mt-1 text-base font-bold text-white sm:text-lg">
                            {m.value}
                          </div>
                          <div className="mt-0.5 font-mono-tech text-[9px] text-slate-400">
                            {m.label[locale]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Live Activity Card & Architecture Cards */}
                <div className="space-y-4 lg:col-span-6">
                  <div className="h-64 overflow-hidden rounded-2xl border border-white/20 shadow-2xl sm:h-72">
                    <ProjectVisualPreview
                      preset={activeCatalogProject.simulationPreset}
                      accentHex={activeCatalogProject.accentHex}
                      interactive={true}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {activeCatalogProject.architectureNodes.map((node) => (
                      <div
                        key={node.layer}
                        className="rounded-2xl border border-white/12 bg-white/[0.06] p-3.5 backdrop-blur-xl"
                      >
                        <div
                          className="font-mono-tech text-[9px] font-semibold"
                          style={{ color: activeCatalogProject.accentHex }}
                        >
                          {node.layer}
                        </div>
                        <div className="mt-1 text-xs font-bold text-white">
                          {node.title}
                        </div>
                        <p className="mt-1 text-[11px] leading-snug text-slate-300">
                          {node.detail[locale]}
                        </p>
                      </div>
                    ))}
                  </div>

                  {activeCatalogProject.relatedDeploys &&
                    activeCatalogProject.relatedDeploys.length > 0 && (
                      <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-3.5 backdrop-blur-xl">
                        <div className="mb-2 font-mono-tech text-[10px] uppercase tracking-wider text-slate-300">
                          {locale === "id"
                            ? "Add-Ons & Live Vercel Terkait"
                            : "Related Vercel Deployments"}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCatalogProject.relatedDeploys.map((d) => (
                            <a
                              key={d.url}
                              href={d.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/35 px-3 py-1 font-mono-tech text-[10px] text-emerald-300 transition hover:border-emerald-400/60"
                            >
                              <ExternalLink className="h-2.5 w-2.5" />
                              <span>{d.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </motion.section>
            </AnimatePresence>
          </>
        )}

        {topTab === "media" && (
          <Ps5VercelMediaGrid
            locale={locale}
            onOpenCaseStudy={(slug) => {
              setSelectedSlug(slug);
              setTopTab("games");
            }}
          />
        )}

        {topTab === "trophies" && (
          <Ps5ProfileAndTrophies
            locale={locale}
            onSelectProject={(slug) => {
              setSelectedSlug(slug);
              setTopTab("games");
            }}
          />
        )}
      </main>

      {/* Bottom PS5 DualSense Control Hint Strip */}
      <footer className="relative z-20 border-t border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] text-slate-300">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-white">
                ← / →
              </kbd>
              <span>{locale === "id" ? "Geser Katalog" : "Browse Games"}</span>
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-white">
                ⌘K
              </kbd>
              <span>Search</span>
            </span>
            <span className="hidden items-center gap-1 md:inline-flex">
              <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-white">
                1–6
              </kbd>
              <span>Switch Reality</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("clarity")}
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] text-white hover:bg-white/20"
            >
              {locale === "id" ? "Clean UI" : "Clean UI"}
            </button>
            <button
              type="button"
              onClick={() => setMode("windows")}
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] text-white hover:bg-white/20"
            >
              Win OS
            </button>
            <button
              type="button"
              onClick={() => setMode("obsidian")}
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] text-white hover:bg-white/20"
            >
              Obsidian 3D
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Ps5VercelMediaGrid({
  locale,
  onOpenCaseStudy,
}: {
  locale: "id" | "en";
  onOpenCaseStudy: (slug: string) => void;
}) {
  const [items, setItems] = useState<VercelDeploymentItem[]>(VERCEL_PROJECTS);
  const [syncing, setSyncing] = useState(false);

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
    <div className="space-y-5 pt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-4xl">
            {locale === "id"
              ? "16 Live Vercel Apps Library"
              : "16 Live Vercel Apps Library"}
          </h1>
          <p className="mt-1 text-xs text-slate-300 sm:text-sm">
            {locale === "id"
              ? "Klik 'Launch App' untuk membuka aplikasi live di tab baru atau buka halaman katalognya."
              : "Click 'Launch App' to open any live Vercel build or inspect its catalog page."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono-tech text-xs text-white transition hover:bg-white/20 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Syncing..." : "Verify Vercel API"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((proj) => {
          const isWarn = proj.readyState === "PROMOTED_WITH_LATEST_ERROR";
          return (
            <div
              key={proj.id}
              className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-xl transition hover:border-white/40"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Triangle className="h-3 w-3 shrink-0 fill-current text-sky-300" />
                    <span className="truncate font-display text-base font-bold text-white">
                      {proj.name}
                    </span>
                    {proj.visibility === "private" && (
                      <Lock className="h-3 w-3 shrink-0 text-amber-300" />
                    )}
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono-tech text-[9px] font-semibold ${
                      isWarn
                        ? "bg-amber-400/20 text-amber-300"
                        : "bg-emerald-400/20 text-emerald-300"
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
                  {proj.framework} · Node {proj.nodeVersion}
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-200">
                  {proj.summary[locale]}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono-tech text-[10px]">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-bold text-slate-950 transition hover:scale-105"
                >
                  <Play className="h-2.5 w-2.5 fill-current" />
                  <span>Launch</span>
                </a>
                {proj.featuredSlug && (
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(proj.featuredSlug!)}
                    className="text-sky-300 hover:underline"
                  >
                    Catalog ↗
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

function Ps5ProfileAndTrophies({
  locale,
  onSelectProject,
}: {
  locale: "id" | "en";
  onSelectProject: (slug: string) => void;
}) {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={PROFILE_CONFIG.avatarUrl}
            alt={PROFILE_CONFIG.displayName}
            width={68}
            height={68}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-white/50"
          />
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-wider text-amber-300">
              PS5 PROFILE // @{PROFILE_CONFIG.handle}
            </div>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {PROFILE_CONFIG.displayName} — {PROFILE_CONFIG.location}
            </h1>
            <p className="mt-1 text-xs text-slate-300 sm:text-sm">
              {PROFILE_CONFIG.subheadline[locale]}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-amber-300/30 bg-amber-400/10 px-4 py-3">
          <Trophy className="h-7 w-7 text-amber-300" />
          <div>
            <div className="font-display text-xl font-bold text-white">
              14 Platinum
            </div>
            <div className="font-mono-tech text-[10px] text-amber-200">
              16 Live Deploys · 54+ Repos
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROFILE_CONFIG.pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl"
          >
            <div className="font-mono-tech text-[10px] text-sky-300">
              {pillar.code}
            </div>
            <h2 className="font-display mt-1 text-lg font-bold text-white">
              {pillar.title[locale]}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              {pillar.description[locale]}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {pillar.linkedProjects.map((slug) => {
                const proj = PROJECTS.find((p) => p.slug === slug);
                if (!proj) return null;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => onSelectProject(slug)}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono-tech text-[11px] text-white transition hover:bg-white hover:text-slate-950"
                  >
                    {proj.repoName} →
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
