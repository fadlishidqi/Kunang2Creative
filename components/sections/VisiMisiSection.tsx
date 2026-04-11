"use client";

import { useRef, useState, useCallback } from "react";

type Seg = { text: string; hi?: true };
const VISI_SEGS: Seg[] = [
  { text: "Menjadi " },
  { text: "perusahaan kreatif terdepan", hi: true },
  { text: " yang membantu brand " },
  { text: "berkembang secara digital", hi: true },
  { text: " melalui " },
  { text: "strategi media sosial yang inovatif", hi: true },
  { text: " dan pengembangan " },
  { text: "website yang modern & efektif", hi: true },
  { text: ", berorientasi pada " },
  { text: "hasil nyata", hi: true },
  { text: "." },
];

const misiList = [
  "Layanan sosial media kreatif & berbasis data",
  "Website responsif sesuai kebutuhan spesifik",
  "Solusi digital terintegrasi end-to-end",
  "Mengutamakan kualitas & kepuasan klien",
  "Mengikuti tren digital & teknologi terkini",
  "Hubungan jangka panjang yang transparan",
];

const tujuanList = [
  "Meningkatkan visibilitas & daya saing klien",
  "Menjadi mitra terpercaya jangka panjang",
  "Menghasilkan karya digital berdampak nyata",
  "Pertumbuhan perusahaan berkelanjutan",
  "Portofolio berkualitas & beragam industri",
  "Tim kreatif kompeten & berintegritas",
];
function VisiWords({ lensLayer }: { lensLayer?: boolean }) {
  return (
    <>
      {VISI_SEGS.map((seg, i) =>
        seg.hi ? (
          <span key={i} className={lensLayer ? "text-yellow-400" : "text-yellow-500"}>
            {seg.text}
          </span>
        ) : (
          <span key={i} className={lensLayer ? "text-yellow-400" : "text-gray-700"}>
            {seg.text}
          </span>
        )
      )}
    </>
  );
}
const LENS_R = 90;

function VisiStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onLeave = useCallback(() => setPos(null), []);

  const textClass =
    "text-2xl font-bold leading-relaxed md:text-[2rem] md:leading-relaxed [font-family:var(--font-pixelify)]";

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative max-w-4xl cursor-default select-none"
    >
      <p className={textClass}><VisiWords /></p>

      {pos && (
        <p
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${textClass}`}
          style={{ clipPath: `circle(${LENS_R}px at ${pos.x}px ${pos.y}px)` }}
        >
          <VisiWords lensLayer />
        </p>
      )}

      {/* Cincin kaca */}
      {pos && (
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: LENS_R * 2,
            height: LENS_R * 2,
            left: pos.x - LENS_R,
            top: pos.y - LENS_R,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 55%, transparent 75%)",
            boxShadow:
              "0 0 0 1px rgba(250,204,21,0.45), 0 0 0 2.5px rgba(255,255,255,0.12), 0 6px 28px rgba(250,204,21,0.18)",
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
          }}
        />
      )}
    </div>
  );
}

// ── VisiMisiSection ───────────────────────────────────────────────────────────
export function VisiMisiSection() {
  return (
    <section className="border-y border-black/5 bg-white/40 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
            — DNA Perusahaan
          </p>
          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            Arah & Komitmen
          </h2>
        </div>

        {/* Visi */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">
              01 — Visi
            </span>
            <div className="h-px flex-1 bg-black/8" />
          </div>
          <VisiStatement />
        </div>


        {/* Misi + Tujuan */}
        <div className="grid gap-16 md:grid-cols-2">

          {/* Misi */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">
                02 — Misi
              </span>
              <div className="h-px flex-1 bg-black/8" />
            </div>
            <ul className="space-y-0">
              {misiList.map((m, i) => (
                <li
                  key={m}
                  className="flex items-baseline gap-5 border-b border-black/5 py-4 last:border-0"
                >
                  <span className="shrink-0 text-[11px] font-bold tabular-nums text-yellow-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-600">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tujuan */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">
                03 — Tujuan
              </span>
              <div className="h-px flex-1 bg-black/8" />
            </div>
            <ul className="space-y-0">
              {tujuanList.map((t, i) => (
                <li
                  key={t}
                  className="flex items-baseline gap-5 border-b border-black/5 py-4 last:border-0"
                >
                  <span className="shrink-0 text-[11px] font-bold tabular-nums text-yellow-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-600">{t}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
