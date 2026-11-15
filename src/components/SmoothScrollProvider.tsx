"use client";

import React, { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

/**
 * Provides reduced-motion preferences and ensures clean top-scroll alignment
 * when transitioning between scrolling showcase modes and OS dashboard modes,
 * while keeping 100% native browser wheel & touch scrolling active everywhere.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = usePortfolio();

  useEffect(() => {
    // Ensure any stale Lenis classes/overflow styles are never left on <html>
    document.documentElement.classList.remove(
      "lenis",
      "lenis-smooth",
      "lenis-stopped",
      "lenis-autoToggle"
    );
    document.documentElement.style.removeProperty("overflow");

    if (mode === "windows" || mode === "ps5") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [mode]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
