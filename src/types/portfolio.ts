export type VisualMode = "obsidian" | "editorial" | "hud" | "clarity" | "windows";

export type Locale = "id" | "en";

export type ProjectCategory =
  | "all"
  | "ai-vision"
  | "simulation-3d"
  | "systems-rust"
  | "iot-mobile"
  | "fullstack-web";

export type SimulationPreset =
  | "terminal-rust"
  | "neural-driving"
  | "rally-physics"
  | "robot-vision"
  | "pensil-motion"
  | "multimodal-ai"
  | "mediapipe-onnx"
  | "motoring-mobile"
  | "voice-tts"
  | "edge-vlm"
  | "esp32-keyless"
  | "android-daemon"
  | "pos-sqlite"
  | "cloud-inventory";

export interface BilingualText {
  id: string;
  en: string;
}

export interface ProjectMetric {
  label: BilingualText;
  value: string;
}

export interface ArchitectureNode {
  layer: string;
  title: string;
  detail: BilingualText;
}

export interface ProjectCaseStudy {
  slug: string;
  repoName: string;
  title: string;
  year: string;
  featured: boolean;
  category: Exclude<ProjectCategory, "all">;
  tagline: BilingualText;
  summary: BilingualText;
  challenge: BilingualText;
  architectureSummary: BilingualText;
  highlights: {
    id: string[];
    en: string[];
  };
  stack: string[];
  primaryLang: string;
  accentHex: string;
  simulationPreset: SimulationPreset;
  metrics: ProjectMetric[];
  architectureNodes: ArchitectureNode[];
  repoUrl?: string;
  liveUrl?: string;
  relatedDeploys?: Array<{
    name: string;
    url: string;
  }>;
  isPrivateRepo?: boolean;
}

export interface GitHubRepoItem {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  homepage: string | null;
  updatedAt: string;
  url: string;
  featuredSlug?: string;
}

export interface VercelDeploymentItem {
  id: string;
  name: string;
  liveUrl: string;
  framework: string;
  nodeVersion: string;
  region: string;
  readyState: "READY" | "PROMOTED_WITH_LATEST_ERROR";
  visibility: "public" | "private";
  githubRepo: string;
  repoUrl?: string;
  summary: BilingualText;
  latestCommitMessage: string;
  updatedAt: string;
  stack: string[];
  featuredSlug?: string;
}

export interface DisciplinePillar {
  id: string;
  code: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  tools: string[];
  linkedProjects: string[];
}

export interface ProfileConfig {
  handle: string;
  displayName: string;
  monogram: string;
  avatarUrl: string;
  location: string;
  email: string;
  githubUrl: string;
  headline: BilingualText;
  subheadline: BilingualText;
  availability: BilingualText;
  manifesto: BilingualText;
  stats: Array<{
    value: string;
    label: BilingualText;
  }>;
  pillars: DisciplinePillar[];
}
