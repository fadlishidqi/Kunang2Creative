import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceTable } from "@/components/dashboard/ServiceTable"

export default async function ServicesListPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      number: true,
      category: true,
      description: true,
      order: true,
      active: true,
      createdAt: true,
      items: {
        select: { id: true, title: true, active: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  })

  const totalItems = services.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">Layanan</h2>
          <p className="text-white/40 text-sm mt-1">
            {services.length} kategori ·{" "}
            <span className="text-yellow-400">{totalItems} paket layanan</span>
          </p>
        </div>
        <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold gap-2">
          <Link href="/dashboard/admin/services/new">
            <Plus className="h-4 w-4" />
            Tambah Kategori
          </Link>
        </Button>
      </div>

      <ServiceTable services={services} />
    </div>
  )
}
