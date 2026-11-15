# Master Portfolio — @jajangking

Portfolio showcase interaktif dengan **Tri-Reality Visual Engine** (ganti mode tampilan secara real-time tanpa reload):

1. **01 · Obsidian 3D** — Dark glassmorphism, custom GLSL neural shader orb, luminous indigo/cyan aura.
2. **02 · Kinetic Editorial** — Tipografi editorial studio (Instrument Serif + Space Grotesk), garis Swiss presisi, warm gallery paper.
3. **03 · Spatial HUD** — Engineering cockpit, coordinate topology grid, radar wireframe, telemetry live FPS.

## Stack Teknologi

- **Framework**: Next.js 16 (App Router) + TypeScript
- **3D / WebGL**: Three.js + Custom GLSL Vertex/Fragment Shaders
- **Animasi & Scroll**: Framer Motion (`layoutId`, `AnimatePresence`) + Lenis Smooth Scroll
- **Styling & Typography**: Tailwind CSS v4 + self-hosted `@fontsource` fonts
- **Integrasi GitHub**: `/api/github` sync otomatis dari `github.com/jajangking` dengan fallback snapshot lokal

## Fitur Utama

- **Tri-Reality Mode Switcher**: Floating dock di bawah & shortcut keyboard `1`, `2`, `3`.
- **Zero-Reload Case Study Stage**: Klik proyek mana saja untuk membuka panel studi kasus lengkap dengan diagram arsitektur & simulasi domain interaktif (plus deep-link `/projects/[slug]`).
- **Command Palette (`⌘K` / `Ctrl+K`)**: Pencarian instan proyek, filter tech stack, ganti mode, dan ganti bahasa (`ID` / `EN`).
- **Interactive CLI Shell (`Ctrl+\``)**: Terminal interaktif (`help`, `ls`, `open mterm`, `mode hud`, `stack`).

## Kustomisasi Data

- `src/data/profile.ts` — Edit nama, handle, bio, stat, pilar keahlian, dan kontak.
- `src/data/projects.ts` — Tambah, ubah, atau susun ulang showcase proyek flagship.
- `src/data/github-snapshot.ts` — Snapshot fallback repositori GitHub.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```
