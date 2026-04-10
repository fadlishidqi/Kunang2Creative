import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Sparkles, Globe, Camera, Layers } from "lucide-react";

export default async function Home() {
  const portfolios = await prisma.portfolio.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative w-full overflow-x-hidden bg-[#060606] text-white selection:bg-yellow-400 selection:text-black">

      {/* ── AMBIENT LIGHT ───────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-yellow-400/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-60 h-[500px] w-[500px] rounded-full bg-white/4 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-yellow-500/5 blur-[100px]" />
        {/* grain texture */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16">

        {/* pill badge */}
        <div className="mb-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-400 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-yellow-400" />
          Digital Creative Agency — Semarang
        </div>

        {/* headline */}
        <h1 className="max-w-5xl text-center text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.9] tracking-tight">
          <span className="block text-white">We Make</span>
          <span className="block italic text-yellow-400">Brands</span>
          <span className="block text-white">Shine.</span>
        </h1>

        {/* sub */}
        <p className="mt-8 max-w-xl text-center text-base leading-relaxed text-gray-400 md:text-lg">
          Mitra strategis pertumbuhan digital Anda — dari identitas visual,
          social media, hingga teknologi web yang berdampak nyata.
        </p>

        {/* cta row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-yellow-300 active:scale-95"
          >
            Mulai Proyek Anda
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
          >
            Lihat Karya
          </Link>
        </div>

        {/* stat strip */}
        <div className="mt-20 flex flex-wrap justify-center gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl">
          {[
            { n: "120+", label: "Proyek Selesai" },
            { n: "80+", label: "Klien Puas" },
            { n: "3+", label: "Tahun Berpengalaman" },
            { n: "4.9★", label: "Rating Rata-rata" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center px-10 py-6">
              <span className="text-3xl font-black text-yellow-400">{s.n}</span>
              <span className="mt-1 text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. MARQUEE
      ══════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-white/8 py-5">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(4).fill(["Social Media", "Web Development", "UI/UX Design", "Video Production", "Brand Identity", "IT Solutions"]).flat().map((t, i) => (
            <span key={i} className="mx-8 text-sm font-medium uppercase tracking-[0.15em] text-gray-600">
              {t} <span className="mx-6 text-yellow-500/60">✦</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        `}</style>
      </div>

      {/* ══════════════════════════════════════════════════
          3. TENTANG KAMI
      ══════════════════════════════════════════════════ */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* left text */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">— Tentang Kami</p>
            <h2 className="text-5xl font-black leading-tight md:text-6xl">
              Cahaya di<br />
              <span className="italic text-gray-500">Era Digital</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-400">
              Kunang Kunang Creative adalah perusahaan kreatif yang bergerak di
              bidang Social Media Management, Pengembangan Website, dan Teknologi
              Informasi. Seperti kunang-kunang yang membawa cahaya di kegelapan,
              kami berkomitmen membantu brand Anda bersinar.
            </p>
            <p className="mt-4 text-base leading-8 text-gray-400">
              Kami menggabungkan keahlian teknis dengan pendekatan kreatif untuk
              menghasilkan solusi yang tidak hanya indah, tetapi berdampak nyata
              pada pertumbuhan bisnis Anda.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-yellow-400 hover:underline cursor-pointer">
              Kenali tim kami <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* right cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <Globe className="h-5 w-5" />, title: "Web Development", desc: "Website modern, responsif, dan user-friendly yang mendukung performa bisnis." },
              { icon: <Layers className="h-5 w-5" />, title: "Social Media", desc: "Strategi pemasaran digital tepat sasaran untuk meningkatkan engagement." },
              { icon: <Camera className="h-5 w-5" />, title: "Photo & Video", desc: "Konten visual berkualitas tinggi untuk memperkuat identitas brand." },
              { icon: <Sparkles className="h-5 w-5" />, title: "IT Solutions", desc: "Solusi teknologi terintegrasi disesuaikan kebutuhan bisnis Anda." },
            ].map((c) => (
              <div
                key={c.title}
                className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-md transition-all hover:border-yellow-400/30 hover:bg-yellow-400/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/20 transition-all group-hover:bg-yellow-400/20">
                  {c.icon}
                </div>
                <h3 className="font-bold text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. VISI, MISI, TUJUAN
      ══════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/8 bg-white/[0.02] py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">— DNA Perusahaan</p>
            <h2 className="text-4xl font-black md:text-5xl">Arah & Komitmen</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Visi */}
            <div className="relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-8 backdrop-blur-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-yellow-400/10 blur-2xl" />
              <span className="text-5xl font-black text-yellow-400/20">01</span>
              <h3 className="mt-4 text-xl font-black text-yellow-400">Visi</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Menjadi perusahaan kreatif terdepan yang membantu brand berkembang
                secara digital melalui strategi media sosial yang inovatif dan
                pengembangan website yang modern, efektif, dan berorientasi pada hasil.
              </p>
            </div>

            {/* Misi */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
              <span className="text-5xl font-black text-white/10">02</span>
              <h3 className="mt-4 text-xl font-black text-white">Misi</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Layanan sosial media kreatif & berbasis data",
                  "Website responsif sesuai kebutuhan spesifik",
                  "Solusi digital terintegrasi end-to-end",
                  "Mengutamakan kualitas & kepuasan klien",
                  "Mengikuti tren digital & teknologi terkini",
                  "Hubungan jangka panjang yang transparan",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tujuan */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
              <span className="text-5xl font-black text-white/10">03</span>
              <h3 className="mt-4 text-xl font-black text-white">Tujuan</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Meningkatkan visibilitas & daya saing klien",
                  "Menjadi mitra terpercaya jangka panjang",
                  "Menghasilkan karya digital berdampak nyata",
                  "Pertumbuhan perusahaan berkelanjutan",
                  "Portofolio berkualitas & beragam industri",
                  "Tim kreatif kompeten & berintegritas",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. SERVICES
      ══════════════════════════════════════════════════ */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-32">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">— Layanan</p>
            <h2 className="text-4xl font-black md:text-5xl">Apa Yang<br />Kami Buat</h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-gray-500">
            Solusi digital komprehensif — dari strategi hingga eksekusi, semua dikerjakan dengan standar premium.
          </p>
        </div>

        <div className="space-y-4">
          {/* row 1 — large */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="group relative col-span-2 overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl transition-all hover:border-yellow-400/20 hover:bg-yellow-400/4 md:p-10">
              <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all group-hover:border-yellow-400/50 group-hover:text-yellow-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <Badge className="mb-6 bg-yellow-400/15 text-yellow-400 border-yellow-400/20 text-xs font-semibold tracking-wider">Social Media & Design</Badge>
              <h3 className="text-2xl font-black">Identitas Visual & Konten</h3>
              <p className="mt-3 text-sm leading-7 text-gray-500">Desain grafis, konten media sosial, company profile, poster, katalog, dan semua kebutuhan visual brand Anda.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Instagram Post", "Instagram Story", "Company Profile", "Kartu Nama", "Poster", "Brosur", "Katalog", "Banner"].map((i) => (
                  <span key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">{i}</span>
                ))}
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl transition-all hover:border-yellow-400/20 hover:bg-yellow-400/4">
              <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all group-hover:border-yellow-400/50 group-hover:text-yellow-400">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <Badge className="mb-6 bg-white/10 text-gray-300 border-white/10 text-xs font-semibold tracking-wider">Production</Badge>
              <h3 className="text-2xl font-black">Photo & Video</h3>
              <p className="mt-3 text-sm leading-7 text-gray-500">Konten visual premium untuk memperkuat brand presence di semua platform digital.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Foto Produk", "Advertising", "TikTok", "Instagram Reels"].map((i) => (
                  <span key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">{i}</span>
                ))}
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl transition-all hover:border-yellow-400/20 hover:bg-yellow-400/4 md:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <Badge className="mb-6 bg-yellow-400/15 text-yellow-400 border-yellow-400/20 text-xs font-semibold tracking-wider">Web & IT</Badge>
                <h3 className="text-2xl font-black">Web Development & IT Solutions</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">Dari landing page hingga sistem enterprise — kami bangun dengan teknologi modern.</p>
              </div>
              <div className="md:col-span-2 grid gap-6 sm:grid-cols-3">
                {[
                  { t: "Website Development", items: ["Landing Page", "Company Profile", "UMKM / Bisnis", "Portfolio", "Custom Website"] },
                  { t: "UI/UX Design", items: ["UI Design Figma", "UX Research", "Prototype", "Mobile Responsive"] },
                  { t: "E-Commerce & Lainnya", items: ["Toko Online", "Payment Gateway", "SEO", "Maintenance"] },
                ].map((col) => (
                  <div key={col.t}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-yellow-400">{col.t}</p>
                    <ul className="space-y-2">
                      {col.items.map((i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="h-1 w-1 rounded-full bg-gray-600" />{i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. PORTOFOLIO
      ══════════════════════════════════════════════════ */}
      <section id="portfolio" className="border-t border-white/8 bg-white/[0.02] py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">— Portofolio</p>
              <h2 className="text-4xl font-black md:text-5xl">Karya Pilihan</h2>
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-400 transition-colors">
              Semua Proyek <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {portfolios.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((item, idx) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 backdrop-blur-md transition-all hover:border-yellow-400/20 ${idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  {/* image placeholder */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center">
                    <span className="text-xs text-gray-700">{item.imageUrl}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black opacity-0 transition-all group-hover:opacity-100 group-hover:scale-100 scale-90">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400/80">{item.category}</span>
                    <h3 className="mt-1.5 font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
              <p className="text-gray-600 text-sm">Belum ada portofolio.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. CTA / KONTAK
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="px-4 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-yellow-400/20 bg-yellow-400/5 p-12 text-center backdrop-blur-xl md:p-20">
            {/* decorative blobs */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/15 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">— Mari Berkolaborasi</p>
              <h2 className="text-4xl font-black md:text-6xl">
                Punya Proyek<br />
                <span className="italic text-yellow-400">dalam Pikiran?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-gray-400">
                Ceritakan ide Anda kepada kami. Kami siap membantu mewujudkan
                visi digital bisnis Anda menjadi kenyataan.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:halo@kunang2creative.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold text-black transition-all hover:bg-yellow-300 active:scale-95"
                >
                  halo@kunang2creative.com
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
                >
                  WhatsApp Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}