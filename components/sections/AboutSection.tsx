"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Globe, Layers, Camera, Sparkles } from "lucide-react";

const features = [
  { icon: Globe,    tag: "01", title: "Web Development", desc: "Website modern, responsif, dan user-friendly yang mendukung performa bisnis Anda secara maksimal.",          accent: "#facc15", shadow: "rgba(250,204,21,0.35)" },
  { icon: Layers,   tag: "02", title: "Social Media",    desc: "Strategi pemasaran digital tepat sasaran untuk meningkatkan engagement dan konversi brand Anda.",            accent: "#fb923c", shadow: "rgba(251,146,60,0.35)" },
  { icon: Camera,   tag: "03", title: "Photo & Video",   desc: "Konten visual berkualitas tinggi untuk memperkuat identitas brand di semua platform digital.",                accent: "#4ade80", shadow: "rgba(74,222,128,0.35)" },
  { icon: Sparkles, tag: "04", title: "IT Solutions",    desc: "Solusi teknologi terintegrasi yang disesuaikan dengan kebutuhan spesifik bisnis Anda.",                      accent: "#60a5fa", shadow: "rgba(96,165,250,0.35)" },
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface SparkParticle {
  x: number; y: number; vx: number; vy: number;
  life: number; decay: number; len: number; angle: number;
}

// ── Lamp + Heading ────────────────────────────────────────────────────────────
function LampHeading() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const beamRef      = useRef<HTMLDivElement>(null);
  const h1Ref        = useRef<HTMLHeadingElement>(null);
  const lampLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let sparks: SparkParticle[] = [];
    let raf: number;
    let timer: ReturnType<typeof setTimeout>;
    let curIntensity = 1;
    let isKonslet = false;
    let tweenId = 0;

    // ── apply intensity ──────────────────────────────────────────────────────
    const apply = (v: number) => {
      curIntensity = v;
      if (beamRef.current) beamRef.current.style.opacity = String(v);
      if (lampLightRef.current) {
        const b = (v < 0.05 ? 0.08 : v * 0.88 + 0.12).toFixed(2);
        const s = (v * 0.8 + 0.2).toFixed(2);
        lampLightRef.current.style.filter = `brightness(${b}) saturate(${s})`;
      }
      if (h1Ref.current) {
        const spans = h1Ref.current.querySelectorAll<HTMLSpanElement>("span");
        if (spans[0]) {
          const r = Math.round(17  + (156 - 17)  * (1 - v));
          const g = Math.round(24  + (163 - 24)  * (1 - v));
          const b = Math.round(39  + (174 - 39)  * (1 - v));
          spans[0].style.color = `rgb(${r},${g},${b})`;
        }
        if (spans[1]) {
          const r = Math.round(250 + (156 - 250) * (1 - v));
          const g = Math.round(204 + (163 - 204) * (1 - v));
          const b = Math.round(21  + (174 - 21)  * (1 - v));
          spans[1].style.color = `rgb(${r},${g},${b})`;
          spans[1].style.textShadow = v > 0.92
            ? `0 0 30px rgba(250,204,21,${(v * 0.45).toFixed(2)})`
            : "none";
        }
      }
    };

    // ── cancellable tween — new call automatically cancels previous ──────────
    const tween = (target: number, ms: number, done?: () => void) => {
      const id = ++tweenId;
      const from = curIntensity, t0 = performance.now();
      const step = (now: number) => {
        if (tweenId !== id) return; // cancelled
        const p = Math.min((now - t0) / ms, 1);
        const e = p < .5 ? 2*p*p : -1+(4-2*p)*p;
        apply(from + (target - from) * e);
        if (p < 1) requestAnimationFrame(step); else done?.();
      };
      requestAnimationFrame(step);
    };

    // ── sparks ────────────────────────────────────────────────────────────────
    const spawnSparks = (n: number) => {
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.2;
        sparks.push({
          x: 0, y: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.025 + Math.random() * 0.035,
          len: 4 + Math.random() * 12,
          angle,
        });
      }
    };

    // ── interval konslet — random gelap/nyala ────────────────────────────────
    const schedule = () => {
      // jeda normal: 2–7 detik sebelum konslet berikutnya
      const normalMs = 2000 + Math.random() * 5000;
      timer = setTimeout(() => {
        // mulai konslet
        isKonslet = true;
        spawnSparks(20 + Math.floor(Math.random() * 15));
        tween(0.02, 220);
        // durasi konslet: 0.5–4 detik (random beneran)
        const darkMs = 500 + Math.random() * 3500;
        timer = setTimeout(() => {
          isKonslet = false;
          tween(1, 450, schedule); // nyala balik lalu jadwalkan berikutnya
        }, darkMs);
      }, normalMs);
    };

    // ── render loop ──────────────────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isKonslet && curIntensity < 0.12 && Math.random() < 0.3) {
        spawnSparks(1 + Math.floor(Math.random() * 2));
      }
      if (sparks.length) {
        const ox = canvas.width * 0.5, oy = 30;
        ctx.save();
        sparks.forEach(s => {
          if (s.life <= 0) return;
          s.x += s.vx; s.y += s.vy; s.vy += 0.06;
          s.life -= s.decay;
          const alpha = s.life;
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = Math.random() > 0.4 ? "#facc15" : "#ffffff";
          ctx.lineWidth = 1 + s.life;
          ctx.shadowBlur = 8; ctx.shadowColor = "#facc15";
          ctx.beginPath();
          let px = ox + s.x, py = oy + s.y;
          ctx.moveTo(px, py);
          for (let k = 0; k < 3; k++) {
            px += (Math.random() - 0.5) * s.len;
            py += (Math.random() - 0.3) * s.len;
            ctx.lineTo(px, py);
          }
          ctx.stroke();
          ctx.globalAlpha = alpha * 0.9;
          ctx.fillStyle = "#fff9c4";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(ox + s.x, oy + s.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        sparks = sparks.filter(s => s.life > 0);
        ctx.restore();
      }
      raf = requestAnimationFrame(render);
    };

    apply(1);
    render();
    schedule();
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ paddingTop: "6px" }}>

      {/* ── spark canvas — positioned over bulb ── */}
      <canvas
        ref={canvasRef}
        width={160} height={100}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: "-34px", top: "56px", zIndex: 10 }}
      />

      {/* ── Lamp SVG — brightness filter dikontrol via div wrapper ── */}
      <div
        ref={lampLightRef}
        style={{ position: "absolute", left: 0, top: 0, transition: "filter 0.06s ease" }}
      >
        <svg
          aria-hidden
          width="58" height="220"
          viewBox="0 0 58 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="hoodSide" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#6b7280"/>
              <stop offset="30%"  stopColor="#9ca3af"/>
              <stop offset="70%"  stopColor="#d1d5db"/>
              <stop offset="100%" stopColor="#9ca3af"/>
            </linearGradient>
            <linearGradient id="hoodFace" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e5e7eb"/>
              <stop offset="100%" stopColor="#f3f4f6"/>
            </linearGradient>
            <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#9ca3af"/>
              <stop offset="50%"  stopColor="#e5e7eb"/>
              <stop offset="100%" stopColor="#9ca3af"/>
            </linearGradient>
            <radialGradient id="bulbFill" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#fffde7"/>
              <stop offset="60%"  stopColor="#fef9c3"/>
              <stop offset="100%" stopColor="#fde68a"/>
            </radialGradient>
            <radialGradient id="haloGrad" cx="50%" cy="20%" r="80%">
              <stop offset="0%"   stopColor="#facc15" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#facc15" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <path d="M29 0 C27 6,31 12,29 20" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="22" y="19" width="14" height="4" rx="2" fill="#4b5563"/>
          <rect x="24" y="21" width="10" height="2" rx="1" fill="#6b7280"/>
          <rect x="27" y="23" width="4" height="20" rx="2" fill="url(#neckGrad)"/>
          <rect x="22" y="41" width="14" height="8" rx="3.5" fill="url(#neckGrad)"/>
          <ellipse cx="29" cy="41" rx="7" ry="2.5" fill="#d1d5db"/>
          <path d="M15 49 L43 49 L54 82 L4 82 Z" fill="url(#hoodSide)" stroke="#9ca3af" strokeWidth="0.5"/>
          <path d="M18 51 L40 51 L50 80 L8 80 Z" fill="url(#hoodFace)"/>
          <path d="M15 49 L43 49" stroke="#e5e7eb" strokeWidth="1" strokeLinecap="round"/>
          <path d="M4 82 L54 82" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 82 L4 84 Q29 87 54 84 L54 82" fill="#d1d5db" stroke="none"/>
          <ellipse cx="29" cy="79" rx="11" ry="14" fill="url(#bulbFill)" stroke="#e5e7eb" strokeWidth="0.75"/>
          <ellipse cx="25" cy="73" rx="3.5" ry="4.5" fill="white" fillOpacity="0.35"/>
          <path d="M25 77 Q27 72 29 77 Q31 72 33 77" stroke="#d97706" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <ellipse cx="29" cy="82" rx="30" ry="18" fill="url(#haloGrad)"/>
        </svg>
      </div>

      {/* ── Beam: satu layer V halus ── */}
      <div
        ref={beamRef}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: "29px", top: "104px", transition: "opacity 0.06s ease" }}
      >
        <div style={{
          position: "absolute",
          left: "-140px", top: "0",
          width: "280px", height: "200px",
          background: "linear-gradient(to bottom, rgba(250,204,21,0.32) 0%, rgba(250,204,21,0.14) 35%, rgba(250,204,21,0.04) 70%, transparent 100%)",
          clipPath: "polygon(50% 0%, 6% 100%, 94% 100%)",
        }}/>
      </div>

      {/* ── Heading — sits to the right of lamp ── */}
      <h2
        ref={h1Ref}
        className="relative text-5xl font-black leading-[1.05] md:text-6xl"
        style={{ paddingLeft: "68px", paddingTop: "8px" }}
      >
        <span style={{ display: "block", color: "#111827", transition: "color 0.1s ease" }}>
          Cahaya di
        </span>
        <span
          className="italic"
          style={{
            display: "block",
            color: "#facc15",
            textShadow: "0 0 30px rgba(250,204,21,0.45)",
            transition: "color 0.1s ease, text-shadow 0.1s ease",
          }}
        >
          Era Digital
        </span>
      </h2>
    </div>
  );
}

// ── FeatureCard ───────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, tag, title, desc, accent, shadow }: (typeof features)[0]) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = cardRef.current; if (!c) return;
    const { left, top, width, height } = c.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    setTilt({ x: -(y/height-.5)*12, y: (x/width-.5)*12, shineX: (x/width)*100, shineY: (y/height)*100, opacity: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt(s => ({...s, x:0, y:0, opacity:0})); setHovered(false); }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease, box-shadow 0.25s ease",
        transformStyle: "preserve-3d",
        boxShadow: hovered ? `0 20px 60px -10px ${shadow},0 8px 20px -8px ${shadow}` : "0 1px 4px rgba(0,0,0,0.05)",
      }}
      className="group relative overflow-hidden rounded-3xl border border-black/8 bg-white/80 p-7 backdrop-blur-md cursor-default"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ opacity: tilt.opacity * 0.1, background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, white 0%, transparent 65%)` }}/>
      <div className="absolute right-6 top-6 h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: accent }}/>
      <p className="mb-5 text-[11px] font-bold tracking-[0.2em] text-black/20">{tag}</p>
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: accent + "22" }}>
        <Icon className="h-5 w-5" style={{ color: accent === "#facc15" ? "#a16207" : accent }}/>
      </div>
      <h3 className="mb-2.5 text-lg font-black text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  );
}

// ── AboutSection ──────────────────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-32">
      <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
            — Tentang Kami
          </p>

          <LampHeading />

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/8"/>
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"/>
            <div className="h-px w-8 bg-black/8"/>
          </div>

          <p className="text-base leading-8 text-gray-500">
            Kunang Kunang Creative adalah perusahaan kreatif yang bergerak di
            bidang Social Media Management, Pengembangan Website, dan Teknologi
            Informasi. Seperti kunang-kunang yang membawa cahaya di kegelapan,
            kami berkomitmen membantu brand Anda bersinar.
          </p>
          <p className="mt-4 text-base leading-8 text-gray-500">
            Kami menggabungkan keahlian teknis dengan pendekatan kreatif untuk
            menghasilkan solusi yang tidak hanya indah, tetapi berdampak nyata
            pada pertumbuhan bisnis Anda.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline-offset-4 hover:underline">
            Kenali tim kami <ArrowUpRight className="h-4 w-4"/>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(f => <FeatureCard key={f.title} {...f}/>)}
        </div>
      </div>
    </section>
  );
}