"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Blade {
  x: number;
  height: number;
  width: number;
  color: string;
  phase: number;
  speed: number;
  amplitude: number;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glowPhase: number;
  glowSpeed: number;
  turnTimer: number;
  turnInterval: number;
  hue: number;
}

const BLADE_COLORS = [
  "#4a7c2f", "#5a9e3a", "#3d6b28", "#6db84a",
  "#2e5520", "#7acc55", "#558b2f", "#388e3c",
];

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    let blades: Blade[] = [];
    let fireflies: Firefly[] = [];

    function buildBlades() {
      blades = [];
      const count = Math.ceil(W / 9) + 4;
      for (let i = 0; i < count; i++) {
        blades.push({
          x: i * 9 + (Math.random() * 6 - 3),
          height: 45 + Math.random() * 65,
          width: 3 + Math.random() * 4,
          color: BLADE_COLORS[Math.floor(Math.random() * BLADE_COLORS.length)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 0.8,
          amplitude: 0.04 + Math.random() * 0.06,
        });
      }
    }

    function buildFireflies() {
      fireflies = [];
      for (let i = 0; i < 25; i++) {
        fireflies.push({
          x: Math.random() * W,
          y: Math.random() * (H - 130) + 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.4,
          glowPhase: Math.random() * Math.PI * 2,
          glowSpeed: 0.6 + Math.random() * 1.2,
          turnTimer: 0,
          turnInterval: 80 + Math.floor(Math.random() * 160),
          hue: 20 + Math.floor(Math.random() * 35),
        });
      }
    }

    function drawBlade(b: Blade, t: number) {
      const sway = Math.sin(t * b.speed + b.phase) * b.amplitude;
      const tipX = b.x + Math.sin(sway) * b.height;
      const tipY = H - b.height;
      ctx.beginPath();
      ctx.moveTo(b.x - b.width / 2, H);
      ctx.bezierCurveTo(
        b.x - b.width * 0.6 + sway * b.height * 0.3, H - b.height * 0.5,
        tipX - b.width * 0.3, tipY + b.height * 0.2,
        tipX, tipY
      );
      ctx.bezierCurveTo(
        tipX + b.width * 0.3, tipY + b.height * 0.2,
        b.x + b.width * 0.6 + sway * b.height * 0.3, H - b.height * 0.5,
        b.x + b.width / 2, H
      );
      ctx.closePath();
      const grad = ctx.createLinearGradient(b.x, H, tipX, tipY);
      grad.addColorStop(0, b.color + "cc");
      grad.addColorStop(0.6, b.color + "aa");
      grad.addColorStop(1, b.color + "44");
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function drawFirefly(ff: Firefly, t: number) {
      const brightness = (Math.sin(t * ff.glowSpeed + ff.glowPhase) + 1) / 2;
      if (brightness < 0.08) return;
      const r = 2.5 + brightness * 1.5;
      const h = ff.hue;
      const outerGlow = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, r * 5.5);
      outerGlow.addColorStop(0, `hsla(${h},100%,60%,${brightness * 0.55})`);
      outerGlow.addColorStop(0.4, `hsla(${h},100%,55%,${brightness * 0.18})`);
      outerGlow.addColorStop(1, `hsla(${h},100%,50%,0)`);
      ctx.beginPath();
      ctx.arc(ff.x, ff.y, r * 5.5, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();
      const midGlow = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, r * 2.5);
      midGlow.addColorStop(0, `hsla(${h + 10},100%,75%,${brightness * 0.8})`);
      midGlow.addColorStop(1, `hsla(${h},100%,60%,0)`);
      ctx.beginPath();
      ctx.arc(ff.x, ff.y, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = midGlow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ff.x, ff.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${h + 15},100%,88%,${0.75 + brightness * 0.25})`;
      ctx.fill();
    }

    function updateFirefly(ff: Firefly) {
      ff.turnTimer++;
      if (ff.turnTimer >= ff.turnInterval) {
        ff.vx += (Math.random() - 0.5) * 0.5;
        ff.vy += (Math.random() - 0.5) * 0.35;
        const spd = Math.sqrt(ff.vx * ff.vx + ff.vy * ff.vy);
        if (spd > 1) { ff.vx = ff.vx / spd; ff.vy = (ff.vy / spd) * 0.8; }
        ff.turnTimer = 0;
        ff.turnInterval = 80 + Math.floor(Math.random() * 160);
      }
      ff.x += ff.vx;
      ff.y += ff.vy;
      if (ff.x < 0) ff.x = W;
      if (ff.x > W) ff.x = 0;
      if (ff.y < 0) { ff.y = 0; ff.vy *= -1; }
      if (ff.y > H - 120) { ff.y = H - 120; ff.vy *= -1; }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas?.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      buildBlades();
      buildFireflies();
    }

    function render(ts: number) {
      const t = ts / 1000;
      ctx.clearRect(0, 0, W, H);
      const groundGrad = ctx.createLinearGradient(0, H - 60, 0, H);
      groundGrad.addColorStop(0, "rgba(212,237,218,0)");
      groundGrad.addColorStop(1, "rgba(197,230,208,0.55)");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, H - 60, W, 60);
      blades.forEach((b) => { if (b.height < 60) drawBlade(b, t); });
      fireflies.forEach((ff) => { updateFirefly(ff); drawFirefly(ff, t); });
      blades.forEach((b) => { if (b.height >= 60) drawBlade(b, t); });
      animRef.current = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // ── Avatar data buat social proof ──────────────────────────────────────────
  const avatars = [
    { initials: "AR", bg: "bg-orange-400" },
    { initials: "BW", bg: "bg-violet-500" },
    { initials: "CK", bg: "bg-cyan-500" },
    { initials: "DM", bg: "bg-pink-500" },
    { initials: "ES", bg: "bg-emerald-500" },
  ];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#fafafa] px-4 pb-16 pt-24">

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Sky vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(248,247,255,0.55) 0%, transparent 70%)",
        }}
      />

      {/* ── Konten ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Semarang's No.1 Digital Creative
        </p>

        {/* Headline utama */}
        <h1 className="max-w-4xl text-[clamp(2.8rem,8vw,7rem)] font-black leading-[0.9] tracking-tight">
          <span className="block text-gray-900">We Make</span>
          <span className="block italic text-yellow-400">Brands</span>
          <span className="block text-gray-900">Shine.</span>
        </h1>

        {/* Sub copy */}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-500 md:text-[17px]">
          Konten yang{" "}
          <span className="font-semibold text-gray-700">stop-the-scroll</span>.
          Website yang bikin orang{" "}
          <span className="font-semibold text-gray-700">balik lagi</span>.
          Brand identity yang{" "}
          <span className="font-semibold text-gray-700">nempel di kepala</span>.
          That's what we do.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-black text-black shadow-lg shadow-yellow-200 transition-all hover:bg-yellow-300 hover:shadow-yellow-300 active:scale-95"
          >
            Let's Cook
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-8 py-3.5 text-sm font-medium text-gray-700 backdrop-blur-md transition-all hover:border-black/20 hover:bg-white active:scale-95"
          >
            Lihat Karya
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>   

        {/* Social proof */}
        <div className="mt-5 flex items-center gap-3">
          {/* Avatar stack */}
          <div className="flex">
            {avatars.map((av, i) => (
              <div
                key={av.initials}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#fafafa] text-[9px] font-bold text-white ${av.bg} ${
                  i !== 0 ? "-ml-2" : ""
                }`}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="text-[11px] text-yellow-500 tracking-wide">★★★★★</div>
            <p className="text-[11px] text-gray-500">
              Dipercaya{" "}
              <span className="font-bold text-gray-800">20+ brand</span>{" "}
              di Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}