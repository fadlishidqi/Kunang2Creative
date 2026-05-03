import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updatePortfolio } from "@/app/actions/portfolio"
import { PortfolioForm } from "@/components/dashboard/PortfolioForm"

interface EditPortfolioPageProps {
  params: Promise<{ id: string }>
}

function parseImages(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((v): v is string => typeof v === "string")
  return []
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { id } = await params
  const portfolioId = parseInt(id)
  if (isNaN(portfolioId)) notFound()

  const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } })
  if (!portfolio) notFound()

  const action = updatePortfolio.bind(null, portfolioId)

  return (
    <PortfolioForm
      action={action}
      defaultValues={{
        title: portfolio.title,
        category: portfolio.category,
        images: parseImages(portfolio.images),
        description: portfolio.description ?? undefined,
      }}
      mode="edit"
    />
  )
}
