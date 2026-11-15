"use client";

import React, { useEffect, useRef, useState } from "react";
import { SimulationPreset } from "@/types/portfolio";

interface ProjectVisualPreviewProps {
  preset: SimulationPreset;
  accentHex: string;
  interactive?: boolean;
  className?: string;
}

/**
 * Interactive procedural engineering preview tailored to each project domain.
 * Renders crisp live Canvas / SVG schematics on project cards and inside Case Study Stage.
 */
export function ProjectVisualPreview({
  preset,
  accentHex,
  interactive = false,
  className = "",
}: ProjectVisualPreviewProps) {
  const [relayIgnition, setRelayIgnition] = useState(true);
  const [relayStarter, setRelayStarter] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);
  const [generation, setGeneration] = useState(42);
  const [liters, setLiters] = useState(4.25);

  if (preset === "mediapipe-onnx") {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(236,72,153,0.18), transparent 58%), rgba(10, 10, 18, 0.94)",
          color: "#FCE7F3",
        }}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 text-pink-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
            KEINARRA // MEDIAPIPE + ONNX
          </span>
          <span className="rounded border border-pink-400/30 bg-pink-500/15 px-1.5 py-0.5 text-[9px]">
            WASM + WEBGL
          </span>
        </div>

        <div className="relative my-2 flex-1 rounded border border-pink-400/20 bg-black/45 p-2">
          <svg viewBox="0 0 260 110" className="h-full w-full">
            {/* Hand/Pose keypoint wireframe */}
            <circle cx="80" cy="54" r="24" fill="none" stroke="rgba(236,72,153,0.45)" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="80" y1="30" x2="80" y2="78" stroke="rgba(236,72,153,0.35)" strokeWidth="1" />
            <line x1="56" y1="54" x2="104" y2="54" stroke="rgba(236,72,153,0.35)" strokeWidth="1" />
            {[
              [80, 38],
              [68, 50],
              [92, 50],
              [72, 66],
              [88, 66],
              [172, 36],
              [194, 48],
              [184, 72],
            ].map(([cx, cy], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r="2.8"
                fill={idx < 5 ? "#F472B6" : "#38BDF8"}
              />
            ))}
            <path
              d="M 172 36 L 194 48 L 184 72 Z"
              fill="rgba(56,189,248,0.12)"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />
            <text x="148" y="22" fill="#7DD3FC" fontSize="8" fontFamily="monospace">
              KNN CLASS: GESTURE_OK
            </text>
            <text x="148" y="96" fill="#F9A8D4" fontSize="8" fontFamily="monospace">
              MQTT: hivemq/teleop
            </text>
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] text-pink-200/75">
          <span>TF.js COCO-SSD · Groq Overlay</span>
          <span>Live on Vercel</span>
        </div>
      </div>
    );
  }

  if (preset === "motoring-mobile") {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
        style={{
          background:
            "radial-gradient(circle at 75% 20%, rgba(245,158,11,0.18), transparent 58%), rgba(12, 11, 9, 0.94)",
          color: "#FEF3C7",
        }}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-amber-300">MOTORINGV // MOBILE SAFE-AREA</span>
          <span className="rounded border border-amber-400/30 bg-amber-500/15 px-1.5 py-0.5 text-[9px]">
            PRIVATE REPO
          </span>
        </div>

        <div className="my-auto grid grid-cols-2 gap-2 py-2 text-[10px]">
          <div className="rounded border border-white/10 bg-white/[0.04] p-2.5">
            <div className="text-[9px] text-white/50">FUEL FILL LOG</div>
            <div className="mt-1 text-base font-bold text-amber-300">
              {liters.toFixed(2)} L
            </div>
            <div className="text-[9px] text-emerald-400">~46.8 km/L AVG</div>
          </div>
          <div className="rounded border border-white/10 bg-white/[0.04] p-2.5">
            <div className="text-[9px] text-white/50">NEXT SERVICE</div>
            <div className="mt-1 text-base font-bold text-white">18,450 km</div>
            <div className="text-[9px] text-amber-200/70">16px Anti-Zoom UI</div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/60">
          <span>Next.js Turbopack · Groq Care</span>
          {interactive ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLiters((l) => (l >= 6 ? 3.5 : Number((l + 0.75).toFixed(2))));
              }}
              className="rounded border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[9px] text-amber-200 hover:bg-amber-500/30"
            >
              +0.75 L TEST
            </button>
          ) : (
            <span>Vercel Live</span>
          )}
        </div>
      </div>
    );
  }

  if (preset === "neural-driving") {
    return (
      <NeuralDrivingCanvas
        accentHex={accentHex}
        interactive={interactive}
        generation={generation}
        onNextGen={() => setGeneration((g) => g + 1)}
        className={className}
      />
    );
  }

  if (preset === "rally-physics") {
    return (
      <RallyPhysicsCanvas
        accentHex={accentHex}
        interactive={interactive}
        className={className}
      />
    );
  }

  if (preset === "terminal-rust") {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(249,115,22,0.16), transparent 55%), rgba(9, 11, 18, 0.92)",
          color: "#E5E7EB",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            <span className="h-2 w-2 rounded-full bg-amber-300/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 text-[10px] tracking-wider text-orange-300/90">
              mterm // rust-pty@aarch64
            </span>
          </div>
          <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[9px] text-orange-300">
            JNI 0.4ms
          </span>
        </div>

        <div className="my-auto space-y-1.5 py-2 leading-relaxed">
          <p className="text-emerald-400">
            ~/porto <span className="text-sky-400">git:(arena)</span>{" "}
            <span className="text-white/90">cargo check --release</span>
          </p>
          <p className="text-white/60">
            [vt-grid] 144x42 cells · 0 allocations/frame
          </p>
          <p className="text-orange-300/90">
            [agent-ready] bun 1.2 · node 22 · git status live
          </p>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-white/70">
            <span className="rounded border border-white/15 bg-white/5 px-2 py-0.5">
              RUST CORE
            </span>
            <span>→</span>
            <span className="rounded border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 text-orange-200">
              JNI BRIDGE
            </span>
            <span>→</span>
            <span className="rounded border border-white/15 bg-white/5 px-2 py-0.5">
              COMPOSE UI
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/50">
          <span>RAM: 14.2 MB</span>
          <span>PID Guard: Active</span>
        </div>
      </div>
    );
  }

  if (preset === "robot-vision") {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
        style={{
          background:
            "radial-gradient(circle at 25% 25%, rgba(16,245,168,0.16), transparent 60%), rgba(4, 12, 16, 0.94)",
          color: "#D1FAE5",
        }}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            ESP32-S3-CAM // 640x480
          </span>
          <span className="rounded border border-emerald-400/30 bg-emerald-500/15 px-1.5 py-0.5 text-[9px]">
            LFM2.5-VL-450M
          </span>
        </div>

        <div className="relative my-2 flex-1 rounded border border-emerald-400/20 bg-black/40 p-2">
          <svg viewBox="0 0 260 110" className="h-full w-full">
            <defs>
              <pattern
                id="rv-grid"
                width="18"
                height="18"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 18 0 L 0 0 0 18"
                  fill="none"
                  stroke="rgba(16,245,168,0.12)"
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>
            <rect width="260" height="110" fill="url(#rv-grid)" />
            {/* Target bounding box 1 */}
            <rect
              x="44"
              y="20"
              width="76"
              height="62"
              fill="rgba(16,245,168,0.08)"
              stroke="#10F5A8"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x="48" y="16" fill="#10F5A8" fontSize="8" fontFamily="monospace">
              OBSTACLE [0.94]
            </text>
            {/* Target bounding box 2 */}
            <rect
              x="156"
              y="34"
              width="66"
              height="52"
              fill="rgba(0,216,255,0.08)"
              stroke="#00D8FF"
              strokeWidth="1.5"
            />
            <text x="158" y="29" fill="#00D8FF" fontSize="8" fontFamily="monospace">
              TARGET PATH [0.91]
            </text>
            {/* Steering vector */}
            <path
              d="M 130 105 Q 145 75 186 58"
              fill="none"
              stroke="#10F5A8"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="186" cy="58" r="3.5" fill="#10F5A8" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] text-emerald-200/70">
          <span>llama-mtmd-cli: ARM64 Q4_K_M</span>
          <span>2WD: STEER +18°</span>
        </div>
      </div>
    );
  }

  if (preset === "esp32-keyless") {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
        style={{
          background:
            "radial-gradient(circle at 75% 25%, rgba(234,179,8,0.16), transparent 60%), rgba(12, 13, 18, 0.94)",
          color: "#FEF3C7",
        }}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-amber-300">ESP32 // BLE + WiFi ACCESS</span>
          <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[9px]">
            8-LED TELEMETRY
          </span>
        </div>

        <div className="my-auto space-y-2.5 py-2">
          {/* 8 LED array */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 8 }).map((_, idx) => {
              const lit =
                idx < (relayStarter ? 8 : relayIgnition ? 5 : 2);
              return (
                <span
                  key={idx}
                  className="h-2.5 flex-1 rounded-sm transition-all duration-300"
                  style={{
                    backgroundColor: lit
                      ? idx > 5
                        ? "#22C55E"
                        : "#FACC15"
                      : "rgba(255,255,255,0.1)",
                    boxShadow: lit ? "0 0 8px rgba(250,204,21,0.55)" : "none",
                  }}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <button
              type="button"
              onClick={
                interactive
                  ? (e) => {
                      e.stopPropagation();
                      setRelayIgnition((v) => !v);
                    }
                  : undefined
              }
              className="rounded border border-white/15 bg-white/5 px-2.5 py-2 text-left transition hover:border-amber-400/50"
            >
              <div className="text-[9px] text-white/50">RELAY 01 · KONTAK</div>
              <div className="mt-0.5 font-semibold text-amber-300">
                {relayIgnition ? "ON · 1x PRESS" : "STANDBY"}
              </div>
            </button>
            <button
              type="button"
              onClick={
                interactive
                  ? (e) => {
                      e.stopPropagation();
                      setRelayStarter((v) => !v);
                    }
                  : undefined
              }
              className="rounded border border-white/15 bg-white/5 px-2.5 py-2 text-left transition hover:border-emerald-400/50"
            >
              <div className="text-[9px] text-white/50">RELAY 02 · STARTER</div>
              <div className="mt-0.5 font-semibold text-emerald-300">
                {relayStarter ? "CRANKING · 2x" : "READY"}
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/55">
          <span>AutoKey Expo BLE</span>
          <span>{interactive ? "Click relays to test" : "Dual Fail-Safe"}</span>
        </div>
      </div>
    );
  }

  if (preset === "voice-tts" || preset === "pensil-motion") {
    const bars = [26, 48, 72, 42, 86, 60, 92, 54, 78, 38, 66, 84, 48, 32, 62, 76];
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
        style={{
          background: `radial-gradient(circle at 25% 20%, ${accentHex}26, transparent 60%), rgba(10, 12, 20, 0.94)`,
          color: "#F8FAFC",
        }}
      >
        <div className="flex items-center justify-between text-[10px]">
          <span style={{ color: accentHex }}>
            {preset === "voice-tts"
              ? "GEMINI TTS // ID-ID WAV"
              : "PENSIL // GSAP + FFMPEG"}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setVoiceActive((v) => !v);
              }}
              className="rounded border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] hover:bg-white/20"
            >
              {voiceActive ? "PAUSE WAVE" : "PLAY WAVE"}
            </button>
          )}
        </div>

        <div className="my-auto flex h-20 items-end justify-between gap-1 px-1">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-full rounded-t transition-all duration-500"
              style={{
                height: `${voiceActive ? height : 18}%`,
                backgroundColor: accentHex,
                opacity: 0.4 + (i % 4) * 0.16,
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/60">
          <span>
            {preset === "voice-tts"
              ? "Fallback: 3.8 → 2.5 Flash/Pro"
              : "Word Sync → Follow-Cam → Mux"}
          </span>
          <span>0 External Deps</span>
        </div>
      </div>
    );
  }

  // Unified rich schematic fallback for multimodal-ai, edge-vlm, android-daemon, pos-sqlite, cloud-inventory
  const schematicMap: Record<
    string,
    { header: string; nodes: [string, string, string]; footer: string }
  > = {
    "multimodal-ai": {
      header: "GROQ VISION + TF.JS CLIENT NETS",
      nodes: ["COCO-SSD / HANDPOSE", "GROQ LLAMA3 VISION", "ESP32 ACTUATOR"],
      footer: "Hybrid Edge + Cloud · Live Vercel",
    },
    "edge-vlm": {
      header: "GEMMA 4 E2B // ARM64 LOCAL",
      nodes: ["IMAGE TOKENS", "LLAMA.CPP SERVER", "WEB UI + CLI"],
      footer: "Offline Smartphone Inference",
    },
    "android-daemon": {
      header: "TVREMOTE.APK // PORT 9877",
      nodes: ["TOUCHPAD / D-PAD", "WIFI SOCKET :9877", "ROOTLESS DAEMON"],
      footer: "Android 11 TV + NotifBaca LE Audio",
    },
    "pos-sqlite": {
      header: "POSMAN // EXPO OFFLINE POS",
      nodes: ["BARCODE SCANNER", "SQLITE LEDGER", "RECEIPT PRINTER"],
      footer: "Role Guard · Stock Opname",
    },
    "cloud-inventory": {
      header: "INVENTORY // FIREBASE SPARK",
      nodes: ["GOOGLE SIGN-IN", "FIRESTORE + PHOTO", "CSV / JSON EXPORT"],
      footer: "Live Web Suite · $0 Infra",
    },
  };

  const cfg = schematicMap[preset] ?? schematicMap["cloud-inventory"];

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[11px] ${className}`}
      style={{
        background: `radial-gradient(circle at 80% 15%, ${accentHex}28, transparent 58%), rgba(9, 12, 20, 0.92)`,
        color: "#F1F5F9",
      }}
    >
      <div className="flex items-center justify-between text-[10px]">
        <span style={{ color: accentHex }}>{cfg.header}</span>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentHex }} />
      </div>

      <div className="my-auto space-y-2 py-2">
        {cfg.nodes.map((node, index) => (
          <div
            key={node}
            className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
          >
            <span className="text-[10px] tracking-wide text-white/90">{node}</span>
            <span className="text-[9px] text-white/45">0{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/55">
        <span>{cfg.footer}</span>
        <span>READY</span>
      </div>
    </div>
  );
}

function NeuralDrivingCanvas({
  accentHex,
  interactive,
  generation,
  onNextGen,
  className,
}: {
  accentHex: string;
  interactive: boolean;
  generation: number;
  onNextGen: () => void;
  className: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const render = () => {
      raf = requestAnimationFrame(render);
      t += 0.025;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#080D18";
      ctx.fillRect(0, 0, w, h);

      // Curved track loop
      ctx.strokeStyle = "rgba(148,163,184,0.22)";
      ctx.lineWidth = 34;
      ctx.beginPath();
      ctx.ellipse(w * 0.5, h * 0.52, w * 0.34, h * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(56,189,248,0.25)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(w * 0.5, h * 0.52, w * 0.34, h * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Simulate 3 autonomous cars with raycast sensors
      for (let c = 0; c < 3; c++) {
        const angle = t * (c === 0 ? 1 : 0.92 - c * 0.08) + c * 1.4;
        const cx = w * 0.5 + Math.cos(angle) * w * 0.34;
        const cy = h * 0.52 + Math.sin(angle) * h * 0.3;
        const heading = angle + Math.PI / 2;

        // Raycast cones on leader car
        if (c === 0) {
          for (let r = -2; r <= 2; r++) {
            const rayAngle = heading + r * 0.32;
            const len = 34 - Math.abs(r) * 4;
            ctx.strokeStyle = "rgba(56,189,248,0.55)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(rayAngle) * len, cy + Math.sin(rayAngle) * len);
            ctx.stroke();
          }
        }

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(heading);
        ctx.fillStyle = c === 0 ? accentHex : "rgba(148,163,184,0.45)";
        ctx.fillRect(-7, -4, 14, 8);
        ctx.restore();
      }
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [accentHex, generation]);

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#080D18] p-3 font-mono-tech text-[10px] text-sky-200 ${className}`}
    >
      <div className="z-10 flex items-center justify-between">
        <span>NEURAL-DRIVING // GEN #{generation}</span>
        {interactive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNextGen();
            }}
            className="rounded border border-sky-400/40 bg-sky-500/15 px-2 py-0.5 text-[9px] text-sky-200 hover:bg-sky-500/30"
          >
            EVOLVE GEN +1
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={160}
        className="my-auto h-full w-full rounded"
      />
      <div className="z-10 flex items-center justify-between text-sky-300/70">
        <span>5 Ray Sensors · MLP 5→6→3</span>
        <span>0 ML Deps</span>
      </div>
    </div>
  );
}

function RallyPhysicsCanvas({
  accentHex,
  interactive,
  className,
}: {
  accentHex: string;
  interactive: boolean;
  className: string;
}) {
  const [driftAngle, setDriftAngle] = useState(22);

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-4 font-mono-tech text-[10px] ${className}`}
      style={{
        background: `radial-gradient(circle at 25% 25%, ${accentHex}28, transparent 60%), #0B0A14`,
        color: "#E9D5FF",
      }}
    >
      <div className="flex items-center justify-between">
        <span style={{ color: accentHex }}>RALLYCROSS // RAPIER3D RAYCAST</span>
        {interactive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDriftAngle((a) => (a === 22 ? 38 : a === 38 ? 12 : 22));
            }}
            className="rounded border border-purple-400/40 bg-purple-500/15 px-2 py-0.5 text-[9px] hover:bg-purple-500/30"
          >
            CYCLE SLIP ({driftAngle}°)
          </button>
        )}
      </div>

      <svg viewBox="0 0 260 110" className="my-auto h-28 w-full">
        {/* Skid marks */}
        <path
          d={`M 20 85 Q 95 75 ${150 + driftAngle * 0.5} 45`}
          fill="none"
          stroke="rgba(168,85,247,0.38)"
          strokeWidth="5"
          strokeDasharray="6 3"
        />
        <path
          d={`M 32 95 Q 105 84 ${162 + driftAngle * 0.5} 54`}
          fill="none"
          stroke="rgba(168,85,247,0.28)"
          strokeWidth="5"
          strokeDasharray="6 3"
        />
        {/* 4-wheel suspension chassis telemetry */}
        <g transform={`translate(155, 50) rotate(${-driftAngle})`}>
          <rect
            x="-26"
            y="-14"
            width="52"
            height="28"
            rx="4"
            fill="rgba(168,85,247,0.2)"
            stroke="#C084FC"
            strokeWidth="1.5"
          />
          <rect x="-22" y="-19" width="12" height="5" fill="#E9D5FF" />
          <rect x="10" y="-19" width="12" height="5" fill="#E9D5FF" />
          <rect x="-22" y="14" width="12" height="5" fill="#E9D5FF" />
          <rect x="10" y="14" width="12" height="5" fill="#E9D5FF" />
        </g>
        <text x="14" y="20" fill="#D8B4FE" fontSize="8">
          SUSPENSION COMPRESSION: FL 64% · RR 82%
        </text>
      </svg>

      <div className="flex items-center justify-between text-purple-200/70">
        <span>Tire Slip: {driftAngle}° · Loose Gravel</span>
        <span>Three.js + Rapier WASM</span>
      </div>
    </div>
  );
}
