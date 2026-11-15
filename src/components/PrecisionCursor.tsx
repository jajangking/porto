"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

function subscribeCursorSupport(cb: () => void) {
  const m1 = window.matchMedia("(pointer: fine)");
  const m2 = window.matchMedia("(prefers-reduced-motion: reduce)");
  m1.addEventListener("change", cb);
  m2.addEventListener("change", cb);
  return () => {
    m1.removeEventListener("change", cb);
    m2.removeEventListener("change", cb);
  };
}

function getCursorSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function PrecisionCursor() {
  const { mode } = usePortfolio();
  const enabled = useSyncExternalStore(
    subscribeCursorSupport,
    getCursorSnapshot,
    () => false
  );
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 450, damping: 32, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, [data-interactive="true"]'
      );
      setIsHoveringInteractive(Boolean(interactive));
    };

    const onLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled || mode === "clarity" || mode === "windows" || mode === "ps5") {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isHoveringInteractive ? 1.55 : 1,
          rotate: mode === "hud" ? (isHoveringInteractive ? 45 : 0) : 0,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
        className="flex items-center justify-center transition-colors duration-300"
        style={{
          width: mode === "hud" ? 28 : 30,
          height: mode === "hud" ? 28 : 30,
          borderRadius: mode === "hud" ? "4px" : "9999px",
          border:
            mode === "obsidian"
              ? "1.5px solid rgba(129, 140, 248, 0.72)"
              : mode === "editorial"
                ? "1.5px solid rgba(17, 17, 19, 0.72)"
                : "1.5px solid rgba(16, 245, 168, 0.85)",
          backgroundColor: isHoveringInteractive
            ? mode === "editorial"
              ? "rgba(217, 78, 40, 0.14)"
              : mode === "hud"
                ? "rgba(16, 245, 168, 0.14)"
                : "rgba(99, 102, 241, 0.16)"
            : "transparent",
          boxShadow:
            mode === "obsidian"
              ? "0 0 18px rgba(34, 211, 238, 0.25)"
              : mode === "hud"
                ? "0 0 14px rgba(16, 245, 168, 0.25)"
                : "none",
        }}
      >
        <div
          className="h-1 w-1 rounded-full"
          style={{
            backgroundColor: "var(--accent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
