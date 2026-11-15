import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { WebGLStage } from "@/components/WebGLStage";
import { PrecisionCursor } from "@/components/PrecisionCursor";
import { NavbarAndModeDock } from "@/components/NavbarAndModeDock";
import { CommandPalette } from "@/components/CommandPalette";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { ProjectStageDrawer } from "@/components/sections/ProjectStageDrawer";

export const metadata: Metadata = {
  title: "Jajang (@jajangking) — Master Portfolio · Systems, 3D & Edge AI",
  description:
    "Interactive Multi-Reality Master Portfolio showcasing Rust systems, Three.js/Rapier3D simulations, on-device Edge AI robotics, ESP32 IoT & Next.js apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-mode="obsidian" suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-contrast)]">
        <PortfolioProvider>
          <SmoothScrollProvider>
            <WebGLStage />
            <PrecisionCursor />
            <NavbarAndModeDock />
            <CommandPalette />
            <InteractiveTerminal />
            <ProjectStageDrawer />
            <main className="relative z-10">{children}</main>
          </SmoothScrollProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
