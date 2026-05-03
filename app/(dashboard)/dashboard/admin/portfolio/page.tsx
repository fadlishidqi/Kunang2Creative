import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortfolioTable } from "@/components/dashboard/PortfolioTable"

export default async function PortfolioListPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      images: true,
      description: true,
      featured: true,
      createdAt: true,
    },
  })

  const featuredCount = portfolios.filter((p) => p.featured).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">Portofolio</h2>
          <p className="text-white/40 text-sm mt-1">
            {portfolios.length} item total ·{" "}
            <span className="text-yellow-400">{featuredCount} tampil di beranda</span>
            {featuredCount >= 6 && (
              <span className="text-white/30"> (maks 6 terpenuhi)</span>
            )}
          </p>
        </div>
        <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold gap-2">
          <Link href="/dashboard/admin/portfolio/new">
            <Plus className="h-4 w-4" />
            Tambah
          </Link>
        </Button>
      </div>

      <PortfolioTable portfolios={portfolios} />
    </div>
  )
}
