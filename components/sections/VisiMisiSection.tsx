// components/sections/VisiMisiSection.tsx
export function VisiMisiSection() {
  return (
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
  );
}