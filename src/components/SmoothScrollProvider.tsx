"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { activeProject, isCommandOpen, isTerminalOpen } = usePortfolio();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause background smooth scroll whenever a modal / overlay is open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (activeProject || isCommandOpen || isTerminalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [activeProject, isCommandOpen, isTerminalOpen]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
