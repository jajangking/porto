"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Command,
  Cpu,
  BookOpen,
  Monitor,
  Sparkles,
  SunMedium,
  Terminal,
} from "lucide-react";
import { usePortfolio, VISUAL_MODE_META } from "@/context/PortfolioContext";
import { PROFILE_CONFIG } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { VisualMode } from "@/types/portfolio";

const MARQUEE_STACK = [
  "Next.js 16 App Router",
  "Three.js & Custom GLSL",
  "Rapier3D WASM Physics",
  "Rust + JNI + Compose",
  "llama.cpp ARM64 VLM",
  "TensorFlow.js + Groq",
  "ESP32-S3-CAM & BLE",
  "Framer Motion + Lenis",
  "TypeScript Strict",
];

export function HeroSection() {
  const {
    mode,
    setMode,
    locale,
    openProject,
    pinnedSlugs,
    setCommandOpen,
    setTerminalOpen,
    fpsEstimate,
    webglActive,
  } = usePortfolio();

  const quickModes: Array<{
    id: VisualMode;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "obsidian", icon: Sparkles },
    { id: "editorial", icon: BookOpen },
    { id: "hud", icon: Cpu },
    { id: "clarity", icon: SunMedium },
    { id: "windows", icon: Monitor },
  ];

  const quickProjects = pinnedSlugs
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  return (
    <section className="relative z-10 pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Primary Manifesto & CTAs */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-5 inline-flex items-center gap-3 px-3.5 py-1.5 text-xs"
              style={{
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Image
                src={PROFILE_CONFIG.avatarUrl}
                alt={PROFILE_CONFIG.displayName}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover ring-1 ring-[var(--accent)]"
              />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono-tech text-[11px] text-[var(--text-secondary)]">
                {PROFILE_CONFIG.availability[locale]}
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45 }}
              className={`font-display tracking-tight ${
                mode === "editorial"
                  ? "text-4xl leading-[1.03] font-semibold sm:text-6xl lg:text-[4.25rem]"
                  : "text-4xl leading-[1.06] font-bold sm:text-6xl lg:text-[4rem]"
              }`}
            >
              {locale === "id" ? (
                <>
                  Membangun{" "}
                  <span className="hero-accent-text">Sistem Cerdas,</span>{" "}
                  Engine 3D &amp; Produk Digital Tanpa Batas.
                </>
              ) : (
                <>
                  Engineering{" "}
                  <span className="hero-accent-text">Intelligent Systems,</span>{" "}
                  3D Engines &amp; Borderless Products.
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {PROFILE_CONFIG.subheadline[locale]}
            </motion.p>

            {/* Primary Actions */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                <span>
                  {locale === "id"
                    ? "Jelajahi Showcase Proyek"
                    : "Explore Project Showcase"}
                </span>
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="inline-flex items-center gap-2 border px-4 py-3 text-sm font-medium transition hover:border-[var(--accent)]"
                style={{
                  borderRadius: "var(--radius-pill)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <Command className="h-4 w-4 text-[var(--accent)]" />
                <span>{locale === "id" ? "Command Palette" : "Command Menu"}</span>
                <kbd className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                className="inline-flex items-center gap-2 border px-4 py-3 font-mono-tech text-xs transition hover:border-[var(--accent)]"
                style={{
                  borderRadius: "var(--radius-pill)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>CLI Shell</span>
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-10 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {PROFILE_CONFIG.stats.map((stat) => (
                <div key={stat.value + stat.label.en}>
                  <div className="font-display text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </div>
                  <div
                    className="mt-1 text-xs leading-snug"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label[locale]}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive Reality Engine Console */}
          <motion.div
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5"
          >
            <div className="reality-card hud-frame p-5 sm:p-6">
              <div
                className="flex items-center justify-between border-b pb-3.5"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div>
                  <div
                    className="font-mono-tech text-[10px] tracking-widest uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {locale === "id"
                      ? "VISUAL REALITY ENGINE // LIVE SWITCH"
                      : "VISUAL REALITY ENGINE // LIVE SWITCH"}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold">
                    {locale === "id"
                      ? "Coba & Ganti Nuansa Visual Seketika"
                      : "Switch Visual Architecture Instantly"}
                  </div>
                </div>
                <span className="rounded px-2 py-1 font-mono-tech text-[10px]"
                  style={{
                    backgroundColor: "var(--bg-pill)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {mode === "clarity"
                    ? "CLEAN MODE"
                    : webglActive
                      ? `${fpsEstimate} FPS`
                      : "2D"}
                </span>
              </div>

              {/* 3 Interactive Visual Mode Cards */}
              <div className="mt-4 space-y-2">
                {quickModes.map(({ id, icon: Icon }) => {
                  const meta = VISUAL_MODE_META[id];
                  const active = mode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMode(id)}
                      className="flex w-full items-center justify-between border p-3 text-left transition-all duration-200"
                      style={{
                        borderRadius: mode === "hud" ? "4px" : "12px",
                        borderColor: active
                          ? "var(--accent)"
                          : "var(--border-subtle)",
                        backgroundColor: active
                          ? "var(--bg-pill)"
                          : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: active
                              ? "var(--accent)"
                              : "var(--bg-pill)",
                            color: active
                              ? "var(--accent-contrast)"
                              : "var(--accent)",
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
                            <span className="font-mono-tech text-[10px] opacity-65">
                              {meta.code}
                            </span>
                            <span>{meta.name}</span>
                          </div>
                          <div
                            className="text-[11px]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {meta.tagline[locale]}
                          </div>
                        </div>
                      </div>
                      <span
                        className="font-mono-tech text-[10px] uppercase"
                        style={{
                          color: active ? "var(--accent)" : "var(--text-muted)",
                        }}
                      >
                        {active
                          ? locale === "id"
                            ? "AKTIF"
                            : "ACTIVE"
                          : `[${meta.code.replace("0", "")}]`}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Direct Flagship Launchers */}
              <div
                className="mt-5 border-t pt-4"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div
                  className="mb-2.5 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="font-mono-tech text-[10px] tracking-wider uppercase">
                    {locale === "id"
                      ? "Pilihan Terbaik (Pinned)"
                      : "Pinned Top Picks"}
                  </span>
                  <span>0ms Modal Morph</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickProjects.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => openProject(p.slug)}
                      className="group flex items-center justify-between border px-3 py-2 text-left text-xs transition hover:border-[var(--accent)]"
                      style={{
                        borderRadius: mode === "hud" ? "4px" : "10px",
                        borderColor: "var(--border-subtle)",
                        backgroundColor: "var(--bg-surface)",
                      }}
                    >
                      <span className="flex items-center gap-2 truncate font-medium">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: p.accentHex }}
                        />
                        <span className="truncate">{p.repoName}</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seamless Tech Stack Marquee */}
        <div
          className="mt-12 overflow-hidden border-y py-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div className="animate-marquee flex w-max items-center gap-8 font-mono-tech text-xs tracking-wider uppercase">
            {[...MARQUEE_STACK, ...MARQUEE_STACK].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="flex items-center gap-3 whitespace-nowrap"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
