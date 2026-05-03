import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

function getTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === "string")
  return []
}

function getImages(images: unknown): string[] {
  if (Array.isArray(images)) return images.filter((u): u is string => typeof u === "string")
  return []
}

function getFeatures(features: unknown): string[] {
  if (Array.isArray(features)) return features.filter((f): f is string => typeof f === "string")
  return []
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id: parseInt(id) },
    select: { category: true, description: true },
  })
  if (!service) return {}
  return {
    title: `${service.category} — Kunang-Kunang Creative`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id: parseInt(id), active: true },
    include: {
      items: {
        where: { active: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  })

  if (!service) notFound()

  const others = await prisma.service.findMany({
    where: { active: true, NOT: { id: service.id } },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      items: {
        where: { active: true },
        select: { id: true, title: true },
        orderBy: [{ order: "asc" }],
        take: 3,
      },
    },
  })

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Back */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Semua Layanan
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-black tabular-nums text-yellow-400 leading-none">
              {service.number}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/30">
              {service.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            {service.category}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </div>

        {/* Items / Packages */}
        {service.items.length > 0 && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
              Paket & Harga
            </p>
            <div className="space-y-4">
              {service.items.map((item) => {
                const tags = getTags(item.tags)
                const features = getFeatures(item.features)
                const imgs = getImages(item.images)
                const thumb = imgs[0] ?? null
                return (
                  <Link
                    key={item.id}
                    href={`/order/${item.id}`}
                    className="group flex items-stretch rounded-2xl border border-black/6 bg-white overflow-hidden hover:border-yellow-400/50 hover:shadow-md transition-all cursor-pointer"
                  >
                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 sm:p-8">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-gray-900 leading-tight">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {features.length > 0 && (
                          <ul className="mt-4 space-y-1.5">
                            {features.map((f) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                                <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-yellow-400 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        {tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-black/8 bg-gray-50 px-3 py-1 text-xs text-gray-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-5 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
                        {item.price ? (
                          <span className="inline-block rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-700 font-bold text-sm px-4 py-1.5">
                            {item.price}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold text-neutral-900 group-hover:bg-yellow-300 transition-colors">
                          <MessageCircle className="h-3.5 w-3.5" />
                          Pilih Paket
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail */}
                    {thumb && (
                      <div className="w-36 sm:w-48 shrink-0 overflow-hidden">
                        <img
                          src={thumb}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-black/6 my-14" />

        {/* Other services */}
        {others.length > 0 && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
              Layanan Lainnya
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.id}`}
                  className="group flex items-start gap-5 rounded-2xl border border-black/6 bg-white p-6 hover:border-yellow-300/60 hover:shadow-md transition-all"
                >
                  <span className="text-2xl font-black tabular-nums text-yellow-400 shrink-0 leading-none mt-0.5">
                    {other.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/25 mb-1">
                      {other.category}
                    </p>
                    <h3 className="font-black text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight">
                      {other.category}
                    </h3>
                    {other.items.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {other.items.map((item) => (
                          <span
                            key={item.id}
                            className="text-[10px] text-gray-400 bg-gray-50 border border-black/6 rounded-full px-2 py-0.5"
                          >
                            {item.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-yellow-500 transition-colors shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl sm:rounded-3xl bg-yellow-400 p-8 sm:p-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-800 mb-3">
            Tertarik Bekerja Sama?
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            Hubungi Kami Sekarang
          </h2>
          <p className="text-yellow-900/60 text-sm mb-8 max-w-sm mx-auto">
            Ceritakan kebutuhan Anda dan kami akan bantu mewujudkannya.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Mulai Proyek
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
