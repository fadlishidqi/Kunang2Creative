import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface PortfolioItem {
  id: string | number
  slug?: string | null
  images: unknown
  category: string
  title: string
  description?: string | null
}

function getCover(images: unknown): string | null {
  if (Array.isArray(images) && typeof images[0] === "string") return images[0]
  return null
}

export function PortfolioSection({ portfolios }: { portfolios: PortfolioItem[] }) {
  return (
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
            className="group inline-flex items-center gap-2.5 self-start sm:self-auto rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400 transition-all shadow-sm"
          >
            Semua Proyek
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {portfolios.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((item, idx) => {
              const cover = getCover(item.images)
              return (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug ?? item.id}`}
                  className={`group relative overflow-hidden rounded-3xl border border-black/6 bg-white shadow-sm transition-all hover:shadow-md hover:border-yellow-300/50 ${
                    idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div
                    className="relative overflow-hidden bg-linear-to-br from-yellow-50 to-amber-50"
                    style={{ aspectRatio: "4/5" }}
                  >
                    {cover ? (
                      <img
                        src={cover}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-300 text-xs">Tidak ada gambar</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black opacity-0 scale-90 transition-all group-hover:opacity-100 group-hover:scale-100 shadow-md">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
                      {item.category}
                    </span>
                    <h3 className="mt-1.5 font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1.5 text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 bg-white py-24 text-center">
            <p className="text-gray-400 text-sm">Belum ada portofolio yang ditampilkan.</p>
          </div>
        )}
      </div>
    </section>
  )
}
