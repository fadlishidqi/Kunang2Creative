export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft, Calendar } from "lucide-react"
import { PortfolioGallery } from "@/components/sections/PortfolioGallery"

interface Props {
  params: Promise<{ slug: string }>
}

function getImages(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((v): v is string => typeof v === "string")
  return []
}

function isNumericId(str: string): boolean {
  return /^\d+$/.test(str)
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const portfolio = isNumericId(slug)
    ? await prisma.portfolio.findUnique({ where: { id: parseInt(slug) }, select: { title: true, description: true, slug: true } })
    : await prisma.portfolio.findUnique({ where: { slug }, select: { title: true, description: true, slug: true } })
  if (!portfolio) return {}
  return {
    title: `${portfolio.title} — Kunang-Kunang Creative`,
    description: portfolio.description ?? undefined,
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params

  let portfolio

  if (isNumericId(slug)) {
    portfolio = await prisma.portfolio.findUnique({ where: { id: parseInt(slug) } })
    if (portfolio?.slug) {
      redirect(`/portfolio/${portfolio.slug}`)
    }
  } else {
    portfolio = await prisma.portfolio.findUnique({ where: { slug } })
  }

  if (!portfolio) notFound()

  const related = await prisma.portfolio.findMany({
    where: { featured: true, NOT: { id: portfolio.id } },
    take: 3,
    orderBy: { createdAt: "desc" },
  })

  const images = getImages(portfolio.images)
  const cover = images[0] ?? null
  const rest = images.slice(1)

  const relatedImages = related.map((r) => ({
    ...r,
    coverImage: getImages(r.images)[0] ?? null,
  }))

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Back button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Semua Proyek
        </Link>

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 mb-3">
            {portfolio.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {portfolio.title}
          </h1>
          <div className="flex items-center gap-3 mt-4 text-gray-400 text-sm">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {new Date(portfolio.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Cover + Description side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Cover image — 4:5 ratio */}
          {cover && (
            <div
              className="w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={cover}
                alt={portfolio.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          {portfolio.description && (
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
                Tentang Proyek
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">{portfolio.description}</p>
            </div>
          )}
        </div>

        {/* Extra images gallery */}
        {rest.length > 0 && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">
              Galeri
            </p>
            <PortfolioGallery images={rest} title={portfolio.title} />
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-black/6 my-14" />

        {/* Related */}
        {relatedImages.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
              Karya Lainnya
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedImages.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug ?? item.id}`}
                  className="group block overflow-hidden rounded-2xl border border-black/6 bg-gray-50 hover:border-yellow-300/50 hover:shadow-md transition-all"
                >
                  <div
                    className="overflow-hidden bg-gray-100"
                    style={{ aspectRatio: "4/5" }}
                  >
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-bold text-gray-900 group-hover:text-yellow-600 transition-colors text-sm line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl sm:rounded-3xl bg-yellow-400 p-8 sm:p-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-800 mb-3">
            Tertarik Bekerja Sama?
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">
            Wujudkan Ide Kreatifmu
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Hubungi Kami
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
