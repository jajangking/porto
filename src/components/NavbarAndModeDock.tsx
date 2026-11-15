"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Terminal,
  Sparkles,
  BookOpen,
  Cpu,
  Gamepad2,
  Globe,
  Monitor,
  SunMedium,
} from "lucide-react";
import { usePortfolio, VISUAL_MODE_META } from "@/context/PortfolioContext";
import { PROFILE_CONFIG } from "@/data/profile";
import { VisualMode } from "@/types/portfolio";

const MODE_BUTTONS: Array<{
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

export function NavbarAndModeDock() {
  const pathname = usePathname();
  const {
    mode,
    setMode,
    locale,
    toggleLocale,
    setCommandOpen,
    setTerminalOpen,
    fpsEstimate,
    webglActive,
    modeAnnouncement,
  } = usePortfolio();

  // In Windows Desktop or PS5 Hub modes on the home route, the dedicated OS chrome handles navigation
  if ((mode === "windows" || mode === "ps5") && pathname === "/") {
    return null;
  }

  return (
    <>
      {/* Top Floating Precision Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto max-w-7xl">
          <div
            className="reality-card hud-frame flex items-center justify-between px-4 py-2.5 sm:px-5"
            style={{
              borderRadius: mode === "hud" ? "4px" : "9999px",
            }}
          >
            {/* Brand Identity */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <span
                className="flex h-8 w-8 items-center justify-center font-mono-tech text-xs font-bold transition-transform duration-300 group-hover:scale-105"
                style={{
                  borderRadius: mode === "hud" ? "3px" : "9999px",
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                {PROFILE_CONFIG.monogram}
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-sm font-bold tracking-tight">
                  @{PROFILE_CONFIG.handle}
                </span>
                <span
                  className="font-mono-tech text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {VISUAL_MODE_META[mode].shaderLabel}
                </span>
              </div>
            </Link>

            {/* Primary Anchor Nav (Desktop) */}
            <nav
              aria-label="Primary Navigation"
              className="hidden items-center gap-6 text-xs font-medium md:flex"
              style={{ color: "var(--text-secondary)" }}
            >
              <a
                href="#showcase"
                className="transition-colors hover:text-[var(--text-primary)]"
              >
                {locale === "id" ? "Showcase" : "Showcase"}
              </a>
              <a
                href="#engineering"
                className="transition-colors hover:text-[var(--text-primary)]"
              >
                {locale === "id" ? "Arsitektur" : "Engineering"}
              </a>
              <a
                href="#archive"
                className="transition-colors hover:text-[var(--text-primary)]"
              >
                {locale === "id" ? "Vercel & GitHub" : "Vercel & GitHub"}
              </a>
              <a
                href="#contact"
                className="transition-colors hover:text-[var(--text-primary)]"
              >
                {locale === "id" ? "Kontak" : "Connect"}
              </a>
            </nav>

            {/* Quick Utilities: Locale + Terminal + Command Palette */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {mode === "hud" && (
                <div
                  className="hidden items-center gap-2 border-r pr-2.5 font-mono-tech text-[10px] lg:flex"
                  style={{
                    borderColor: "var(--border-subtle)",
                    color: "var(--accent)",
                  }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  <span>{webglActive ? `${fpsEstimate} FPS` : "2D FALLBACK"}</span>
                </div>
              )}

              <button
                type="button"
                onClick={toggleLocale}
                title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                className="flex items-center gap-1.5 px-2.5 py-1.5 font-mono-tech text-[11px] font-medium transition hover:opacity-85"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--bg-pill)",
                  color: "var(--text-primary)",
                }}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{locale.toUpperCase()}</span>
              </button>

              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                aria-label="Open Interactive Terminal"
                className="hidden items-center gap-1.5 px-2.5 py-1.5 font-mono-tech text-[11px] transition hover:opacity-85 sm:flex"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--bg-pill)",
                  color: "var(--text-primary)",
                }}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>CLI</span>
              </button>

              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 font-mono-tech text-[11px] font-semibold transition hover:opacity-90"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                <Command className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Menu</span>
                <kbd className="rounded bg-black/20 px-1 py-0.5 text-[9px] leading-none">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Floating Tri-Reality Switcher Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
        <div
          role="group"
          aria-label="Visual Reality Switcher"
          className="reality-card hud-frame pointer-events-auto flex items-center gap-1 p-1.5"
          style={{
            borderRadius: mode === "hud" ? "6px" : "9999px",
          }}
        >
          <span
            className="hidden px-2.5 font-mono-tech text-[10px] tracking-wider uppercase sm:inline"
            style={{ color: "var(--text-muted)" }}
          >
            {locale === "id" ? "Mode:" : "Reality:"}
          </span>
          {MODE_BUTTONS.map(({ id, icon: Icon }) => {
            const active = mode === id;
            const meta = VISUAL_MODE_META[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                aria-pressed={active}
                className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs"
                style={{
                  borderRadius: mode === "hud" ? "4px" : "9999px",
                  color: active ? "var(--accent-contrast)" : "var(--text-secondary)",
                }}
              >
                {active && (
                  <motion.span
                    layoutId="reality-dock-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 -z-10"
                    style={{
                      borderRadius: mode === "hud" ? "4px" : "9999px",
                      backgroundColor: "var(--accent)",
                    }}
                  />
                )}
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden font-mono-tech text-[10px] opacity-75 md:inline">
                  {meta.code}
                </span>
                <span className="hidden whitespace-nowrap sm:inline">
                  {meta.shortName}
                </span>
                <span className="font-mono-tech text-[10px] sm:hidden">
                  {meta.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Reality Shift Telemetry Toast */}
      <AnimatePresence>
        {modeAnnouncement && (
          <motion.div
            key={modeAnnouncement}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.24 }}
            className="reality-card pointer-events-none fixed right-4 bottom-20 z-40 hidden items-center gap-3 px-4 py-2.5 sm:flex"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <div className="leading-tight">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                {locale === "id" ? "Visual Engine Aktif" : "Active Reality Engine"}
              </div>
              <div className="text-xs font-semibold">
                {VISUAL_MODE_META[modeAnnouncement].name} —{" "}
                <span className="font-normal text-[var(--text-secondary)]">
                  {VISUAL_MODE_META[modeAnnouncement].tagline[locale]}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
