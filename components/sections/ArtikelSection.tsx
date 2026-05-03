import Link from "next/link"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"

interface Article {
  id: number
  slug: string | null
  title: string
  excerpt: string | null
  coverImage: string | null
  content: string
  createdAt: Date
  author: { name: string | null; image: string | null } | null
}

function estimateReadTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

export function ArtikelSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null

  return (
    <section id="artikel" className="bg-[#fafafa] border-t border-black/5 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
              — Blog & Insight
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-none">
              Artikel<br />
              <span className="relative inline-block">
                Terbaru
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-yellow-400/40 -z-10 rounded" />
              </span>
            </h2>
          </div>
          <Link
            href="/artikel"
            className="group inline-flex items-center gap-2.5 self-start sm:self-auto rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400 transition-all shadow-sm"
          >
            Semua Artikel
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3 kartu sejajar — bg = cover image */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {articles.map((article) => {
            const href = `/artikel/${article.slug ?? article.id}`
            const readTime = estimateReadTime(article.content)
            return (
              <Link
                key={article.id}
                href={href}
                className="group relative overflow-hidden rounded-2xl aspect-3/2 flex flex-col justify-end bg-gray-200"
              >
                {/* Background cover */}
                {article.coverImage ? (
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-yellow-100 to-amber-200" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content */}
                <div className="relative p-5">
                  <div className="flex items-center gap-2 text-[11px] text-white/60 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(article.createdAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{readTime} mnt</span>
                  </div>
                  <h3 className="font-black text-white text-base leading-snug group-hover:text-yellow-300 transition-colors line-clamp-2 mb-1">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-gray-900 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
