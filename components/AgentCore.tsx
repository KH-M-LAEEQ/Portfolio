"use client";

import { useEffect, useRef } from "react";

type Vec = { x: number; y: number; z: number };
type Pulse = { from: number; to: number; t: number; speed: number };
type Ripple = { x: number; y: number; r: number; life: number };

const POINTS = 240;
const NEIGHBOURS = 3;
const MAX_PULSES = 14;

function readColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    ink: s.getPropertyValue("--foreground").trim() || "#1a1a1a",
    accent: s.getPropertyValue("--accent").trim() || "#8a6417",
  };
}

/** Evenly spread points on a unit sphere (Fibonacci lattice). */
function fibonacciSphere(n: number): Vec[] {
  const points: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

function nearestEdges(points: Vec[], k: number): [number, number][] {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push(i < j ? [i, j] : [j, i]);
      }
    }
  });
  return edges;
}

/**
 * The hero centerpiece: a slowly turning sphere of connected nodes — the
 * "agent" — drawn as fine line art, with signals running along its edges and
 * tool-call satellites in orbit. It leans toward the cursor; a click sends a ripple.
 */
export default function AgentCore({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = fibonacciSphere(POINTS);
    const edges = nearestEdges(base, NEIGHBOURS);
    const neighbours: number[][] = base.map(() => []);
    for (const [a, b] of edges) {
      neighbours[a].push(b);
      neighbours[b].push(a);
    }
    // A handful of "hot" nodes are picked out in the accent colour.
    const hot = new Set(Array.from({ length: 12 }, () => Math.floor(Math.random() * POINTS)));

    let width = 0;
    let height = 0;
    let colors = readColors();
    let spin = 0;
    let tiltX = 0.35;
    let tiltY = 0;
    let targetTiltX = 0.35;
    let targetTiltY = 0;
    let pulses: Pulse[] = [];
    let ripples: Ripple[] = [];
    let projected: { x: number; y: number; z: number; s: number }[] = [];
    let frame = 0;
    let running = false;
    let inView = true;
    let time = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw();
    }

    function project() {
      const cx = width / 2;
      // In the tall desktop layout the console floats over the lower part of
      // the canvas, so lift the sphere and let the console rest on its base.
      const cy = height * (height > 560 ? 0.37 : 0.5);
      const radius = Math.min(width, height) * 0.36;
      const focal = 3.2;
      const cosY = Math.cos(spin + tiltY);
      const sinY = Math.sin(spin + tiltY);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      projected = base.map((p) => {
        // Rotate around Y (spin + horizontal lean), then X (vertical lean).
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const s = focal / (focal + z2);
        return { x: cx + x1 * radius * s, y: cy + y2 * radius * s, z: z2, s };
      });
      return { cx, cy, radius };
    }

    function drawOrbit(cx: number, cy: number, rx: number, ry: number, rot: number, phase: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(rot);
      ctx!.globalAlpha = 0.18;
      ctx!.strokeStyle = colors.ink;
      ctx!.lineWidth = 0.8;
      ctx!.setLineDash([2, 6]);
      ctx!.beginPath();
      ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.setLineDash([]);
      // The satellite: a tool call travelling the orbit.
      ctx!.globalAlpha = 0.9;
      ctx!.fillStyle = colors.accent;
      ctx!.beginPath();
      ctx!.arc(Math.cos(phase) * rx, Math.sin(phase) * ry, 3, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const { cx, cy, radius } = project();

      drawOrbit(cx, cy, radius * 1.42, radius * 0.42, -0.35, time * 0.008);
      drawOrbit(cx, cy, radius * 1.22, radius * 0.3, 0.55, -time * 0.006 + 2);

      // Fine line edges: back faces nearly invisible, front faces crisp.
      ctx!.lineWidth = 0.7;
      ctx!.strokeStyle = colors.ink;
      for (const [a, b] of edges) {
        const p = projected[a];
        const q = projected[b];
        const depth = 1 - ((p.z + q.z) / 2 + 1) / 2; // 1 = front, 0 = back
        ctx!.globalAlpha = 0.03 + depth * 0.4;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(q.x, q.y);
        ctx!.stroke();
      }

      projected.forEach((p, i) => {
        const depth = 1 - (p.z + 1) / 2;
        const isHot = hot.has(i);
        ctx!.globalAlpha = isHot ? 0.35 + depth * 0.65 : 0.08 + depth * 0.5;
        ctx!.fillStyle = isHot ? colors.accent : colors.ink;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, (isHot ? 2.4 : 1.1) * p.s, 0, Math.PI * 2);
        ctx!.fill();
      });

      ctx!.fillStyle = colors.accent;
      for (const p of pulses) {
        const a = projected[p.from];
        const b = projected[p.to];
        const depth = 1 - ((a.z + b.z) / 2 + 1) / 2;
        ctx!.globalAlpha = 0.25 + depth * 0.75;
        ctx!.beginPath();
        ctx!.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.strokeStyle = colors.accent;
      ctx!.lineWidth = 1;
      for (const r of ripples) {
        ctx!.globalAlpha = r.life * 0.6;
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    function update() {
      time += 1;
      spin += 0.0022;
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;

      if (pulses.length < MAX_PULSES && Math.random() < 0.045) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: a, to: b, t: 0, speed: 0.018 + Math.random() * 0.02 });
      }
      const next: Pulse[] = [];
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t < 1) next.push(p);
        else if (Math.random() < 0.6 && next.length < MAX_PULSES) {
          const options = neighbours[p.to].filter((n) => n !== p.from);
          if (options.length) {
            next.push({
              from: p.to,
              to: options[Math.floor(Math.random() * options.length)],
              t: 0,
              speed: p.speed,
            });
          }
        }
      }
      pulses = next;

      ripples = ripples
        .map((r) => ({ ...r, r: r.r + 4, life: r.life - 0.018 }))
        .filter((r) => r.life > 0);
    }

    function loop() {
      update();
      draw();
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const ny = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      targetTiltY = Math.max(-0.6, Math.min(0.6, nx * 1.2));
      targetTiltX = 0.35 + Math.max(-0.5, Math.min(0.5, ny * 1.0));
    }

    function onPointerDown(event: PointerEvent) {
      if (reduceMotion) return;
      if ((event.target as Element | null)?.closest("a, button, input, textarea, label")) return;
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      let nearest = -1;
      let best = Infinity;
      projected.forEach((p, i) => {
        if (p.z > 0.2) return; // only nodes on the visible face
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      ripples.push({ x, y, r: 4, life: 1 });
      if (nearest === -1 || best > 120) return;
      for (const to of neighbours[nearest]) {
        pulses.push({ from: nearest, to, t: 0, speed: 0.035 });
      }
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    viewObserver.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // Absolutely positioned so the canvas's own pixel size can never feed back into layout.
      className={`absolute inset-0 block h-full w-full ${className}`}
    />
  );
}
