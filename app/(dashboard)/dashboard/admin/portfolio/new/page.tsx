import { createPortfolio } from "@/app/actions/portfolio"
import { PortfolioForm } from "@/components/dashboard/PortfolioForm"

export default function NewPortfolioPage() {
  return <PortfolioForm action={createPortfolio} mode="create" />
}
