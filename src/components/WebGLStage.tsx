"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolio } from "@/context/PortfolioContext";
import { VisualMode } from "@/types/portfolio";

const MODE_CONFIG: Record<
  VisualMode,
  {
    orbMix: number;
    ribbonMix: number;
    hudMix: number;
    primaryColor: string;
    secondaryColor: string;
    particleOpacity: number;
  }
> = {
  obsidian: {
    orbMix: 1.0,
    ribbonMix: 0.15,
    hudMix: 0.0,
    primaryColor: "#6366f1",
    secondaryColor: "#22d3ee",
    particleOpacity: 0.72,
  },
  editorial: {
    orbMix: 0.0,
    ribbonMix: 1.0,
    hudMix: 0.0,
    primaryColor: "#111113",
    secondaryColor: "#d94e28",
    particleOpacity: 0.28,
  },
  hud: {
    orbMix: 0.28,
    ribbonMix: 0.25,
    hudMix: 1.0,
    primaryColor: "#10f5a8",
    secondaryColor: "#00d8ff",
    particleOpacity: 0.78,
  },
  clarity: {
    orbMix: 0.0,
    ribbonMix: 0.0,
    hudMix: 0.0,
    primaryColor: "#2563eb",
    secondaryColor: "#0f766e",
    particleOpacity: 0.0,
  },
  windows: {
    orbMix: 0.0,
    ribbonMix: 0.0,
    hudMix: 0.0,
    primaryColor: "#38bdf8",
    secondaryColor: "#1d4ed8",
    particleOpacity: 0.0,
  },
};

const ORB_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.04 + vec3(1.7, 9.2, 4.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 samplePos = position * 1.45 + vec3(uTime * 0.22, uTime * 0.14, uScroll * 0.8);
    float n = fbm(samplePos);
    vNoise = n;
    float disp = (n - 0.5) * (0.48 + uHover * 0.22);
    vec3 displaced = position + normal * disp;
    vPos = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const ORB_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying float vNoise;

  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.4);
    vec3 col = mix(uColorA, uColorB, clamp(vNoise * 1.35 + fresnel * 0.55, 0.0, 1.0));
    float alpha = (0.14 + fresnel * 0.65) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

const RIBBON_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  varying float vElevation;

  void main() {
    vec3 pos = position;
    float wave1 = sin(pos.x * 0.55 + uTime * 0.75 + uScroll * 2.0) * 0.48;
    float wave2 = cos(pos.y * 0.72 - uTime * 0.55) * 0.36;
    float distMouse = length(pos.xy - uMouse * 3.5);
    float ripple = exp(-distMouse * 0.45) * sin(distMouse * 2.4 - uTime * 3.0) * 0.45;
    pos.z += wave1 + wave2 + ripple;
    vElevation = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const RIBBON_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vElevation;

  void main() {
    float t = clamp((vElevation + 0.9) / 1.8, 0.0, 1.0);
    vec3 col = mix(uColorA, uColorB, t);
    gl_FragColor = vec4(col, uOpacity);
  }
`;

export function WebGLStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { mode, setFpsEstimate, setWebglActive } = usePortfolio();
  const modeRef = useRef<VisualMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglActive(false);
      return;
    }

    setWebglActive(true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.2);

    // 1. Obsidian Neural Shader Orb + Lattice Shell
    const orbGeo = new THREE.IcosahedronGeometry(1.75, 24);
    const orbMat = new THREE.ShaderMaterial({
      vertexShader: ORB_VERTEX_SHADER,
      fragmentShader: ORB_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uScroll: { value: 0 },
        uColorA: { value: new THREE.Color("#6366f1") },
        uColorB: { value: new THREE.Color("#22d3ee") },
        uOpacity: { value: 1.0 },
      },
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    orbMesh.position.set(1.85, 0.25, 0);
    scene.add(orbMesh);

    const wireGeo = new THREE.IcosahedronGeometry(2.05, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#818cf8"),
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.position.copy(orbMesh.position);
    scene.add(wireMesh);

    // 2. Kinetic Architectural Wave Plane (Editorial + HUD topology)
    const waveGeo = new THREE.PlaneGeometry(16, 9, 44, 24);
    const waveMat = new THREE.ShaderMaterial({
      vertexShader: RIBBON_VERTEX_SHADER,
      fragmentShader: RIBBON_FRAGMENT_SHADER,
      wireframe: true,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorA: { value: new THREE.Color("#111113") },
        uColorB: { value: new THREE.Color("#d94e28") },
        uOpacity: { value: 0.18 },
      },
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -0.95;
    waveMesh.position.set(0, -1.65, -2.2);
    scene.add(waveMesh);

    // 3. Spatial Orbital Particle Field
    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.6 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 9.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 8.0 - 1.0;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.042,
      color: new THREE.Color("#22d3ee"),
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. HUD Radar Rings (visible predominantly in Spatial HUD mode)
    const ringGeo = new THREE.RingGeometry(2.35, 2.38, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#10f5a8"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
    });
    const radarRing = new THREE.Mesh(ringGeo, ringMat);
    radarRing.position.copy(orbMesh.position);
    scene.add(radarRing);

    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let scrollProgress = 0;
    let pointerVelocity = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerVelocity = Math.min(
        1,
        Math.hypot(nx - mouseX, ny - mouseY) * 6.5
      );
      mouseX = nx;
      mouseY = ny;
    };

    const onScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Keep hero geometry nicely positioned on mobile vs desktop
      const isNarrow = window.innerWidth < 768;
      orbMesh.position.x = isNarrow ? 0.0 : 1.85;
      orbMesh.position.y = isNarrow ? 1.1 : 0.25;
      wireMesh.position.copy(orbMesh.position);
      radarRing.position.copy(orbMesh.position);
    };

    onResize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    const targetColorA = new THREE.Color();
    const targetColorB = new THREE.Color();
    let orbMixCurrent = 1.0;
    let ribbonMixCurrent = 0.15;
    let hudMixCurrent = 0.0;
    let animId = 0;
    let frameCount = 0;
    let lastFpsSample = performance.now();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      animId = window.requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = prefersReducedMotion ? 0 : clock.getElapsedTime();
      const cfg = MODE_CONFIG[modeRef.current];

      smoothMouseX += (mouseX - smoothMouseX) * 0.06;
      smoothMouseY += (mouseY - smoothMouseY) * 0.06;
      pointerVelocity *= 0.94;

      orbMixCurrent += (cfg.orbMix - orbMixCurrent) * 0.07;
      ribbonMixCurrent += (cfg.ribbonMix - ribbonMixCurrent) * 0.07;
      hudMixCurrent += (cfg.hudMix - hudMixCurrent) * 0.07;

      targetColorA.set(cfg.primaryColor);
      targetColorB.set(cfg.secondaryColor);

      orbMat.uniforms.uTime.value = elapsed;
      orbMat.uniforms.uHover.value = pointerVelocity;
      orbMat.uniforms.uScroll.value = scrollProgress;
      orbMat.uniforms.uColorA.value.lerp(targetColorA, 0.08);
      orbMat.uniforms.uColorB.value.lerp(targetColorB, 0.08);
      orbMat.uniforms.uOpacity.value = orbMixCurrent * 0.92;

      const orbScale = Math.max(0.001, 0.45 + orbMixCurrent * 0.62);
      orbMesh.scale.setScalar(orbScale);
      orbMesh.rotation.y = elapsed * 0.16 + smoothMouseX * 0.45 + scrollProgress * 1.4;
      orbMesh.rotation.x = smoothMouseY * 0.28 + elapsed * 0.08;

      wireMesh.scale.setScalar(orbScale * 1.04);
      wireMesh.rotation.y = -elapsed * 0.11 + smoothMouseX * 0.35;
      wireMesh.rotation.z = elapsed * 0.07;
      wireMat.color.lerp(targetColorB, 0.08);
      wireMat.opacity = Math.max(0.03, orbMixCurrent * 0.16 + hudMixCurrent * 0.24);

      waveMat.uniforms.uTime.value = elapsed;
      waveMat.uniforms.uScroll.value = scrollProgress;
      waveMat.uniforms.uMouse.value.set(smoothMouseX, smoothMouseY);
      waveMat.uniforms.uColorA.value.lerp(targetColorA, 0.08);
      waveMat.uniforms.uColorB.value.lerp(targetColorB, 0.08);
      waveMat.uniforms.uOpacity.value = Math.max(
        0.05,
        ribbonMixCurrent * 0.2 + hudMixCurrent * 0.26
      );
      waveMesh.position.y = -1.75 + scrollProgress * 1.1;

      particleMat.color.lerp(targetColorB, 0.08);
      particleMat.opacity += (cfg.particleOpacity - particleMat.opacity) * 0.08;
      particles.rotation.y = elapsed * 0.03 + smoothMouseX * 0.14;
      particles.rotation.x = smoothMouseY * 0.08 - scrollProgress * 0.28;

      radarRing.rotation.z = elapsed * 0.22;
      radarRing.rotation.x = Math.PI * 0.12 + smoothMouseY * 0.35;
      radarRing.rotation.y = smoothMouseX * 0.35;
      ringMat.opacity = hudMixCurrent * 0.45;
      ringMat.color.lerp(targetColorA, 0.08);

      camera.position.x = smoothMouseX * 0.32;
      camera.position.y = smoothMouseY * 0.22 - scrollProgress * 0.45;
      camera.lookAt(0, -scrollProgress * 0.35, 0);

      renderer?.render(scene, camera);

      frameCount++;
      const now = performance.now();
      if (now - lastFpsSample >= 800) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsSample));
        setFpsEstimate(Math.min(120, Math.max(24, fps)));
        frameCount = 0;
        lastFpsSample = now;
      }
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      orbGeo.dispose();
      orbMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer?.dispose();
    };
  }, [setFpsEstimate, setWebglActive]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Mode-adaptive atmospheric gradient aura */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: mode === "clarity" || mode === "windows" ? 0 : 1,
          background:
            mode === "obsidian"
              ? "radial-gradient(60% 50% at 75% 20%, rgba(99,102,241,0.16), transparent 70%), radial-gradient(45% 45% at 20% 75%, rgba(34,211,238,0.1), transparent 70%)"
              : mode === "editorial"
                ? "radial-gradient(55% 45% at 80% 15%, rgba(217,78,40,0.08), transparent 70%), radial-gradient(50% 45% at 15% 80%, rgba(29,78,216,0.05), transparent 70%)"
                : "radial-gradient(55% 50% at 75% 25%, rgba(16,245,168,0.12), transparent 70%), radial-gradient(45% 45% at 20% 80%, rgba(0,216,255,0.08), transparent 70%)",
        }}
      />
      {/* Coordinate grid & texture layer */}
      <div className="reality-grid-bg absolute inset-0" />
      <div
        className="hud-scanline noise-overlay absolute inset-0 transition-opacity duration-500"
        style={{ opacity: mode === "clarity" || mode === "windows" ? 0 : 0.45 }}
      />
      {/* Persistent Three.js WebGL Stage */}
      <div
        ref={containerRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: mode === "clarity" || mode === "windows" ? 0 : 1 }}
      />
    </div>
  );
}
