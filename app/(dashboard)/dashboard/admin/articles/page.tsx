import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArticleTable } from "@/components/dashboard/ArticleTable"

export default async function ArticlesPage() {
  const articles = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      published: true,
      createdAt: true,
      _count: { select: { comments: true } },
    },
  })

  const publishedCount = articles.filter((a) => a.published).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">Artikel</h2>
          <p className="text-white/40 text-sm mt-1">
            {articles.length} artikel total ·{" "}
            <span className="text-green-400">{publishedCount} dipublikasikan</span>
          </p>
        </div>
        <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold gap-2">
          <Link href="/dashboard/admin/articles/new">
            <Plus className="h-4 w-4" />
            Tulis Artikel
          </Link>
        </Button>
      </div>

      <ArticleTable articles={articles} />
    </div>
  )
}
