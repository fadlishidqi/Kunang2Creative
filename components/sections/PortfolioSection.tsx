// components/sections/PortfolioSection.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Definisikan tipe data sesuai dengan schema Prisma Anda
interface PortfolioItem {
  id: string | number;
  imageUrl: string;
  category: string;
  title: string;
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
                className={`group relative overflow-hidden rounded-3xl border border-black/6 bg-white shadow-sm transition-all hover:shadow-md hover:border-yellow-300/50 ${
                  idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
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
  );
}