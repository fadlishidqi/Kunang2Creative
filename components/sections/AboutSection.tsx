"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Globe, Layers, Camera, Sparkles } from "lucide-react";

const features = [
  {
    icon: Globe,
    tag: "01",
    title: "Web Development",
    desc: "Website modern, responsif, dan user-friendly yang mendukung performa bisnis Anda secara maksimal.",
    accent: "#facc15",
    shadow: "rgba(250,204,21,0.35)",
  },
  {
    icon: Layers,
    tag: "02",
    title: "Social Media",
    desc: "Strategi pemasaran digital tepat sasaran untuk meningkatkan engagement dan konversi brand Anda.",
    accent: "#fb923c",
    shadow: "rgba(251,146,60,0.35)",
  },
  {
    icon: Camera,
    tag: "03",
    title: "Photo & Video",
    desc: "Konten visual berkualitas tinggi untuk memperkuat identitas brand di semua platform digital.",
    accent: "#4ade80",
    shadow: "rgba(74,222,128,0.35)",
  },
  {
    icon: Sparkles,
    tag: "04",
    title: "IT Solutions",
    desc: "Solusi teknologi terintegrasi yang disesuaikan dengan kebutuhan spesifik bisnis Anda.",
    accent: "#60a5fa",
    shadow: "rgba(96,165,250,0.35)",
  },
];

function FlashText() {
  const text = "Era Digital";
  const letters = text.split("");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let i = 0;
    const run = () => {
      setActive(i);
      i++;
      if (i < letters.length) {
        setTimeout(run, 80);
      } else {
        setTimeout(() => setActive(null), 300);
        setTimeout(() => { i = 0; run(); }, 2200);
      }
    };
    const t = setTimeout(run, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="italic">
      {letters.map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transition: "color 0.08s ease, text-shadow 0.08s ease",
            color: active !== null && i <= active ? "#facc15" : "#d1d5db",
            textShadow:
              active !== null && i <= active
                ? "0 0 24px rgba(250,204,21,0.7), 0 0 48px rgba(250,204,21,0.3)"
                : "none",
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </span>
  );
}

function FeatureCard({
  icon: Icon,
  tag,
  title,
  desc,
  accent,
  shadow,
}: (typeof features)[0]) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const cx = x / width - 0.5;
    const cy = y / height - 0.5;
    setTilt({ x: -cy * 12, y: cx * 12, shineX: (x / width) * 100, shineY: (y / height) * 100, opacity: 1 });
  }

  function onLeave() {
    setTilt((s) => ({ ...s, x: 0, y: 0, opacity: 0 }));
    setHovered(false);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease, box-shadow 0.25s ease",
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? `0 20px 60px -10px ${shadow}, 0 8px 20px -8px ${shadow}`
          : "0 1px 4px rgba(0,0,0,0.05)",
      }}
      className="group relative overflow-hidden rounded-3xl border border-black/8 bg-white/80 p-7 backdrop-blur-md cursor-default"
    >
      {/* Shine */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          opacity: tilt.opacity * 0.1,
          background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, white 0%, transparent 65%)`,
        }}
      />

      {/* Accent dot */}
      <div
        className="absolute right-6 top-6 h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150"
        style={{ background: accent }}
      />

      <p className="mb-5 text-[11px] font-bold tracking-[0.2em] text-black/20">{tag}</p>

      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ background: accent + "22" }}
      >
        <Icon className="h-5 w-5" style={{ color: accent === "#facc15" ? "#a16207" : accent }} />
      </div>

      <h3 className="mb-2.5 text-lg font-black text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-32">
      <div className="grid gap-20 lg:grid-cols-2 lg:items-start">

        {/* Kiri */}
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
            — Tentang Kami
          </p>

          <h2 className="text-5xl font-black leading-[1.05] text-gray-900 md:text-6xl">
            Cahaya di<br />
            <FlashText />
          </h2>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/8" />
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            <div className="h-px w-8 bg-black/8" />
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
            Kenali tim kami <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Kanan */}
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}