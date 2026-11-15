"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Locale, ProjectCaseStudy, VisualMode } from "@/types/portfolio";
import { DEFAULT_PINNED_SLUGS, PROJECTS } from "@/data/projects";

export const VISUAL_MODE_META: Record<
  VisualMode,
  {
    id: VisualMode;
    code: string;
    name: string;
    shortName: string;
    tagline: { id: string; en: string };
    shaderLabel: string;
  }
> = {
  obsidian: {
    id: "obsidian",
    code: "01",
    name: "Obsidian 3D",
    shortName: "Obsidian",
    tagline: {
      id: "Shader WebGL Orbital · Glassmorphism · Deep Indigo",
      en: "Orbital WebGL Shader · Glassmorphism · Deep Indigo",
    },
    shaderLabel: "GLSL // NEURAL ORB",
  },
  editorial: {
    id: "editorial",
    code: "02",
    name: "Kinetic Editorial",
    shortName: "Editorial",
    tagline: {
      id: "Tipografi Studio · Swiss Hairlines · Warm Gallery",
      en: "Studio Typography · Swiss Hairlines · Warm Gallery",
    },
    shaderLabel: "WIRE // WAVE RIBBON",
  },
  hud: {
    id: "hud",
    code: "03",
    name: "Spatial HUD",
    shortName: "Spatial HUD",
    tagline: {
      id: "Telemetry Cockpit · Radar Grid · Emerald Vector",
      en: "Telemetry Cockpit · Radar Grid · Emerald Vector",
    },
    shaderLabel: "RADAR // TOPOLOGY",
  },
  clarity: {
    id: "clarity",
    code: "04",
    name: "Pure Clarity",
    shortName: "Clean UI",
    tagline: {
      id: "Putih Bersih · Kontras Tinggi · Super Mudah Dibaca",
      en: "Crisp Daylight · High Contrast · Effortless Reading",
    },
    shaderLabel: "CLARITY // HIGH CONTRAST",
  },
  windows: {
    id: "windows",
    code: "05",
    name: "Windows Desktop",
    shortName: "Win OS",
    tagline: {
      id: "Desktop Ikon Proyek · Start Menu · Multitasking Window",
      en: "Desktop Project Icons · Start Menu · Fluent Windows",
    },
    shaderLabel: "FLUENT // DESKTOP OS",
  },
  ps5: {
    id: "ps5",
    code: "06",
    name: "PS5 Game Catalog",
    shortName: "PS5 Hub",
    tagline: {
      id: "Katalog Game PS5 · DualSense D-Pad · Trofi Proyek",
      en: "PS5 Game Hub · DualSense D-Pad · Project Trophies",
    },
    shaderLabel: "PS5 // CATALOG HUB",
  },
};

interface PortfolioContextValue {
  mode: VisualMode;
  setMode: (mode: VisualMode) => void;
  cycleMode: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  activeProject: ProjectCaseStudy | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
  stepProject: (direction: 1 | -1) => void;
  pinnedSlugs: string[];
  togglePinProject: (slug: string) => void;
  resetPinnedProjects: () => void;
  isPinnedCustomized: boolean;
  isCommandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  isTerminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  fpsEstimate: number;
  setFpsEstimate: (fps: number) => void;
  webglActive: boolean;
  setWebglActive: (active: boolean) => void;
  modeAnnouncement: VisualMode | null;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

const MODES_ORDER: VisualMode[] = [
  "obsidian",
  "editorial",
  "hud",
  "clarity",
  "windows",
  "ps5",
];

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<VisualMode>("obsidian");
  const [locale, setLocaleState] = useState<Locale>("id");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [pinnedSlugs, setPinnedSlugs] =
    useState<string[]>(DEFAULT_PINNED_SLUGS);
  const [isCommandOpen, setCommandOpen] = useState(false);
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [fpsEstimate, setFpsEstimate] = useState(60);
  const [webglActive, setWebglActive] = useState(true);
  const [modeAnnouncement, setModeAnnouncement] = useState<VisualMode | null>(
    null
  );

  // Hydrate persisted mode, locale, pinned slugs & project param via RAF
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      try {
        const savedMode = window.localStorage.getItem(
          "porto-visual-mode"
        ) as VisualMode | null;
        if (savedMode && MODES_ORDER.includes(savedMode)) {
          setModeState(savedMode);
          document.documentElement.dataset.mode = savedMode;
        } else {
          document.documentElement.dataset.mode = "obsidian";
        }

        const savedLocale = window.localStorage.getItem(
          "porto-locale"
        ) as Locale | null;
        if (savedLocale === "id" || savedLocale === "en") {
          setLocaleState(savedLocale);
        }

        const savedPinned = window.localStorage.getItem("porto-pinned-slugs");
        if (savedPinned) {
          const parsed = JSON.parse(savedPinned);
          if (Array.isArray(parsed)) {
            const validSlugs = parsed.filter(
              (slug): slug is string =>
                typeof slug === "string" &&
                PROJECTS.some((p) => p.slug === slug)
            );
            if (validSlugs.length > 0) {
              setPinnedSlugs(validSlugs);
            }
          }
        }

        const params = new URLSearchParams(window.location.search);
        const projectParam = params.get("project");
        if (projectParam && PROJECTS.some((p) => p.slug === projectParam)) {
          setActiveSlug(projectParam);
        }
      } catch {
        document.documentElement.dataset.mode = "obsidian";
      }
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const setMode = useCallback((nextMode: VisualMode) => {
    setModeState(nextMode);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.mode = nextMode;
    }
    try {
      window.localStorage.setItem("porto-visual-mode", nextMode);
    } catch {
      // ignore storage quota errors
    }
    setModeAnnouncement(nextMode);
  }, []);

  useEffect(() => {
    if (!modeAnnouncement) return;
    const timer = window.setTimeout(() => setModeAnnouncement(null), 1800);
    return () => window.clearTimeout(timer);
  }, [modeAnnouncement]);

  const cycleMode = useCallback(() => {
    setModeState((prev) => {
      const idx = MODES_ORDER.indexOf(prev);
      const next = MODES_ORDER[(idx + 1) % MODES_ORDER.length];
      if (typeof document !== "undefined") {
        document.documentElement.dataset.mode = next;
      }
      try {
        window.localStorage.setItem("porto-visual-mode", next);
      } catch {
        // ignore
      }
      setModeAnnouncement(next);
      return next;
    });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem("porto-locale", next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "id" ? "en" : "id");
  }, [locale, setLocale]);

  const openProject = useCallback((slug: string) => {
    setActiveSlug(slug);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("project", slug);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, []);

  const closeProject = useCallback(() => {
    setActiveSlug(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, []);

  const stepProject = useCallback(
    (direction: 1 | -1) => {
      if (!activeSlug) return;
      const idx = PROJECTS.findIndex((p) => p.slug === activeSlug);
      if (idx === -1) return;
      const nextIdx = (idx + direction + PROJECTS.length) % PROJECTS.length;
      openProject(PROJECTS[nextIdx].slug);
    },
    [activeSlug, openProject]
  );

  const togglePinProject = useCallback((slug: string) => {
    setPinnedSlugs((prev) => {
      const exists = prev.includes(slug);
      // Keep at least 1 pinned project so Best Picks view is never accidentally blank
      if (exists && prev.length <= 1) return prev;
      const next = exists ? prev.filter((s) => s !== slug) : [slug, ...prev];
      try {
        window.localStorage.setItem("porto-pinned-slugs", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const resetPinnedProjects = useCallback(() => {
    setPinnedSlugs(DEFAULT_PINNED_SLUGS);
    try {
      window.localStorage.removeItem("porto-pinned-slugs");
    } catch {
      // ignore
    }
  }, []);

  const isPinnedCustomized = useMemo(() => {
    if (pinnedSlugs.length !== DEFAULT_PINNED_SLUGS.length) return true;
    return pinnedSlugs.some((slug, i) => slug !== DEFAULT_PINNED_SLUGS[i]);
  }, [pinnedSlugs]);

  // Global keyboard shortcuts: Cmd/Ctrl+K, Backtick/Ctrl+`, 1/2/3/4, Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape") {
        if (isCommandOpen) {
          setCommandOpen(false);
          return;
        }
        if (isTerminalOpen) {
          setTerminalOpen(false);
          return;
        }
        if (activeSlug) {
          closeProject();
          return;
        }
      }

      if (!isTyping && !isCommandOpen && !isTerminalOpen) {
        if (e.key === "1") setMode("obsidian");
        if (e.key === "2") setMode("editorial");
        if (e.key === "3") setMode("hud");
        if (e.key === "4") setMode("clarity");
        if (e.key === "5") setMode("windows");
        if (e.key === "6") setMode("ps5");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlug, closeProject, isCommandOpen, isTerminalOpen, setMode]);

  const activeProject = useMemo(
    () => (activeSlug ? PROJECTS.find((p) => p.slug === activeSlug) ?? null : null),
    [activeSlug]
  );

  const value = useMemo<PortfolioContextValue>(
    () => ({
      mode,
      setMode,
      cycleMode,
      locale,
      setLocale,
      toggleLocale,
      activeProject,
      openProject,
      closeProject,
      stepProject,
      pinnedSlugs,
      togglePinProject,
      resetPinnedProjects,
      isPinnedCustomized,
      isCommandOpen,
      setCommandOpen,
      isTerminalOpen,
      setTerminalOpen,
      fpsEstimate,
      setFpsEstimate,
      webglActive,
      setWebglActive,
      modeAnnouncement,
    }),
    [
      mode,
      setMode,
      cycleMode,
      locale,
      setLocale,
      toggleLocale,
      activeProject,
      openProject,
      closeProject,
      stepProject,
      pinnedSlugs,
      togglePinProject,
      resetPinnedProjects,
      isPinnedCustomized,
      isCommandOpen,
      isTerminalOpen,
      fpsEstimate,
      webglActive,
      modeAnnouncement,
    ]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return ctx;
}
