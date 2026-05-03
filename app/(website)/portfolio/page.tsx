export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Semua Proyek — Kunang-Kunang Creative",
  description: "Lihat semua karya dan proyek dari Kunang-Kunang Creative.",
}

function getCover(images: unknown): string | null {
  if (Array.isArray(images) && typeof images[0] === "string") return images[0]
  return null
}

export default async function PortfolioListPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      images: true,
      description: true,
    },
  })

  const categories = ["Semua", ...Array.from(new Set(portfolios.map((p) => p.category))).sort()]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Back */}
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
            — Portofolio
          </p>
          <h1 className="text-4xl font-black text-gray-900 md:text-5xl">
            Semua Proyek
          </h1>
          <p className="mt-4 text-gray-400 text-base max-w-lg">
            Kumpulan karya desain dan kreasi terbaik dari tim Kunang-Kunang Creative.
          </p>
        </div>

        {/* Category chips */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-black/8 text-gray-500 bg-gray-50 select-none"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Grid */}
        {portfolios.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {portfolios.map((item) => {
              const cover = getCover(item.images)
              return (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug ?? item.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm transition-all hover:shadow-md hover:border-yellow-300/50"
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
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-black opacity-0 scale-90 transition-all group-hover:opacity-100 group-hover:scale-100 shadow-md">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-bold text-gray-900 group-hover:text-yellow-600 transition-colors text-sm leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-1.5 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 bg-gray-50 py-32 text-center">
            <p className="text-gray-400 text-sm">Belum ada portofolio yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  )
}
