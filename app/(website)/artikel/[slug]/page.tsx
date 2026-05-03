export const dynamic = 'force-dynamic'

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MessageSquare } from "lucide-react"
import { CommentSection } from "@/components/sections/CommentSection"

interface Props {
  params: Promise<{ slug: string }>
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

type Block = { type: "text"; text: string } | { type: "image"; url: string; caption: string }

function parseContent(content: string): Block[] {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const blocks: Block[] = []

  for (const para of normalized.split(/\n\n+/)) {
    const trimmed = para.trim()
    if (!trimmed) continue

    // cek apakah ada [img:...] di baris tersendiri dalam paragraf ini
    const lines = trimmed.split("\n")
    let textBuffer: string[] = []

    for (const line of lines) {
      const m = line.trim().match(/^\[img:([^|\]]+)(?:\|([^\]]*))?\]$/)
      if (m) {
        if (textBuffer.length) {
          blocks.push({ type: "text", text: textBuffer.join("\n").trim() })
          textBuffer = []
        }
        blocks.push({ type: "image", url: m[1].trim(), caption: m[2]?.trim() ?? "" })
      } else {
        textBuffer.push(line)
      }
    }

    if (textBuffer.length && textBuffer.join("").trim()) {
      blocks.push({ type: "text", text: textBuffer.join("\n").trim() })
    }
  }

  return blocks
}


export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = await prisma.blog.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  })
  if (!article) return {}
  return {
    title: `${article.title} — Kunang-Kunang Creative`,
    description: article.excerpt ?? undefined,
  }
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params

  const article = await prisma.blog.findUnique({
    where: { slug, published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      coverImage: true,
      createdAt: true,
      author: { select: { name: true, image: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: { select: { id: true, name: true, image: true } },
        },
      },
    },
  })

  if (!article) notFound()

  const readTime = estimateReadTime(article.content)
  const blocks = parseContent(article.content)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* Back */}
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Semua Artikel
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-5">
            {article.title}
          </h1>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              {article.author?.image ? (
                <img
                  src={article.author.image}
                  alt={article.author.name ?? ""}
                  className="w-7 h-7 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-yellow-700">K</span>
                </div>
              )}
              <span className="font-medium text-gray-700">
                {article.author?.name ?? "Kunang-Kunang Creative"}
              </span>
            </div>

            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(article.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime} menit baca
            </span>

            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              {article.comments.length} komentar
            </span>
          </div>
        </header>

        {/* Cover image — inside container, nice aspect ratio */}
        {article.coverImage && (
          <div className="mb-10 rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-black/5">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full object-cover"
              style={{ aspectRatio: "16/9" }}
            />
          </div>
        )}

        {/* Excerpt callout */}
        {article.excerpt && (
          <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-yellow-400 pl-4">
            {article.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-black/6 mb-10" />

        {/* Article content */}
        <div>
          {blocks.map((block, i) =>
            block.type === "image" ? (
              <figure key={i} className="my-8 -mx-4 sm:mx-0">
                <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 border border-black/5 shadow-sm">
                  <img src={block.url} alt={block.caption} className="w-full object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-gray-400 italic px-4">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            ) : (
              <p key={i} className="mb-6 leading-[1.85] text-gray-700 text-[1.05rem] whitespace-pre-wrap">
                {block.text}
              </p>
            )
          )}
        </div>

        {/* Comments */}
        <CommentSection
          blogId={article.id}
          blogSlug={article.slug!}
          initialComments={article.comments}
        />

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-yellow-400 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-800 mb-2">
            Tertarik Bekerja Sama?
          </p>
          <h2 className="text-xl font-black text-gray-900 mb-4">
            Wujudkan Ide Kreatifmu Bersama Kami
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  )
}
