// components/sections/ServicesSection.tsx
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ServicesSection() {
  return (
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
  );
}