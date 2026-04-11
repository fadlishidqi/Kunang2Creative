// components/sections/ServicesSection.tsx
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    category: "Social Media & Design",
    title: "Identitas Visual & Konten",
    desc: "Desain grafis, konten media sosial, company profile, poster, katalog, dan semua kebutuhan visual brand Anda.",
    tags: ["Instagram Post", "Instagram Story", "Company Profile", "Kartu Nama", "Poster", "Brosur", "Katalog", "Banner"],
  },
  {
    num: "02",
    category: "Production",
    title: "Photo & Video",
    desc: "Konten visual premium untuk memperkuat brand presence di semua platform digital.",
    tags: ["Foto Produk", "Advertising", "TikTok", "Instagram Reels"],
  },
  {
    num: "03",
    category: "Web & IT",
    title: "Web Development & IT Solutions",
    desc: "Dari landing page hingga sistem enterprise — kami bangun dengan teknologi modern.",
    tags: ["Landing Page", "Company Profile", "UMKM / Bisnis", "Portfolio", "Custom Website", "UI Design Figma", "UX Research", "Prototype", "Mobile Responsive", "Toko Online", "Payment Gateway", "SEO", "Maintenance"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-32">

      {/* Header */}
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

      {/* Service list */}
      <ul>
        {services.map((s) => (
          <li
            key={s.num}
            className="group border-t border-black/5 py-10 last:border-b transition-colors hover:bg-yellow-50/30"
          >
            <div className="grid gap-6 md:grid-cols-[80px_1fr_40px] md:gap-10 md:items-start px-2">

              {/* Number + category */}
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5 md:pt-1">
                <span className="text-sm font-black tabular-nums text-yellow-400">
                  {s.num}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/25">
                  {s.category}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-sm leading-7 text-gray-500">
                  {s.desc}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/8 bg-white/80 px-3 py-1 text-xs text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-gray-300 transition-all group-hover:border-yellow-400/60 group-hover:text-yellow-500 mt-1">
                <ArrowUpRight className="h-4 w-4" />
              </div>

            </div>
          </li>
        ))}
      </ul>

    </section>
  );
}
