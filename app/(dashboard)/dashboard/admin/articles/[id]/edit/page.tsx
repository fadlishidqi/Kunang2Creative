import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateArtikel } from "@/app/actions/artikel"
import { ArticleForm } from "@/components/dashboard/ArticleForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const numId = parseInt(id)
  if (isNaN(numId)) notFound()

  const article = await prisma.blog.findUnique({
    where: { id: numId },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      coverImage: true,
      published: true,
    },
  })

  if (!article) notFound()

  const action = updateArtikel.bind(null, article.id)

  return (
    <ArticleForm
      action={action}
      mode="edit"
      defaultValues={{
        title: article.title,
        excerpt: article.excerpt ?? undefined,
        content: article.content,
        coverImage: article.coverImage ?? undefined,
        published: article.published,
      }}
    />
  )
}
