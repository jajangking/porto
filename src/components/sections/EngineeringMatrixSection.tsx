"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Radio, TerminalSquare } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROFILE_CONFIG } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

const PILLAR_ICONS = [Layers, Cpu, TerminalSquare, Radio];

export function EngineeringMatrixSection() {
  const { locale, openProject } = usePortfolio();

  return (
    <section id="engineering" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div
            className="font-mono-tech text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            02 // SYSTEMS &amp; CAPABILITY MATRIX
          </div>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            {locale === "id"
              ? "Spektrum Penuh: Hardware hingga Shader 3D"
              : "Full-Spectrum: From Bare Hardware to 3D Shaders"}
          </h2>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {PROFILE_CONFIG.manifesto[locale]}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROFILE_CONFIG.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            const linked = pillar.linkedProjects
              .map((slug) => PROJECTS.find((p) => p.slug === slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));

            return (
              <motion.div
                key={pillar.id}
                initial={{ y: 12 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="reality-card hud-frame flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="font-mono-tech text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--accent)" }}
                      >
                        {pillar.code}
                      </div>
                      <h3 className="font-display mt-1.5 text-xl font-bold sm:text-2xl">
                        {pillar.title[locale]}
                      </h3>
                      <div
                        className="mt-0.5 font-mono-tech text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {pillar.subtitle[locale]}
                      </div>
                    </div>
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: "var(--bg-pill)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {pillar.description[locale]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {pillar.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border px-2.5 py-1 font-mono-tech text-[11px]"
                        style={{
                          borderRadius: "var(--radius-pill)",
                          borderColor: "var(--border-subtle)",
                          backgroundColor: "var(--bg-pill)",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Linked Case Studies */}
                <div
                  className="mt-6 border-t pt-4"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <div
                    className="mb-2 font-mono-tech text-[10px] uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {locale === "id" ? "Proyek Terkait" : "Proven In Production"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {linked.map((proj) => (
                      <button
                        key={proj.slug}
                        type="button"
                        onClick={() => openProject(proj.slug)}
                        className="inline-flex items-center gap-1.5 border px-3 py-1 text-xs font-medium transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        style={{
                          borderRadius: "var(--radius-pill)",
                          borderColor: "var(--border-subtle)",
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: proj.accentHex }}
                        />
                        <span>{proj.repoName}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
