"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal, X } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PROFILE_CONFIG } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "accent";
  text: string;
}

export function InteractiveTerminal() {
  const {
    isTerminalOpen,
    setTerminalOpen,
    mode,
    setMode,
    locale,
    openProject,
  } = usePortfolio();

  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      type: "accent",
      text: "mterm-web // jajangking master portfolio shell v1.0",
    },
    {
      id: 2,
      type: "output",
      text: "Ketik 'help' untuk daftar perintah (atau 'ls', 'open mterm', 'mode hud').",
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const pushLines = (entries: Omit<TerminalLine, "id">[]) => {
    setLines((prev) => {
      let nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      return [
        ...prev,
        ...entries.map((entry) => ({
          ...entry,
          id: nextId++,
        })),
      ];
    });
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    if (base === "clear" || base === "cls") {
      setLines([]);
      return;
    }

    const out: Omit<TerminalLine, "id">[] = [
      { type: "input", text: `jajangking@porto:~$ ${cmd}` },
    ];

    if (base === "help") {
      out.push(
        { type: "accent", text: "Available Commands:" },
        { type: "output", text: "  whoami                — Profile & engineering manifesto" },
        { type: "output", text: "  ls [category]         — List flagship projects & slugs" },
        { type: "output", text: "  open <slug>           — Launch seamless case study modal" },
        { type: "output", text: "  mode <obsidian|editorial|hud> — Switch Reality Engine" },
        { type: "output", text: "  stack                 — Core technical runtime stack" },
        { type: "output", text: "  clear                 — Clear terminal buffer" }
      );
    } else if (base === "whoami") {
      out.push(
        {
          type: "accent",
          text: `${PROFILE_CONFIG.displayName} (@${PROFILE_CONFIG.handle}) — ${PROFILE_CONFIG.location}`,
        },
        { type: "output", text: PROFILE_CONFIG.headline[locale] },
        { type: "output", text: `GitHub: ${PROFILE_CONFIG.githubUrl} (54+ public repos)` }
      );
    } else if (base === "ls" || base === "projects") {
      const list = arg
        ? PROJECTS.filter((p) => p.category.includes(arg) || p.slug.includes(arg))
        : PROJECTS;
      if (list.length === 0) {
        out.push({ type: "output", text: `No projects matching '${arg}'.` });
      } else {
        list.forEach((p) => {
          out.push({
            type: "output",
            text: `  [${p.slug.padEnd(18, " ")}] ${p.title} (${p.primaryLang})`,
          });
        });
      }
    } else if (base === "open") {
      const target = PROJECTS.find(
        (p) => p.slug === arg || p.repoName.toLowerCase() === arg
      );
      if (target) {
        out.push({
          type: "accent",
          text: `Opening case study stage for '${target.title}'...`,
        });
        setTerminalOpen(false);
        openProject(target.slug);
      } else {
        out.push({
          type: "output",
          text: `Project '${arg}' not found. Run 'ls' to inspect slugs.`,
        });
      }
    } else if (base === "mode") {
      if (arg === "obsidian" || arg === "editorial" || arg === "hud") {
        setMode(arg);
        out.push({
          type: "accent",
          text: `Reality engine switched → ${arg.toUpperCase()}`,
        });
      } else {
        out.push({
          type: "output",
          text: `Current mode: ${mode}. Usage: mode obsidian | editorial | hud`,
        });
      }
    } else if (base === "stack") {
      out.push(
        { type: "accent", text: "Core Engineering Stack:" },
        { type: "output", text: "  Web & 3D   : Next.js 16, TypeScript, Three.js GLSL, Rapier3D WASM, Framer Motion" },
        { type: "output", text: "  Systems    : Rust, Kotlin/Compose, JNI, Android SDK, Termux ARM64" },
        { type: "output", text: "  Edge AI    : llama.cpp, LFM2.5-VL, Gemma 4, TensorFlow.js, Groq, Gemini TTS" },
        { type: "output", text: "  Hardware   : ESP32-S3-CAM, BLE, Dual Relay IoT, React Native Expo" }
      );
    } else {
      out.push({
        type: "output",
        text: `Command not found: '${cmd}'. Type 'help' for commands.`,
      });
    }

    pushLines(out);
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-emerald-400/30 bg-[#050A0E] font-mono-tech text-xs text-slate-200 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal className="h-3.5 w-3.5" />
                <span>jajangking@porto — Interactive Shell</span>
              </div>
              <button
                type="button"
                onClick={() => setTerminalOpen(false)}
                className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close Terminal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Output Buffer */}
            <div className="h-80 overflow-y-auto p-4 space-y-1.5">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={
                    line.type === "input"
                      ? "text-sky-300"
                      : line.type === "accent"
                        ? "text-emerald-400 font-semibold"
                        : "text-slate-300"
                  }
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Hint Chips */}
            <div className="flex flex-wrap gap-1.5 border-t border-white/10 bg-white/[0.02] px-4 py-2">
              {["help", "ls", "open mterm", "mode editorial", "mode hud", "mode obsidian"].map(
                (sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => runCommand(sample)}
                    className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-300 transition hover:border-emerald-400/50 hover:text-emerald-300"
                  >
                    {sample}
                  </button>
                )
              )}
            </div>

            {/* Prompt Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(input);
                setInput("");
              }}
              className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
            >
              <span className="text-emerald-400">jajangking@porto:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type command..."
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
