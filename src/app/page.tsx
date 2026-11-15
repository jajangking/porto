import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { EngineeringMatrixSection } from "@/components/sections/EngineeringMatrixSection";
import { GitHubArchiveSection } from "@/components/sections/GitHubArchiveSection";
import { ContactFooterSection } from "@/components/sections/ContactFooterSection";

export default function HomePage() {
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
