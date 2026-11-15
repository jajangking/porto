import { ProjectCaseStudy } from "@/types/portfolio";

/**
 * Curated Flagship Showcase derived directly from github.com/jajangking repositories.
 * Add, reorder, or refine entries here to update the master portfolio showcase.
 */
export const PROJECTS: ProjectCaseStudy[] = [
  {
    slug: "mterm",
    repoName: "mterm",
    title: "mterm — Rust-Core Android Terminal",
    year: "2026",
    featured: true,
    category: "systems-rust",
    tagline: {
      id: "Terminal Android modern workspace-first & agent-ready dengan core Rust murni + Kotlin Compose.",
      en: "Modern workspace-first & agent-ready Android terminal built from scratch with a pure Rust core + Kotlin Compose.",
    },
    summary: {
      id: "Dibangun dari nol bukan sebagai fork Termux: memisahkan engine emulator terminal berkinerja tinggi di Rust, JNI bridge yang aman, dan antarmuka modern Kotlin/Jetpack Compose yang langsung membaca status git serta skrip proyek.",
      en: "Built from scratch rather than forking Termux: pairing a low-overhead Rust terminal emulator core, clean JNI bridge, and Jetpack Compose UI with built-in git workspace awareness and AI agent runtime profiles.",
    },
    challenge: {
      id: "Emulator terminal Android konvensional masih memakai renderer Java + Spannable yang boros memori, lambat saat output log masif, dan memaksa developer mengetik 'cd' manual berulang tanpa konteks workspace.",
      en: "Conventional Android terminal emulators rely on heavy Java + Spannable rendering that drains RAM on high-throughput streams and lacks native project workspace awareness or agent runtime profiles.",
    },
    architectureSummary: {
      id: "Arsitektur 3-lapis: Rust crate menangani VT/ANSI parsing, PTY lifecycle, & grid buffer berjejak memori rendah; JNI layer mengekspor state ringkas; Kotlin/Compose merender UI workspace-first + runtime bun/node/git siap agen.",
      en: "Three-tier architecture: Rust crates drive VT/ANSI parsing, PTY management, and compact terminal cell grids; a safe JNI boundary streams snapshots; Jetpack Compose renders workspace-aware tabs and agent runtimes.",
    },
    highlights: {
      id: [
        "Core emulator terminal ditulis di Rust — penggunaan RAM jauh lebih efisien dibanding stack Java/Spannable",
        "Workspace-first UX: buka direktori langsung tampil status Git & npm/package scripts",
        "Agent-ready out-of-the-box untuk runtime bun, node, dan CLI AI modern dengan proteksi anti-footgun PID",
      ],
      en: [
        "Rust terminal emulator core engineered for minimal RAM overhead vs legacy Java/Spannable stacks",
        "Workspace-first workflow: open a project directory to immediately surface Git state & runnable scripts",
        "Agent-ready runtime profiles (bun/node/git) with anti-footgun PID and session safeguards",
      ],
    },
    stack: ["Rust", "Kotlin", "Jetpack Compose", "JNI", "PTY / VT100", "Android NDK"],
    primaryLang: "Rust",
    accentHex: "#F97316",
    simulationPreset: "terminal-rust",
    metrics: [
      { label: { id: "Core Engine", en: "Core Engine" }, value: "Pure Rust" },
      { label: { id: "UI Layer", en: "UI Layer" }, value: "Compose" },
      { label: { id: "Arsitektur", en: "Architecture" }, value: "JNI Zero-Fork" },
    ],
    architectureNodes: [
      {
        layer: "01 // CORE",
        title: "Rust PTY & VT Grid",
        detail: {
          id: "Parsing escape sequence ANSI kecepatan tinggi & manajemen buffer sel konstan.",
          en: "High-throughput ANSI escape parsing and constant-memory cell buffer management.",
        },
      },
      {
        layer: "02 // BRIDGE",
        title: "Safe JNI Conduit",
        detail: {
          id: "Transfer frame buffer & sinyal PID terkontrol antara native Rust dan JVM.",
          en: "Controlled frame diffs and process signal bridging between native Rust and JVM.",
        },
      },
      {
        layer: "03 // SHELL UI",
        title: "Workspace Compose Chrome",
        detail: {
          id: "Inspeksi status git, quick scripts, dan profil agen coding langsung di Android.",
          en: "Live git status strip, script launcher, and agent runtime profiles on Android.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/mterm",
  },
  {
    slug: "neural-driving",
    repoName: "Neural-Driving",
    title: "Neural Driving — Autonomous GA Sim",
    year: "2026",
    featured: true,
    category: "simulation-3d",
    tagline: {
      id: "Simulasi mobil otonom yang belajar menyetir sendiri di browser—0 library ML, 0 backend.",
      en: "Self-driving car simulation learning autonomously in the browser—zero ML libraries, zero backend.",
    },
    summary: {
      id: "Setiap mobil dibekali neural network ringan yang membaca sensor jarak raycast 3D untuk memutuskan gas, rem, dan kemudi. Populasi berevolusi real-time lewat genetic algorithm dari generasi ke generasi.",
      en: "Each vehicle runs a lightweight custom neural network reading 3D raycast distance sensors to control throttle, brake, and steering—evolving across generations in real time via a genetic algorithm.",
    },
    challenge: {
      id: "Menjalankan puluhan agen mobil 3D sekaligus di browser pada 60fps tanpa ketergantungan TensorFlow/PyTorch atau server pelatihan eksternal.",
      en: "Training and rendering dozens of autonomous 3D vehicles simultaneously inside a browser at 60fps without heavy ML frameworks or external compute servers.",
    },
    architectureSummary: {
      id: "Next.js 16 + TypeScript mengorkestrasi engine simulasi Three.js dengan raycast multi-sudut, feedforward neural net matrix murni, serta evaluator fitness jarak lintasan + mutasi genetik.",
      en: "Next.js 16 + TypeScript orchestrates a Three.js scene with multi-angle raycast sensors, a pure TypeScript feedforward neural net, and distance-based genetic crossover & mutation.",
    },
    highlights: {
      id: [
        "Zero ML dependencies: neural network & genetic algorithm ditulis murni dari nol dengan TypeScript",
        "Sensor raycast real-time terhubung langsung ke visualisasi bobot jaringan di UI",
        "Berjalan penuh client-side di Next.js 16 + Three.js dengan kontrol kecepatan evolusi",
      ],
      en: [
        "Zero ML dependencies: custom feedforward neural network & genetic evolution in pure TypeScript",
        "Real-time raycast sensor cones linked directly to live network activation telemetry",
        "Runs 100% client-side in Next.js 16 + Three.js with interactive generation controls",
      ],
    },
    stack: ["Next.js 16", "TypeScript", "Three.js", "Genetic Algorithm", "Neural Net", "Raycast"],
    primaryLang: "TypeScript",
    accentHex: "#38BDF8",
    simulationPreset: "neural-driving",
    metrics: [
      { label: { id: "ML Dependencies", en: "ML Dependencies" }, value: "0 Libs" },
      { label: { id: "Input Sensor", en: "Sensor Array" }, value: "Raycast 3D" },
      { label: { id: "Pelatihan", en: "Training Mode" }, value: "In-Browser GA" },
    ],
    architectureNodes: [
      {
        layer: "01 // PERCEPTION",
        title: "Multi-Ray Collision Probes",
        detail: {
          id: "Menghitung jarak tepi lintasan pada sudut simetris setiap tick animasi.",
          en: "Computes track boundary distances across radial angles every simulation tick.",
        },
      },
      {
        layer: "02 // BRAIN",
        title: "Feedforward MLP Engine",
        detail: {
          id: "Perkalian bobot & aktivasi non-linear memetakan sensor ke gas, rem, & setir.",
          en: "Compact weight matrices map ray readings directly into throttle, brake, and steering.",
        },
      },
      {
        layer: "03 // EVOLUTION",
        title: "Elitist Genetic Crossover",
        detail: {
          id: "Memilih kendaraan terjauh sebagai induk generasi baru dengan mutasi adaptif.",
          en: "Selects top-distance survivors to seed the next generation with adaptive mutation.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/Neural-Driving",
  },
  {
    slug: "rallycross",
    repoName: "RallyCross",
    title: "RallyCross & Race3D Physics Engine",
    year: "2026",
    featured: true,
    category: "simulation-3d",
    tagline: {
      id: "Prototipe fisika mobil rally 3D berbasis Three.js + Rapier3D WASM dengan suspensi raycast & model drift.",
      en: "3D rally vehicle physics engine built with Three.js + Rapier3D WASM featuring raycast suspension & drift dynamics.",
    },
    summary: {
      id: "Eksperimen handling kendaraan tingkat lanjut di web: simulasi sasis rigid-body, suspensi raycast per roda, kurva traksi ban di permukaan licin, transfer bobot saat drift, serta profil GPU mobile ringan.",
      en: "Deep browser vehicle-handling engineering: rigid-body chassis physics, per-wheel raycast suspension, slip-angle tire traction curves, drift weight transfer, and adaptive low-GPU mobile tuning.",
    },
    challenge: {
      id: "Simulasi kendaraan 3D di web sering terasa kaku seperti balok meluncur atau drop FPS drastis saat dijalankan di GPU smartphone.",
      en: "Browser 3D driving demos often feel stiff and arcadey or suffer severe frame drops on mobile GPUs.",
    },
    architectureSummary: {
      id: "Menggabungkan Rapier3D WASM (@dimforge/rapier3d-compat) untuk solver fisika deterministik dengan renderer Three.js & lil-gui telemetry tuning, plus mode ?quality=low untuk perangkat mobile.",
      en: "Pairs Rapier3D WASM deterministic rigid-body stepping with Three.js rendering, live lil-gui suspension tuning, and ?quality=low adaptive mobile rendering.",
    },
    highlights: {
      id: [
        "Raycast suspension & lateral tire slip model untuk feel drift rally yang responsif",
        "Solver fisika WASM via @dimforge/rapier3d-compat dengan step stabil",
        "Mode adaptif ?quality=low (pixel ratio 1x, tanpa shadow) agar mulus di Chrome Android",
      ],
      en: [
        "Per-wheel raycast suspension & lateral tire slip curves for authentic rally drift feel",
        "Deterministic WASM rigid-body simulation via @dimforge/rapier3d-compat",
        "Adaptive ?quality=low pipeline keeping frame pacing smooth on mobile Chrome GPUs",
      ],
    },
    stack: ["Three.js", "Rapier3D WASM", "TypeScript", "Vite", "Raycast Physics", "lil-gui"],
    primaryLang: "TypeScript",
    accentHex: "#A855F7",
    simulationPreset: "rally-physics",
    metrics: [
      { label: { id: "Physics Solver", en: "Physics Solver" }, value: "Rapier3D" },
      { label: { id: "Suspensi", en: "Suspension" }, value: "4-Wheel Ray" },
      { label: { id: "Target Device", en: "Target Device" }, value: "PC & Mobile" },
    ],
    architectureNodes: [
      {
        layer: "01 // CHASSIS",
        title: "Rapier3D Rigid Body",
        detail: {
          id: "Inersia sasis, pusat massa rendah, dan gaya aerodinamika real-time.",
          en: "Chassis inertia tensor, low center-of-gravity tuning, and dynamic forces.",
        },
      },
      {
        layer: "02 // TRACTION",
        title: "Raycast Suspension & Tire Slip",
        detail: {
          id: "Pegas, damper, serta friksi longitudinal/lateral saat melibas permukaan licin.",
          en: "Spring-damper compression and slip-ratio tire traction across loose surfaces.",
        },
      },
      {
        layer: "03 // RENDER",
        title: "Adaptive Three.js Pipeline",
        detail: {
          id: "Sinkronisasi transformasi roda & sasis dengan fallback kualitas GPU mobile.",
          en: "Synchronized wheel/chassis visuals with adaptive mobile GPU quality profiles.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/RallyCross",
  },
  {
    slug: "robot-vision-ai",
    repoName: "robot-vision-ai",
    title: "Robot Vision AI — Local VLM + ESP32",
    year: "2026",
    featured: true,
    category: "ai-vision",
    tagline: {
      id: "Menjalankan Vision-Language Model LFM2.5-VL-450M lokal di HP Android untuk mengendalikan robot ESP32-S3-CAM.",
      en: "Running a local Vision-Language Model (LFM2.5-VL-450M) on Android/Termux to control an ESP32-S3-CAM robot.",
    },
    summary: {
      id: "Sistem robotik vision otonom tanpa cloud: kamera ESP32-S3-CAM 2WD mengirim frame ke web UI di HP Android, diproses secara lokal oleh model GGUF LFM2.5-VL-450M via binary native llama-mtmd-cli untuk menghasilkan bounding box & keputusan gerak.",
      en: "Zero-cloud autonomous robot vision: an ESP32-S3-CAM 2WD rover streams frames to an Android-hosted interface where locally quantized LFM2.5-VL-450M (llama.cpp native ARM64) predicts bounding boxes in real time.",
    },
    challenge: {
      id: "Menjalankan model multimodal (vision + text) di perangkat ARM64 dengan RAM terbatas sambil menjaga latensi inferensi cukup cepat untuk navigasi robot.",
      en: "Running multimodal vision-language inference locally on mobile ARM64 hardware with low enough latency to steer physical robot motors.",
    },
    architectureSummary: {
      id: "Kompilasi native llama-mtmd-cli (optimalisasi ~35-40% lebih cepat di ARM64) memuat model terkuantisasi Q4_K_M + mmproj Q8_0, disajikan via Robot UI yang terhubung ke modul motor & kamera ESP32-S3-CAM.",
      en: "Native ARM64 build of llama-mtmd-cli (~35-40% faster inference) runs Q4_K_M + mmproj Q8_0 weights behind a live bounding-box web interface wired to ESP32-S3-CAM actuators.",
    },
    highlights: {
      id: [
        "100% inferensi VLM offline di HP Android (Termux + llama.cpp) tanpa API cloud berbayar",
        "Build native llama-mtmd-cli menghasilkan akselerasi inferensi ~35-40% di ARM64",
        "Output bounding box visual real-time terintegrasi langsung dengan rover ESP32-S3-CAM 2WD",
      ],
      en: [
        "100% offline VLM inference on Android/Termux (llama.cpp) with zero cloud API latency",
        "Native ARM64 llama-mtmd-cli compilation delivering ~35-40% speedup",
        "Live bounding-box overlay integrated directly with ESP32-S3-CAM 2WD robotics",
      ],
    },
    stack: ["llama.cpp", "LFM2.5-VL-450M", "ESP32-S3-CAM", "ARM64", "GGUF Q4_K_M", "Web UI"],
    primaryLang: "C++ / HTML",
    accentHex: "#10F5A8",
    simulationPreset: "robot-vision",
    metrics: [
      { label: { id: "Model VLM", en: "VLM Model" }, value: "450M GGUF" },
      { label: { id: "Speedup Native", en: "Native Gain" }, value: "+35–40%" },
      { label: { id: "Eksekusi", en: "Execution" }, value: "100% Local" },
    ],
    architectureNodes: [
      {
        layer: "01 // HARDWARE",
        title: "ESP32-S3-CAM 2WD",
        detail: {
          id: "Menangkap feed kamera & mengeksekusi perintah motor diferensial via WiFi.",
          en: "Captures camera frames and executes differential drive commands over local WiFi.",
        },
      },
      {
        layer: "02 // INFERENCE",
        title: "llama-mtmd-cli ARM64",
        detail: {
          id: "Menjalankan LFM2.5-VL Q4_K_M + mmproj Q8_0 native di prosesor ponsel.",
          en: "Executes quantized LFM2.5-VL + mmproj natively on mobile ARM64 cores.",
        },
      },
      {
        layer: "03 // CONTROL UI",
        title: "Bounding-Box Telemetry",
        detail: {
          id: "Visualisasi deteksi target objek & status kontrol robot secara instan.",
          en: "Renders detected object bounding boxes and live steering diagnostics.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/robot-vision-ai",
  },
  {
    slug: "hyperframes-pensil",
    repoName: "Hyperframes-termux-v2",
    title: "Pensil — Automated Live-Draw Video Engine",
    year: "2026",
    featured: true,
    category: "systems-rust",
    tagline: {
      id: "Pipeline video whiteboard live-draw follow-cam otomatis dari skrip hingga render penuh langsung di Android/Termux.",
      en: "Automated whiteboard live-draw follow-cam video pipeline running end-to-end on Android/Termux.",
    },
    summary: {
      id: "Framework CLI Python murni bernama 'pensil' (tanpa dependensi pip) yang mengubah naskah menjadi audio VoiceOver TTS, mengekstrak timestamp per kata, mengoreografikan animasi HTML+GSAP follow-cam, menyisipkan SFX, memverifikasi visual, lalu merakit video utuh via FFmpeg.",
      en: "Zero-pip Python CLI framework ('pensil') automating VoiceOver TTS generation, word-level timing extraction, HTML+GSAP follow-cam drawing choreography, procedural SFX mixing, visual verification, and FFmpeg assembly on mobile.",
    },
    challenge: {
      id: "Produksi video edukasi/dokumenter whiteboard sinkron narasi biasanya membutuhkan software desktop berat (After Effects/Premiere) dan puluhan jam penyelarasan manual.",
      en: "Producing tightly synced whiteboard explainer videos usually demands heavy desktop NLEs and tedious manual frame-by-word keyframing.",
    },
    architectureSummary: {
      id: "Orkestrator Python stdlib menggabungkan Edge-TTS + beats/word-timing parser, membungkus hyperframes untuk snapshot lint visual serta rendering komposisi GSAP, dan menggabungkan trek VO + SFX di FFmpeg.",
      en: "Pure stdlib Python orchestrates Edge-TTS + word-timestamp alignment, wraps hyperframes for snapshot verification of HTML+GSAP motion scenes, and masters final video via FFmpeg.",
    },
    highlights: {
      id: [
        "Framework CLI 'pensil' 100% Python stdlib — nol dependensi pip agar ringan di Termux aarch64",
        "Sinkronisasi otomatis word-timestamps TTS dengan kamera GSAP live-draw",
        "Verifikasi visual snapshot otomatis sebelum penggabungan audio SFX & video FFmpeg",
      ],
      en: [
        "100% Python stdlib 'pensil' CLI — zero pip bloat, crafted for Termux aarch64",
        "Automated word-timestamp alignment driving GSAP follow-cam path animations",
        "Built-in snapshot visual lint verification prior to final FFmpeg audio/video mastering",
      ],
    },
    stack: ["Python Stdlib", "GSAP", "Hyperframes", "Edge TTS", "FFmpeg", "Termux ARM64"],
    primaryLang: "Python / HTML",
    accentHex: "#F43F5E",
    simulationPreset: "pensil-motion",
    metrics: [
      { label: { id: "Pip Deps", en: "Pip Deps" }, value: "0 (Stdlib)" },
      { label: { id: "Sinkronisasi", en: "Sync Precision" }, value: "Word-Level" },
      { label: { id: "Target Host", en: "Runtime Host" }, value: "Android ARM64" },
    ],
    architectureNodes: [
      {
        layer: "01 // AUDIO",
        title: "TTS & Word-Beat Parser",
        detail: {
          id: "Menghasilkan narasi suara + peta waktu presisi setiap kata & ketukan.",
          en: "Generates spoken VO tracks paired with exact word-level timing cues.",
        },
      },
      {
        layer: "02 // STAGE",
        title: "GSAP Follow-Cam Canvas",
        detail: {
          id: "Menggambar ilustrasi vektor dan mengikuti fokus kamera sesuai ritme ucapan.",
          en: "Animates vector drawing paths and dynamic follow-cam pans in sync with speech.",
        },
      },
      {
        layer: "03 // MASTER",
        title: "Visual Lint + FFmpeg",
        detail: {
          id: "Snapshot check otomatis lalu kompilasi video + SFX menjadi output siap tayang.",
          en: "Automated visual verification followed by FFmpeg SFX layering and muxing.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/Hyperframes-termux-v2",
  },
  {
    slug: "asisten",
    repoName: "asisten",
    title: "Asisten — Multimodal AI + Vision + ESP32",
    year: "2026",
    featured: true,
    category: "ai-vision",
    tagline: {
      id: "Asisten AI web multimodal menggabungkan Groq LLM/Vision, TensorFlow.js di browser, dan integrasi hardware ESP32.",
      en: "Multimodal web AI assistant uniting Groq LLM/Vision, client-side TensorFlow.js, and ESP32 hardware control.",
    },
    summary: {
      id: "Aplikasi Next.js live yang menggabungkan inferensi super cepat Groq (Llama 3, Mixtral, Gemma, Vision) dengan model computer vision client-side (COCO-SSD, Handpose, MobileNet, Face-API) serta jembatan kontrol perangkat ESP32.",
      en: "Production Next.js assistant fusing ultra-low-latency Groq inference (Llama 3, Mixtral, Gemma, Vision) with real-time browser TensorFlow.js models (COCO-SSD, Handpose, MobileNet, Face-API) and an ESP32 hardware module.",
    },
    challenge: {
      id: "Menggabungkan deteksi kamera real-time di sisi klien tanpa mengirim video terus-menerus ke server, sambil tetap memberi kecerdasan penalaran LLM/VLM saat dibutuhkan.",
      en: "Delivering zero-lag live camera perception on the client without streaming constant raw video, while escalating complex reasoning to fast multimodal LLMs.",
    },
    architectureSummary: {
      id: "Pipeline hybrid: TensorFlow.js memproses frame kamera lokal (objek, pose tangan, wajah) di browser; Groq SDK menangani analisis gambar terkurasi & percakapan; endpoint terhubung ke firmware ESP32.",
      en: "Hybrid pipeline: client-side TensorFlow.js handles continuous object/hand/face detection, Groq SDK processes high-level vision reasoning, and API bridges drive ESP32 hardware.",
    },
    highlights: {
      id: [
        "4 model TensorFlow.js aktif di browser: COCO-SSD, Handpose, MobileNet, dan Face-API",
        "Integrasi multi-model Groq SDK untuk respons LLM & Vision super cepat",
        "Dilengkapi modul firmware ESP32 untuk aksi fisik langsung dari asisten AI",
      ],
      en: [
        "Four client-side TensorFlow.js vision models: COCO-SSD, Handpose, MobileNet, Face-API",
        "Multi-model Groq SDK orchestration for ultra-fast conversational & vision analysis",
        "Includes dedicated ESP32 firmware directory bridging AI commands to physical hardware",
      ],
    },
    stack: ["Next.js", "Groq SDK", "TensorFlow.js", "Face-API", "ESP32", "TypeScript"],
    primaryLang: "TypeScript",
    accentHex: "#6366F1",
    simulationPreset: "multimodal-ai",
    metrics: [
      { label: { id: "Edge Models", en: "Client Models" }, value: "4 TF.js Nets" },
      { label: { id: "Cloud LLM", en: "Inference" }, value: "Groq Vision" },
      { label: { id: "Status", en: "Deployment" }, value: "Live Vercel" },
    ],
    architectureNodes: [
      {
        layer: "01 // VISION EDGE",
        title: "TensorFlow.js Browser Nets",
        detail: {
          id: "Deteksi objek, gestur tangan, dan wajah instan langsung di WebGL browser.",
          en: "Instant object, handpose, and facial landmark inference inside browser WebGL.",
        },
      },
      {
        layer: "02 // REASONING",
        title: "Groq Multimodal API",
        detail: {
          id: "Analisis gambar terarah & dialog cerdas berbasis Llama 3, Mixtral, dan Gemma.",
          en: "High-speed image understanding and reasoning powered by Llama 3, Mixtral & Gemma.",
        },
      },
      {
        layer: "03 // ACTUATION",
        title: "ESP32 Hardware Bridge",
        detail: {
          id: "Menerjemahkan niat perintah AI menjadi sinyal kontrol mikrokontroler.",
          en: "Translates assistant intents into physical microcontroller actions.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/asisten",
    liveUrl: "https://asisten-sepia.vercel.app",
  },
  {
    slug: "tts-api-indonesia",
    repoName: "tts-api-indonesia",
    title: "TTS API — Gemini Bahasa Indonesia",
    year: "2026",
    featured: false,
    category: "ai-vision",
    tagline: {
      id: "REST API Text-to-Speech Bahasa Indonesia natural memakai Gemini TTS dengan fallback model otomatis & 0 dependensi npm.",
      en: "Zero-dependency Node.js REST API for natural Indonesian Text-to-Speech via Gemini TTS with multi-model fallback.",
    },
    summary: {
      id: "Layanan REST API super ramping hanya dengan Node.js 18+ fetch bawaan. Menerima teks Indonesia dan mengembalikan audio WAV berkualitas tinggi dengan fallback otomatis antar model Gemini TTS saat kuota limit tercapai.",
      en: "Ultra-lean REST service built solely with Node.js 18+ native fetch. Converts Indonesian text to natural WAV audio with automatic quota fallback across Gemini TTS tiers.",
    },
    challenge: {
      id: "Menghasilkan suara Bahasa Indonesia yang natural untuk proyek otomasi/notifikasi tanpa server berat, dependensi rentan, atau downtime saat satu model kena rate-limit.",
      en: "Delivering natural Indonesian speech synthesis for bots and apps with zero dependency bloat and automatic resilience against single-model quota limits.",
    },
    architectureSummary: {
      id: "Single-file server.mjs murni Node.js menyediakan endpoint /api/tts, /api/voices, dan sample audio, lengkap dengan cascade fallback dari gemini-3.8-flash-tts ke gemini-2.5-flash/pro-preview-tts.",
      en: "Zero-dependency server.mjs exposing /api/tts and /api/voices endpoints with automated cascade fallback from gemini-3.8-flash-tts to gemini-2.5-flash/pro tiers.",
    },
    highlights: {
      id: [
        "0 dependensi npm — memakai native fetch Node.js 18+ untuk start instan & jejak minimal",
        "Auto-fallback cerdas antar model Gemini TTS agar layanan tetap hidup tanpa intervensi",
        "Output WAV bersih siap pakai untuk pipeline video, aplikasi Android, maupun bot suara",
      ],
      en: [
        "Zero npm dependencies — built purely on Node.js 18+ native fetch",
        "Smart multi-tier Gemini TTS fallback ensuring uninterrupted audio synthesis",
        "Direct WAV output ready for video pipelines, Android apps, and voice assistants",
      ],
    },
    stack: ["Node.js 18+", "Gemini TTS", "REST API", "WAV Encoding", "Zero-Deps"],
    primaryLang: "JavaScript",
    accentHex: "#EC4899",
    simulationPreset: "voice-tts",
    metrics: [
      { label: { id: "Dependensi", en: "Dependencies" }, value: "0 npm" },
      { label: { id: "Output", en: "Output Format" }, value: "WAV Audio" },
      { label: { id: "Ketahanan", en: "Resilience" }, value: "3-Tier Fallback" },
    ],
    architectureNodes: [
      {
        layer: "01 // INGEST",
        title: "REST Endpoints",
        detail: {
          id: "POST /api/tts & GET /api/voices menerima payload teks dan pilihan karakter suara.",
          en: "POST /api/tts and GET /api/voices handle text payloads and voice selection.",
        },
      },
      {
        layer: "02 // ROUTER",
        title: "Multi-Model Fallback",
        detail: {
          id: "Otomatis beralih ke Gemini 2.5 Flash/Pro TTS bila kuota model utama penuh.",
          en: "Seamlessly falls back to Gemini 2.5 Flash/Pro TTS upon primary quota exhaustion.",
        },
      },
      {
        layer: "03 // STREAM",
        title: "WAV Synthesis Output",
        detail: {
          id: "Mengembalikan buffer audio WAV standar siap putar atau diunduh.",
          en: "Returns clean standard WAV audio ready for immediate playback or muxing.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/tts-api-indonesia",
  },
  {
    slug: "gemma4-vision",
    repoName: "gemma4-vision",
    title: "Gemma 4 Vision — Mobile Multimodal",
    year: "2026",
    featured: false,
    category: "ai-vision",
    tagline: {
      id: "Menjalankan model Gemma 4 E2B multimodal (chat teks + analisis gambar) langsung di HP Android via Termux.",
      en: "Running Gemma 4 E2B multimodal vision & chat natively on Android devices via Termux with Web UI + CLI.",
    },
    summary: {
      id: "Stack lengkap instalasi dan runner untuk mengoperasikan model visi multimodal Gemma 4 E2B di CPU ARM64 Android (4–8GB RAM) lengkap dengan antarmuka web lokal dan mode CLI.",
      en: "Complete mobile deployment stack enabling Gemma 4 E2B multimodal chat and image analysis directly on ARM64 Android devices (4–8GB RAM) with both Web UI and CLI.",
    },
    challenge: {
      id: "Membawa kecerdasan multimodal sekelas desktop ke perangkat Android genggam tanpa bergantung pada koneksi internet atau layanan berlangganan.",
      en: "Bringing desktop-class multimodal image reasoning onto handheld Android hardware without cloud subscriptions or internet access.",
    },
    architectureSummary: {
      id: "Skrip orkestrasi bash & llama.cpp teroptimasi ARM64 big.LITTLE menjalankan server inferensi lokal plus antarmuka web responsif untuk unggah foto dan tanya-jawab visual.",
      en: "ARM64 big.LITTLE-tuned shell runners and local inference server expose a clean browser chat UI and CLI workflow for on-device photo analysis.",
    },
    highlights: {
      id: [
        "Berjalan offline penuh di HP Android ARM64 hanya dengan RAM 4–8GB",
        "Menyediakan dua antarmuka sekaligus: Web UI modern & CLI terminal cepat",
        "Siap analisis foto, OCR, dan dialog multimodal langsung dari penyimpanan HP",
      ],
      en: [
        "Fully offline multimodal execution on 4–8GB RAM ARM64 Android smartphones",
        "Dual interface: responsive local Web UI paired with a fast CLI workflow",
        "On-device image analysis, visual QA, and text chat with zero data leaving the phone",
      ],
    },
    stack: ["Gemma 4 E2B", "ARM64 / Termux", "llama.cpp", "Web UI", "CLI", "Shell"],
    primaryLang: "Shell / HTML",
    accentHex: "#14B8A6",
    simulationPreset: "edge-vlm",
    metrics: [
      { label: { id: "Model", en: "Model" }, value: "Gemma 4 E2B" },
      { label: { id: "Min RAM", en: "Min RAM" }, value: "4 GB ARM64" },
      { label: { id: "Interface", en: "Interface" }, value: "Web + CLI" },
    ],
    architectureNodes: [
      {
        layer: "01 // RUNTIME",
        title: "ARM64 big.LITTLE Tuning",
        detail: {
          id: "Konfigurasi thread & memori khusus chipset Android untuk inferensi stabil.",
          en: "Thread and memory allocation tuned for mobile ARM64 big.LITTLE SoCs.",
        },
      },
      {
        layer: "02 // MODEL",
        title: "Gemma 4 Multimodal",
        detail: {
          id: "Memproses token gambar dan prompt teks terpadu secara lokal.",
          en: "Unified local vision-encoder and language decoding pipeline.",
        },
      },
      {
        layer: "03 // FRONTEND",
        title: "Local Web UI + CLI",
        detail: {
          id: "Akses instan dari browser HP atau langsung di sesi terminal.",
          en: "Instant access via mobile browser interface or native shell session.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/gemma4-vision",
  },
  {
    slug: "keyless-v2",
    repoName: "Keylessv2",
    title: "KeylessV2 & AutoKey — ESP32 Vehicle",
    year: "2026",
    featured: true,
    category: "iot-mobile",
    tagline: {
      id: "Sistem akses & starter kendaraan keyless pintar berbasis ESP32 C++, Bluetooth BLE, Web UI, dan aplikasi Expo.",
      en: "Smart keyless vehicle ignition & access platform powered by ESP32 C++, BLE fallback, Web UI & Expo mobile.",
    },
    summary: {
      id: "Menggabungkan mikrokontroler ESP32 dengan 2 relay kontak/starter, 8 indikator LED status, tombol darurat fisik (single/double press), antarmuka web real-time, serta aplikasi pendamping mobile React Native Expo via Bluetooth BLE.",
      en: "Combines an ESP32 controller driving dual ignition/starter relays, 8 status LEDs, tactile single/double-press hardware overrides, a live browser dashboard, and a React Native Expo BLE companion app.",
    },
    challenge: {
      id: "Sistem kendaraan cerdas wajib 100% andal di dunia nyata—jika WiFi mati atau HP lowbat, kontrol fisik dan fallback Bluetooth harus tetap bekerja instan dan aman.",
      en: "Physical automotive systems demand absolute reliability—hardware button overrides and BLE fallbacks must work seamlessly even when WiFi or phones drop out.",
    },
    architectureSummary: {
      id: "Firmware C++ ESP32 mengelola state machine kontak/starter dual-relay + feedback buzzer/8-LED; komunikasi redundan lewat WiFi Web UI dan Bluetooth BLE yang terhubung ke aplikasi Expo AutoKey.",
      en: "ESP32 C++ firmware enforces safe dual-relay ignition/starter state machines with 8-LED + buzzer telemetry across physical switches, WiFi Web UI, and Expo BLE.",
    },
    highlights: {
      id: [
        "Kontrol multi-jalur redundan: Web Browser, Bluetooth BLE (AutoKey), dan tombol fisik offline",
        "Logika keamanan dual-relay: single press untuk kontak ON/OFF, double press untuk starter",
        "8 LED diagnostik status & notifikasi buzzer untuk umpan balik kondisi kendaraan yang jelas",
      ],
      en: [
        "Tri-modal control redundancy: Web UI, Bluetooth BLE (AutoKey), and offline hardware switch",
        "Safety-first relay logic: single-press ignition toggle, double-press crank starter",
        "8-LED diagnostic array + buzzer cues providing unmistakable vehicle state feedback",
      ],
    },
    stack: ["ESP32 C++", "Bluetooth BLE", "React Native Expo", "Web UI", "Dual Relay", "IoT"],
    primaryLang: "C++ / TypeScript",
    accentHex: "#EAB308",
    simulationPreset: "esp32-keyless",
    metrics: [
      { label: { id: "Konektivitas", en: "Channels" }, value: "WiFi + BLE" },
      { label: { id: "Kontrol Fisik", en: "Fail-Safe" }, value: "1/2x Press" },
      { label: { id: "Hardware", en: "Controller" }, value: "ESP32 + 2 Relay" },
    ],
    architectureNodes: [
      {
        layer: "01 // FIRMWARE",
        title: "ESP32 State Machine",
        detail: {
          id: "Kontrol deterministik relay kontak & starter dengan debounce tombol fisik.",
          en: "Deterministic ignition/starter relay sequencing with hardware debounce.",
        },
      },
      {
        layer: "02 // TRANSPORT",
        title: "Dual WiFi & BLE Stack",
        detail: {
          id: "Switch otomatis ke Bluetooth Low Energy bila jaringan WiFi tidak tersedia.",
          en: "Seamless Bluetooth Low Energy fallback whenever local WiFi is unavailable.",
        },
      },
      {
        layer: "03 // COMPANION",
        title: "AutoKey Expo & Web UI",
        detail: {
          id: "Antarmuka HP & browser dengan haptic feedback dan status telemetry real-time.",
          en: "Mobile Expo & web control decks featuring haptic cues and live telemetry.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/Keylessv2",
    liveUrl: "https://keyless-nine.vercel.app",
  },
  {
    slug: "remote-proyektor",
    repoName: "Remote-Proyektor-Android",
    title: "Remote Proyektor & NotifBaca Android",
    year: "2026",
    featured: false,
    category: "systems-rust",
    tagline: {
      id: "Ekosistem utilitas Android low-level: APK remote touchpad WiFi + daemon tanpa root & pembaca notifikasi TTS.",
      en: "Low-level Android utility suite: rootless WiFi HID touchpad/D-pad daemon APK & smart Bluetooth TTS notification reader.",
    },
    summary: {
      id: "Dua rekayasa sistem Android praktis: Remote Proyektor (tvremote.apk + 2 daemon rootless port 9877 untuk kursor touchpad, D-pad 8 arah, keyboard & media di Android TV) serta NotifBaca (pembaca notifikasi TTS pintar dengan filter Bluetooth LE Audio & watchdog service).",
      en: "Two deeply practical Android systems builds: Remote Proyektor (tvremote.apk + 2 rootless daemons on port 9877 delivering touchpad mouse & 8-way D-pad over WiFi) and NotifBaca (smart TTS notification reader with LE Audio filtering & self-healing watchdog).",
    },
    challenge: {
      id: "Mengendalikan proyektor Android TV ketika remote fisik hilang tanpa akses root, serta membangun layanan aksesibilitas notifikasi Android yang kebal terhadap pembatasan latar belakang OS.",
      en: "Controlling Android TV projectors without a physical remote or root access, and keeping background notification listeners alive across aggressive Android OS battery limits.",
    },
    architectureSummary: {
      id: "Build APK murni via Android SDK/aapt2 + skrip injeksi daemon port 9877 untuk input event virtual, berdampingan dengan NotificationListenerService ber-watchdog & Quick Settings Tile di NotifBaca.",
      en: "Streamlined APK compilation pipelines + rootless port-9877 virtual input daemons, alongside a watchdog-hardened Android NotificationListenerService with Quick Settings tile.",
    },
    highlights: {
      id: [
        "Berjalan penuh di proyektor Android 11 tanpa root lewat 2 daemon ringan di port 9877",
        "Touchpad ala mouse, D-pad 8 arah, input keyboard, & kontrol media lengkap via WiFi",
        "NotifBaca dilengkapi deteksi Bluetooth/LE Audio, Quick Settings tile, & auto-rebind watchdog",
      ],
      en: [
        "Operates rootless on Android 11 projectors via dual lightweight socket daemons (port 9877)",
        "Full WiFi touchpad cursor, 8-way D-pad, text input, and media playback controls",
        "NotifBaca pairs Bluetooth LE Audio routing with a Quick Settings tile & auto-rebind watchdog",
      ],
    },
    stack: ["Java", "Android SDK", "Socket Daemon", "ADB / Shell", "TTS Engine", "LE Audio"],
    primaryLang: "Java",
    accentHex: "#0EA5E9",
    simulationPreset: "android-daemon",
    metrics: [
      { label: { id: "Akses Sistem", en: "Privilege" }, value: "Rootless" },
      { label: { id: "Protokol", en: "Socket Port" }, value: "WiFi :9877" },
      { label: { id: "Kompatibilitas", en: "Target SDK" }, value: "Android 26–33" },
    ],
    architectureNodes: [
      {
        layer: "01 // CLIENT APK",
        title: "tvremote.apk Controller",
        detail: {
          id: "Mengubah gestur sentuh layar HP menjadi paket koordinat mouse & tombol D-pad.",
          en: "Translates mobile touch gestures into low-latency cursor and D-pad packets.",
        },
      },
      {
        layer: "02 // DAEMON",
        title: "Rootless Port 9877 Bridge",
        detail: {
          id: "Dua daemon di perangkat target menginjeksi kursor & event input secara aman.",
          en: "Dual rootless background daemons inject virtual cursor and key events securely.",
        },
      },
      {
        layer: "03 // SERVICE",
        title: "NotifBaca TTS Watchdog",
        detail: {
          id: "Membacakan notifikasi saat Bluetooth tersambung dengan auto-rebind layanan.",
          en: "Reads filtered notifications over Bluetooth/LE Audio with watchdog persistence.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/Remote-Proyektor-Android",
  },
  {
    slug: "posman",
    repoName: "POSman",
    title: "POSman — Offline-First Point of Sale",
    year: "2025",
    featured: false,
    category: "iot-mobile",
    tagline: {
      id: "Aplikasi kasir & manajemen inventori mobile lengkap dengan SQLite offline, barcode scanner, dan cetak struk.",
      en: "Comprehensive mobile Point of Sale & inventory manager built with React Native Expo, SQLite, barcode scanner & receipt printing.",
    },
    summary: {
      id: "Solusi kasir mobile end-to-end berbasis React Native + Expo: mendukung login berbasis peran (Admin/Staff), pemindaian barcode kamera, stock opname, manajemen pelanggan, pencetakan struk langsung, dan penyimpanan lokal SQLite berkecepatan tinggi.",
      en: "End-to-end mobile POS powered by React Native & Expo featuring role-based access (Admin/Staff), camera barcode scanning, stock opname reconciliation, customer ledgers, receipt printing, and local SQLite persistence.",
    },
    challenge: {
      id: "Aplikasi kasir UMKM membutuhkan transaksi super cepat tanpa bergantung pada sinyal internet stabil serta integrasi langsung ke hardware kamera dan printer struk.",
      en: "Retail POS workflows demand sub-second checkout regardless of internet reliability, paired with instant camera barcode scanning and receipt hardware output.",
    },
    architectureSummary: {
      id: "Expo SQLite menyimpan seluruh katalog, transaksi, dan histori stock opname secara lokal dengan React Navigation stack + Expo Camera/Barcode Scanner + Expo Print/Sharing.",
      en: "Expo SQLite anchors full local catalog, sales, and stock-opname state alongside React Navigation, Expo Barcode Scanner, and thermal/PDF receipt printing.",
    },
    highlights: {
      id: [
        "Offline-first dengan Expo SQLite — zero lag saat proses checkout harian",
        "Pemindaian barcode kamera real-time + fitur stock opname untuk rekonsiliasi stok",
        "Kontrol akses Admin/Staff & cetak atau bagikan struk transaksi langsung dari aplikasi",
      ],
      en: [
        "Offline-first Expo SQLite database delivering zero-latency daily checkout",
        "Built-in camera barcode scanning & structured stock opname reconciliation",
        "Role-based Admin/Staff guardrails plus instant receipt printing and sharing",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Barcode Scanner", "Expo Print"],
    primaryLang: "TypeScript",
    accentHex: "#22C55E",
    simulationPreset: "pos-sqlite",
    metrics: [
      { label: { id: "Storage", en: "Persistence" }, value: "Local SQLite" },
      { label: { id: "Akses Peran", en: "Access Control" }, value: "Admin / Staff" },
      { label: { id: "Hardware", en: "Peripherals" }, value: "Scan & Print" },
    ],
    architectureNodes: [
      {
        layer: "01 // DATA",
        title: "Expo SQLite Engine",
        detail: {
          id: "Skema relasional lokal untuk produk, stok opname, pelanggan, & struk penjualan.",
          en: "Local relational schema handling SKUs, opname logs, customers, and receipts.",
        },
      },
      {
        layer: "02 // CAPTURE",
        title: "Camera Barcode Scanner",
        detail: {
          id: "Input item instan ke keranjang kasir & audit stok gudang via kamera.",
          en: "Instant SKU lookup into checkout carts and inventory audits via camera.",
        },
      },
      {
        layer: "03 // OUTPUT",
        title: "Receipt Print & Share",
        detail: {
          id: "Generate struk transaksi siap cetak maupun kirim digital ke pelanggan.",
          en: "Formats transaction receipts for direct hardware printing or digital sharing.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/POSman",
  },
  {
    slug: "inventory",
    repoName: "Inventory",
    title: "Inventory & Toolkit — Cloud Web Suite",
    year: "2026",
    featured: false,
    category: "fullstack-web",
    tagline: {
      id: "Ekosistem aplikasi web produktivitas: pelacak aset & valuasi barang berbasis Firebase serta suite Toolkit Next.js serbaguna.",
      en: "Production web productivity suite: Firebase asset & valuation tracker alongside a multi-tool Next.js utility platform.",
    },
    summary: {
      id: "Menggabungkan aplikasi Inventory (pencatatan barang, foto, nilai Rp total aset, ekspor CSV/JSON dengan Google Sign-In + Firestore Spark gratis) dan ekosistem Next.js live seperti Toolkit (Tiptap, QR scanner, PDF/ZIP generator) serta Fixit blog.",
      en: "Combines the Inventory web app (asset tracking, photo logs, IDR valuation dashboard, CSV/JSON export on Firebase Spark) with live Next.js productions including Toolkit (Tiptap editor, QR, jsPDF/JSZip) and Fixit.",
    },
    challenge: {
      id: "Menyediakan aplikasi cloud multi-perangkat (HP & laptop) dengan biaya infrastruktur $0 namun tetap mendukung unggah foto, autentikasi aman, dan ekspor data lengkap.",
      en: "Shipping cross-device cloud apps with zero recurring server cost while supporting photo attachments, Google authentication, and full data portability.",
    },
    architectureSummary: {
      id: "Arsitektur serverless & Express/Firebase memaksimalkan Google Sign-In, Firestore document/image storage tanpa kartu kredit, serta Next.js App Router yang ter-deploy otomatis di Vercel.",
      en: "Serverless Firebase + Express/Next.js architecture leverages Google Auth, Firestore persistence, and client-side document/QR tooling deployed globally on Vercel.",
    },
    highlights: {
      id: [
        "Dashboard total nilai inventaris (Rp), lokasi penyimpanan, kondisi, & foto barang",
        "100% gratis di Firebase Spark Plan (Google Sign-In + Firestore) + ekspor CSV & backup JSON",
        "Terhubung dengan suite produk live di Vercel: Inventory, Toolkit, Fixit, & Kei",
      ],
      en: [
        "Real-time asset valuation dashboard, storage location filters, and photo item logs",
        "100% free-tier Firebase Spark architecture with Google Auth + CSV/JSON portability",
        "Part of a live Vercel-deployed product family spanning Inventory, Toolkit, Fixit & Kei",
      ],
    },
    stack: ["Next.js", "Express", "Firebase Firestore", "Google Auth", "Tiptap", "Vercel"],
    primaryLang: "JavaScript / TS",
    accentHex: "#8B5CF6",
    simulationPreset: "cloud-inventory",
    metrics: [
      { label: { id: "Cloud Tier", en: "Infra Cost" }, value: "$0 Spark" },
      { label: { id: "Ekspor Data", en: "Portability" }, value: "CSV & JSON" },
      { label: { id: "Status", en: "Deployment" }, value: "Live Vercel" },
    ],
    architectureNodes: [
      {
        layer: "01 // AUTH",
        title: "Google Sign-In Isolation",
        detail: {
          id: "Setiap pengguna memiliki ruang data & foto terisolasi per akun Google.",
          en: "Per-account data isolation backed by Firebase Google Authentication.",
        },
      },
      {
        layer: "02 // STORAGE",
        title: "Firestore & Media Sync",
        detail: {
          id: "Sinkronisasi item, nilai aset, dan foto lintas HP maupun desktop secara instan.",
          en: "Instant cross-device sync of item quantities, valuations, and compressed photos.",
        },
      },
      {
        layer: "03 // EXPORT",
        title: "CSV / JSON / PDF Tooling",
        detail: {
          id: "Ekspor laporan penuh & integrasi utilitas dokumen modern di browser.",
          en: "One-click CSV/JSON backup exports and browser-native PDF/QR utilities.",
        },
      },
    ],
    repoUrl: "https://github.com/jajangking/Inventory",
    liveUrl: "https://inventory-blue-chi.vercel.app",
  },
];

export const PROJECT_CATEGORY_LABELS: Array<{
  id: "all" | ProjectCaseStudy["category"];
  label: { id: string; en: string };
}> = [
  { id: "all", label: { id: "Semua Karya", en: "All Works" } },
  { id: "simulation-3d", label: { id: "3D & Simulasi", en: "3D & Simulation" } },
  { id: "ai-vision", label: { id: "AI & Vision", en: "AI & Vision" } },
  { id: "systems-rust", label: { id: "Systems & Rust", en: "Systems & Rust" } },
  { id: "iot-mobile", label: { id: "IoT & Mobile", en: "IoT & Mobile" } },
  { id: "fullstack-web", label: { id: "Full-Stack Web", en: "Full-Stack Web" } },
];
