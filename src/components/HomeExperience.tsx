"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { EngineeringMatrixSection } from "@/components/sections/EngineeringMatrixSection";
import { GitHubArchiveSection } from "@/components/sections/GitHubArchiveSection";
import { ContactFooterSection } from "@/components/sections/ContactFooterSection";
import { WindowsDesktopView } from "@/components/WindowsDesktopView";
import { Ps5CatalogView } from "@/components/Ps5CatalogView";

export function HomeExperience() {
  const { mode } = usePortfolio();

  if (mode === "windows") {
    return <WindowsDesktopView />;
  }

  if (mode === "ps5") {
    return <Ps5CatalogView />;
  }

  return (
    <>
      <HeroSection />
      <ProjectShowcaseSection />
      <EngineeringMatrixSection />
      <GitHubArchiveSection />
      <ContactFooterSection />
    </>
  );
}
