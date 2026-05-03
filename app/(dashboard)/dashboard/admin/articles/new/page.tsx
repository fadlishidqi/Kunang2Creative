import { createArtikel } from "@/app/actions/artikel"
import { ArticleForm } from "@/components/dashboard/ArticleForm"

export default function NewArticlePage() {
  return <ArticleForm action={createArtikel} mode="create" />
}
