import prisma from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Sparkles, Globe, Camera, Layers } from "lucide-react";

/* ─────────────────────────────────────────
   ANIMATED BACKGROUND — kept as a
   server-renderable static div; CSS
   handles the motion via keyframes in
   globals.css.
───────────────────────────────────────── */
function AnimatedBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* blob 1 – large, top-left, primary yellow */}
      <div
        className="absolute -top-48 -left-48 h-[780px] w-[780px] bg-yellow-200/55"
        style={{
          filter: "blur(90px)",
          animation: "blob-1 14s ease-in-out infinite",
        }}
      />
      {/* blob 2 – top-right, warm amber */}
      <div
        className="absolute -top-32 -right-32 h-[620px] w-[620px] bg-amber-100/65"
        style={{
          filter: "blur(80px)",
          animation: "blob-2 18s ease-in-out infinite 2s",
        }}
      />
      {/* blob 3 – mid, soft lemon */}
      <div
        className="absolute top-[45%] left-[25%] h-[520px] w-[520px] bg-yellow-100/45"
        style={{
          filter: "blur(100px)",
          animation: "blob-3 22s ease-in-out infinite 5s",
        }}
      />
      {/* blob 4 – bottom-right, muted gold */}
      <div
        className="absolute -bottom-40 -right-20 h-[640px] w-[640px] bg-yellow-200/35"
        style={{
          filter: "blur(90px)",
          animation: "blob-4 16s ease-in-out infinite 1s",
        }}
      />
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

export default async function Home() {
  const portfolios = await prisma.portfolio.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

 

  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Web Development",
      desc: "Website modern, responsif, dan user-friendly yang mendukung performa bisnis.",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Social Media",
      desc: "Strategi pemasaran digital tepat sasaran untuk meningkatkan engagement.",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Photo & Video",
      desc: "Konten visual berkualitas tinggi untuk memperkuat identitas brand.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "IT Solutions",
      desc: "Solusi teknologi terintegrasi disesuaikan kebutuhan bisnis Anda.",
    },
  ];

  return (
    <div className="relative w-full overflow-x-hidden bg-[#fafafa] text-gray-900 selection:bg-yellow-400 selection:text-black">
      <AnimatedBg />

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16">
        {/* pill badge */}
        <div className="mb-10 flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500 shadow-sm backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          Digital Creative Agency — Semarang
        </div>

        {/* headline */}
        <h1 className="max-w-5xl text-center text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.9] tracking-tight">
          <span className="block text-gray-900">We Make</span>
          <span className="block italic text-yellow-400">Brands</span>
          <span className="block text-gray-900">Shine.</span>
        </h1>

        {/* sub */}
        <p className="mt-8 max-w-xl text-center text-base leading-relaxed text-gray-500 md:text-lg">
          Mitra strategis pertumbuhan digital Anda — dari identitas visual,
          social media, hingga teknologi web yang berdampak nyata.
        </p>

        {/* cta row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-bold text-black shadow-lg shadow-yellow-200 transition-all hover:bg-yellow-300 hover:shadow-yellow-300 active:scale-95"
          >
            Mulai Proyek Anda
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-8 py-3.5 text-sm font-medium text-gray-700 backdrop-blur-md transition-all hover:bg-white hover:border-black/20 active:scale-95"
          >
            Lihat Karya
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. MARQUEE
      ══════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-black/6 bg-white/50 py-5 backdrop-blur-sm">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {Array(4)
            .fill([
              "Social Media",
              "Web Development",
              "UI/UX Design",
              "Video Production",
              "Brand Identity",
              "IT Solutions",
            ])
            .flat()
            .map((t, i) => (
              <span
                key={i}
                className="mx-8 text-sm font-medium uppercase tracking-[0.15em] text-gray-400"
              >
                {t}{" "}
                <span className="mx-6 text-yellow-400/70">✦</span>
              </span>
            ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          3. TENTANG KAMI
      ══════════════════════════════════════ */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* text */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
              — Tentang Kami
            </p>
            <h2 className="text-5xl font-black leading-tight text-gray-900 md:text-6xl">
              Cahaya di<br />
              <span className="italic text-gray-400">Era Digital</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-500">
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
            <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-yellow-600 hover:underline cursor-pointer">
              Kenali tim kami <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((c) => (
              <div
                key={c.title}
                className="group flex flex-col gap-3 rounded-2xl border border-black/6 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:border-yellow-300/60 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500 ring-1 ring-yellow-200 transition-all group-hover:bg-yellow-100">
                  {c.icon}
                </div>
                <h3 className="font-bold text-gray-900">{c.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. VISI, MISI, TUJUAN
      ══════════════════════════════════════ */}
      <section className="relative border-y border-black/5 bg-white/40 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
              — DNA Perusahaan
            </p>
            <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
              Arah & Komitmen
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Visi */}
            <div className="relative overflow-hidden rounded-3xl border border-yellow-300/50 bg-yellow-50/80 p-8 shadow-sm backdrop-blur-xl">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-yellow-200/50 blur-2xl" />
              <span className="text-5xl font-black text-yellow-200">01</span>
              <h3 className="mt-4 text-xl font-black text-yellow-600">Visi</h3>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                Menjadi perusahaan kreatif terdepan yang membantu brand berkembang
                secara digital melalui strategi media sosial yang inovatif dan
                pengembangan website yang modern, efektif, dan berorientasi pada hasil.
              </p>
            </div>

            {/* Misi */}
            <div className="relative overflow-hidden rounded-3xl border border-black/6 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
              <span className="text-5xl font-black text-gray-100">02</span>
              <h3 className="mt-4 text-xl font-black text-gray-900">Misi</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Layanan sosial media kreatif & berbasis data",
                  "Website responsif sesuai kebutuhan spesifik",
                  "Solusi digital terintegrasi end-to-end",
                  "Mengutamakan kualitas & kepuasan klien",
                  "Mengikuti tren digital & teknologi terkini",
                  "Hubungan jangka panjang yang transparan",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tujuan */}
            <div className="relative overflow-hidden rounded-3xl border border-black/6 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
              <span className="text-5xl font-black text-gray-100">03</span>
              <h3 className="mt-4 text-xl font-black text-gray-900">Tujuan</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Meningkatkan visibilitas & daya saing klien",
                  "Menjadi mitra terpercaya jangka panjang",
                  "Menghasilkan karya digital berdampak nyata",
                  "Pertumbuhan perusahaan berkelanjutan",
                  "Portofolio berkualitas & beragam industri",
                  "Tim kreatif kompeten & berintegritas",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. SERVICES
      ══════════════════════════════════════ */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-32">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
              — Layanan
            </p>
            <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
              Apa Yang<br />Kami Buat
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-gray-500">
            Solusi digital komprehensif — dari strategi hingga eksekusi, semua
            dikerjakan dengan standar premium.
          </p>
        </div>

        <div className="space-y-4">
          {/* row 1 */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* big card */}
            <div className="group relative col-span-2 overflow-hidden rounded-3xl border border-black/6 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-yellow-300/60 hover:shadow-md md:p-10">
              <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-black/8 text-gray-300 transition-all group-hover:border-yellow-400/50 group-hover:text-yellow-500">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <Badge className="mb-6 bg-yellow-100 text-yellow-700 border-yellow-200 text-xs font-semibold tracking-wider">
                Social Media & Design
              </Badge>
              <h3 className="text-2xl font-black text-gray-900">Identitas Visual & Konten</h3>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                Desain grafis, konten media sosial, company profile, poster, katalog, dan semua kebutuhan visual brand Anda.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Instagram Post","Instagram Story","Company Profile","Kartu Nama","Poster","Brosur","Katalog","Banner",
                ].map((i) => (
                  <span key={i} className="rounded-full border border-black/8 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                    {i}
                  </span>
                ))}
              </div>
            </div>

            {/* small card */}
            <div className="group relative overflow-hidden rounded-3xl border border-black/6 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-yellow-300/60 hover:shadow-md">
              <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-black/8 text-gray-300 transition-all group-hover:border-yellow-400/50 group-hover:text-yellow-500">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <Badge className="mb-6 bg-gray-100 text-gray-600 border-gray-200 text-xs font-semibold tracking-wider">
                Production
              </Badge>
              <h3 className="text-2xl font-black text-gray-900">Photo & Video</h3>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                Konten visual premium untuk memperkuat brand presence di semua platform digital.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Foto Produk","Advertising","TikTok","Instagram Reels"].map((i) => (
                  <span key={i} className="rounded-full border border-black/8 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* row 2 — wide */}
          <div className="group relative overflow-hidden rounded-3xl border border-black/6 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all hover:border-yellow-300/60 hover:shadow-md md:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <Badge className="mb-6 bg-yellow-100 text-yellow-700 border-yellow-200 text-xs font-semibold tracking-wider">
                  Web & IT
                </Badge>
                <h3 className="text-2xl font-black text-gray-900">
                  Web Development & IT Solutions
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Dari landing page hingga sistem enterprise — kami bangun dengan teknologi modern.
                </p>
              </div>
              <div className="md:col-span-2 grid gap-6 sm:grid-cols-3">
                {[
                  {
                    t: "Website Development",
                    items: ["Landing Page","Company Profile","UMKM / Bisnis","Portfolio","Custom Website"],
                  },
                  {
                    t: "UI/UX Design",
                    items: ["UI Design Figma","UX Research","Prototype","Mobile Responsive"],
                  },
                  {
                    t: "E-Commerce & Lainnya",
                    items: ["Toko Online","Payment Gateway","SEO","Maintenance"],
                  },
                ].map((col) => (
                  <div key={col.t}>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-yellow-500">
                      {col.t}
                    </p>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="h-1 w-1 rounded-full bg-gray-300" />
                          {item}
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

      {/* ══════════════════════════════════════
          6. PORTOFOLIO
      ══════════════════════════════════════ */}
      <section
        id="portfolio"
        className="border-t border-black/5 bg-gray-50/70 py-32 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
                — Portofolio
              </p>
              <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
                Karya Pilihan
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-yellow-600 transition-colors"
            >
              Semua Proyek <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {portfolios.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((item, idx) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl border border-black/6 bg-white shadow-sm transition-all hover:shadow-md hover:border-yellow-300/50 ${idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center">
                    <span className="text-xs text-gray-300">{item.imageUrl}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black opacity-0 scale-90 transition-all group-hover:opacity-100 group-hover:scale-100 shadow-md">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
                      {item.category}
                    </span>
                    <h3 className="mt-1.5 font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 bg-white py-24 text-center">
              <p className="text-gray-400 text-sm">Belum ada portofolio.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CTA / KONTAK
      ══════════════════════════════════════ */}
      <section id="contact" className="px-4 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-yellow-400 via-yellow-400 to-amber-400 p-12 text-center shadow-2xl shadow-yellow-200 md:p-20">
            {/* decorative rings */}
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[40px] border-yellow-300/30" />
            <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full border-[30px] border-amber-300/30" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-700">
                — Mari Berkolaborasi
              </p>
              <h2 className="text-4xl font-black text-gray-900 md:text-6xl">
                Punya Proyek<br />
                <span className="italic">dalam Pikiran?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-yellow-900/70">
                Ceritakan ide Anda kepada kami. Kami siap membantu mewujudkan
                visi digital bisnis Anda menjadi kenyataan.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:halo@kunang2creative.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-700 active:scale-95 shadow-lg shadow-gray-900/20"
                >
                  halo@kunang2creative.com
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-yellow-600/30 bg-white/30 px-8 py-4 text-sm font-bold text-gray-900 backdrop-blur-md transition-all hover:bg-white/50 active:scale-95"
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