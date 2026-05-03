import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, MessageSquare, Clock, ArrowRight, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Artikel — Kunang-Kunang Creative",
  description: "Insight, tips, dan cerita dari tim Kunang-Kunang Creative.",
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function ArtikelPage() {
  const articles = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      content: true,
      createdAt: true,
      author: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  })

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Back */}
        <Link
          href="/#artikel"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 mb-3">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Artikel
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl">
            Insight, tips, dan cerita dari tim kreatif kami.
          </p>
        </div>

        {/* Articles */}
        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Belum ada artikel yang dipublikasikan.</p>
            <p className="text-sm mt-2">Nantikan artikel pertama kami!</p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-black/5">
            {articles.map((article, idx) => {
              const readTime = estimateReadTime(article.content)
              const href = `/artikel/${article.slug ?? article.id}`

              return (
                <article key={article.id} className={`py-10 ${idx === 0 ? "pt-0" : ""}`}>
                  <Link href={href} className="group block">
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-6 items-start">
                      {/* Text content */}
                      <div className="space-y-3">
                        {/* Author + date */}
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          {article.author?.image && (
                            <img
                              src={article.author.image}
                              alt={article.author.name ?? ""}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span className="font-medium text-gray-600">
                            {article.author?.name ?? "Kunang-Kunang Creative"}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(article.createdAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        {article.excerpt && (
                          <p className="text-gray-500 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {readTime} menit baca
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {article._count.comments} komentar
                          </span>
                          <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold group-hover:gap-2 transition-all">
                            Baca
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>

                      {/* Cover image */}
                      {article.coverImage && (
                        <div className="w-full sm:w-[200px] aspect-[3/2] rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
