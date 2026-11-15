# Master Portfolio — @jajangking

Portfolio showcase interaktif dengan **Quad-Reality Visual Engine** (ganti mode tampilan secara real-time tanpa reload):

1. **01 · Obsidian 3D** — Dark glassmorphism, custom GLSL neural shader orb, luminous indigo/cyan aura.
2. **02 · Kinetic Editorial** — Tipografi editorial studio (Instrument Serif + Space Grotesk), garis Swiss presisi, warm gallery paper.
3. **03 · Spatial HUD** — Engineering cockpit, coordinate topology grid, radar wireframe, telemetry live FPS.
4. **04 · Pure Clarity (Clean UI)** — Mode putih bersih kontras tinggi tanpa distraksi shader untuk keterbacaan informasi yang maksimal.

## Stack Teknologi

- **Framework**: Next.js 16 (App Router) + TypeScript
- **3D / WebGL**: Three.js + Custom GLSL Vertex/Fragment Shaders
- **Animasi & Scroll**: Framer Motion (`layoutId`, `AnimatePresence`) + Lenis Smooth Scroll
- **Styling & Typography**: Tailwind CSS v4 + self-hosted `@fontsource` fonts
- **Integrasi GitHub & Vercel**: `/api/github` sync otomatis dari `github.com/jajangking` + `/api/vercel` untuk seluruh 16 live deployment di Vercel (mendukung `VERCEL_API_TOKEN` opsional dengan fallback snapshot lokal terverifikasi).

## Fitur Utama

- **Quad-Reality Mode Switcher**: Floating dock di bawah & shortcut keyboard `1`, `2`, `3`, `4`.
- **Pilihan Terbaik (Pinned Top Picks)**: Secara default menampilkan 6 karya terkuat lintas disiplin agar ringkas dan fokus, plus tombol **Pin/Unpin** interaktif di tiap kartu untuk menyusun daftar prioritas sendiri.
- **Zero-Reload Case Study Stage**: Klik proyek mana saja untuk membuka panel studi kasus lengkap dengan diagram arsitektur & simulasi domain interaktif (plus deep-link `/projects/[slug]`).
- **Vercel Cloud & GitHub Vault**: Switcher langsung antara **16 Live Vercel Apps** (`inventory`, `motoringv`, `keinarra`, `kei`, `asisten`, `toolkit`, `fixit`, dll.) dan repositori GitHub.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Pencarian instan proyek & live Vercel apps, filter tech stack, ganti mode, dan ganti bahasa (`ID` / `EN`).
- **Interactive CLI Shell (`Ctrl+\``)**: Terminal interaktif (`help`, `ls`, `vercel`, `open mterm`, `open motoringv`, `mode hud`, `stack`).

## Kustomisasi Data

- `src/data/profile.ts` — Edit nama, handle, bio, stat, pilar keahlian, dan kontak.
- `src/data/projects.ts` — Tambah, ubah, atau susun ulang showcase proyek flagship (14 case studies).
- `src/data/vercel-projects.ts` — Katalog 16 deployment live Vercel terverifikasi.
- `src/data/github-snapshot.ts` — Snapshot fallback repositori GitHub.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```
