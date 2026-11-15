import { ProfileConfig } from "@/types/portfolio";

/**
 * Centralized Owner & Portfolio Identity Config.
 * Edit this single file to customize name, bio, links, or capabilities.
 */
export const PROFILE_CONFIG: ProfileConfig = {
  handle: "jajangking",
  displayName: "Jajang",
  monogram: "JJK",
  avatarUrl: "https://avatars.githubusercontent.com/u/52798458?v=4",
  location: "Jakarta, Indonesia",
  email: "hello@jajangking.dev",
  githubUrl: "https://github.com/jajangking",
  headline: {
    id: "Merancang Sistem Cerdas, Engine 3D, & Produk Digital Tanpa Batas.",
    en: "Engineering Intelligent Systems, 3D Engines & Borderless Digital Products.",
  },
  subheadline: {
    id: "Full-Stack & Creative Systems Engineer yang membangun mulai dari Rust terminal emulator, simulasi fisika WebGL & neural driving, edge-AI robotik di Android, hingga aplikasi web produksi.",
    en: "Full-Stack & Creative Systems Engineer building across Rust terminal cores, WebGL physics & neural driving simulations, on-device edge AI robotics, and production web platforms.",
  },
  availability: {
    id: "Open for Flagship Builds · Jakarta / Remote",
    en: "Open for Flagship Builds · Jakarta / Remote",
  },
  manifesto: {
    id: "Setiap proyek di sini dibangun dengan obsesi pada performa mentah, kontrol arsitektur penuh, dan pengalaman pengguna yang mulus—dari bare-metal ESP32 hingga shader WebGL di browser.",
    en: "Every project here is built with an obsession for raw performance, full architectural control, and frictionless UX—from bare-metal ESP32 firmware to real-time WebGL shaders.",
  },
  stats: [
    {
      value: "54+",
      label: { id: "Repositori Publik GitHub", en: "Public GitHub Repositories" },
    },
    {
      value: "16",
      label: { id: "Live Deploy di Vercel", en: "Live Vercel Deployments" },
    },
    {
      value: "14",
      label: { id: "Flagship Multi-Disiplin", en: "Multi-Discipline Flagships" },
    },
    {
      value: "6",
      label: { id: "Runtime: Web · Rust · ARM64", en: "Runtimes: Web · Rust · ARM64" },
    },
  ],
  pillars: [
    {
      id: "webgl-sim",
      code: "01 // 3D & SIMULATION",
      title: {
        id: "WebGL, GLSL & Simulasi Fisika",
        en: "WebGL, GLSL & Physics Simulation",
      },
      subtitle: {
        id: "Three.js · Rapier3D · Neural Evolution",
        en: "Three.js · Rapier3D · Neural Evolution",
      },
      description: {
        id: "Membangun simulasi kendaraan rally raycast real-time, neural network otonom berbasis genetic algorithm tanpa library ML, hingga shader interaktif 60fps.",
        en: "Building real-time raycast rally vehicle physics, zero-dependency genetic autonomous driving networks, and 60fps reactive GLSL shaders.",
      },
      tools: ["Three.js", "GLSL Shaders", "Rapier3D WASM", "TypeScript", "Canvas 2D/WebGL2"],
      linkedProjects: ["neural-driving", "rallycross"],
    },
    {
      id: "edge-ai",
      code: "02 // EDGE AI & VISION",
      title: {
        id: "On-Device VLM, Robotics & Multimodal AI",
        en: "On-Device VLM, Robotics & Multimodal AI",
      },
      subtitle: {
        id: "llama.cpp · TensorFlow.js · Groq · Gemini",
        en: "llama.cpp · TensorFlow.js · Groq · Gemini",
      },
      description: {
        id: "Menjalankan model Vision-Language lokal (LFM2.5-VL & Gemma 4 E2B) langsung di HP Android ARM64 untuk kontrol robot ESP32-S3-CAM, plus web multimodal AI & TTS Indonesia.",
        en: "Running local Vision-Language Models (LFM2.5-VL & Gemma 4 E2B) directly on Android ARM64 to guide ESP32-S3-CAM robots, alongside multimodal web AI and Indonesian TTS.",
      },
      tools: ["llama.cpp ARM64", "LFM2.5-VL / Gemma 4", "MediaPipe / ONNX", "Groq SDK", "Gemini TTS"],
      linkedProjects: ["robot-vision-ai", "keinarra-vision", "gemma4-vision", "asisten", "tts-api-indonesia"],
    },
    {
      id: "systems-rust",
      code: "03 // SYSTEMS & ANDROID",
      title: {
        id: "Rust Core, Android Native & Otomasi",
        en: "Rust Core, Android Native & Automation",
      },
      subtitle: {
        id: "Rust · Kotlin/Compose · JNI · Python CLI",
        en: "Rust · Kotlin/Compose · JNI · Python CLI",
      },
      description: {
        id: "Merakit terminal Android workspace-first dari nol dengan engine Rust + JNI, daemon remote WiFi tanpa root, layanan TTS notifikasi, hingga pipeline render video GSAP+FFmpeg.",
        en: "Engineering a workspace-first Android terminal from scratch in Rust + JNI, rootless WiFi HID daemons, TTS notification listeners, and automated GSAP+FFmpeg video pipelines.",
      },
      tools: ["Rust", "Kotlin / Jetpack Compose", "JNI Bridge", "Android SDK", "GSAP + FFmpeg"],
      linkedProjects: ["mterm", "remote-proyektor", "hyperframes-pensil"],
    },
    {
      id: "fullstack-iot",
      code: "04 // FULL-STACK & IOT",
      title: {
        id: "Next.js Cloud Apps & Embedded Hardware",
        en: "Next.js Cloud Apps & Embedded Hardware",
      },
      subtitle: {
        id: "Next.js 16 · Expo BLE · ESP32 · Firebase",
        en: "Next.js 16 · Expo BLE · ESP32 · Firebase",
      },
      description: {
        id: "Menjembatani produk web modern (Next.js, Firebase, SQLite) dengan hardware fisik ESP32 melalui WiFi & Bluetooth Low Energy untuk otomasi kendaraan dan manajemen bisnis.",
        en: "Bridging modern web & mobile apps (Next.js, Firebase, Expo SQLite) with physical ESP32 hardware over WiFi & BLE for smart vehicle access and business workflows.",
      },
      tools: ["Next.js App Router", "React Native Expo", "ESP32 C++", "BLE / MQTT", "Firebase / Supabase"],
      linkedProjects: ["keyless-v2", "posman", "inventory", "motoringv"],
    },
  ],
};
