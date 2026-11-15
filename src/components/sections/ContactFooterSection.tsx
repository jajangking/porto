"use client";

import React, { useState } from "react";
import { Check, Command, Copy, Mail, Terminal } from "lucide-react";
import { GitHubMark } from "@/components/icons/GitHubMark";
import { usePortfolio, VISUAL_MODE_META } from "@/context/PortfolioContext";
import { PROFILE_CONFIG } from "@/data/profile";

export function ContactFooterSection() {
  const { mode, locale, setCommandOpen, setTerminalOpen } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <footer id="contact" className="relative z-10 pt-10 pb-28 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reality-card hud-frame overflow-hidden p-7 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div
                className="font-mono-tech text-xs tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                04 // COLLABORATE &amp; BUILD
              </div>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                {locale === "id"
                  ? "Siap Merakit Proyek Ambisius Berikutnya?"
                  : "Ready to Architect the Next Flagship Build?"}
              </h2>
              <p
                className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {locale === "id"
                  ? "Terbuka untuk kolaborasi WebGL/3D interaktif, sistem Edge-AI, tooling Rust/Android, hingga aplikasi web Next.js berkecepatan tinggi."
                  : "Open for collaborations across interactive WebGL/3D experiences, edge-AI systems, Rust/Android tooling, and high-craft Next.js products."}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${PROFILE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition hover:opacity-90"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)",
                  }}
                >
                  <Mail className="h-4 w-4" />
                  <span>{locale === "id" ? "Kirim Email" : "Send Email"}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 border px-4 py-3 text-xs font-medium transition hover:border-[var(--accent)]"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  {copied ? (
                    <Check
                      className="h-3.5 w-3.5"
                      style={{ color: "var(--live-text)" }}
                    />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copied ? "Copied!" : PROFILE_CONFIG.email}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={PROFILE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border px-3.5 py-2 font-mono-tech text-xs transition hover:border-[var(--accent)]"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <GitHubMark className="h-3.5 w-3.5" />
                  <span>github.com/{PROFILE_CONFIG.handle}</span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 font-mono-tech text-[11px] sm:flex-row sm:items-center"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <div>
              © {new Date().getFullYear()} @{PROFILE_CONFIG.handle} ·{" "}
              {PROFILE_CONFIG.location} · Mode:{" "}
              <span className="text-[var(--text-primary)]">
                {VISUAL_MODE_META[mode].name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="inline-flex items-center gap-1 hover:text-[var(--text-primary)]"
              >
                <Command className="h-3 w-3" />
                <span>Command (⌘K)</span>
              </button>
              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                className="inline-flex items-center gap-1 hover:text-[var(--text-primary)]"
              >
                <Terminal className="h-3 w-3" />
                <span>CLI Shell</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
