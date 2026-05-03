import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateService } from "@/app/actions/service"
import { deleteServiceItem } from "@/app/actions/serviceItem"
import { ServiceForm } from "@/components/dashboard/ServiceForm"
import Link from "next/link"
import { Plus, Pencil, Trash2, Tag, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceItemDeleteButton } from "@/components/dashboard/ServiceItemDeleteButton"
import { cn } from "@/lib/utils"

interface Props {
  params: Promise<{ id: string }>
}

function getTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === "string")
  return []
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id: parseInt(id) },
    include: {
      items: {
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  })

  if (!service) notFound()

  const action = updateService.bind(null, service.id)

  return (
    <div className="space-y-10 max-w-3xl">

      {/* Category form */}
      <div className="space-y-4">
        <div>
          <h2 className="text-white text-2xl font-bold">Edit Kategori Layanan</h2>
          <p className="text-white/40 text-sm mt-1">
            Perbarui informasi kategori{" "}
            <span className="text-yellow-400">{service.category}</span>
          </p>
        </div>
        <ServiceForm
          action={action}
          mode="edit"
          defaultValues={{
            number: service.number,
            category: service.category,
            description: service.description,
            order: service.order,
            active: service.active,
          }}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Items section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white text-lg font-bold">Paket / Item Layanan</h3>
            <p className="text-white/40 text-sm mt-0.5">
              {service.items.length} paket dalam kategori ini
            </p>
          </div>
          <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold gap-2" size="sm">
            <Link href={`/dashboard/admin/services/${service.id}/items/new`}>
              <Plus className="h-3.5 w-3.5" />
              Tambah Paket
            </Link>
          </Button>
        </div>

        {service.items.length === 0 ? (
          <div className="glass-card border border-white/8 p-10 text-center">
            <p className="text-white/30 text-sm mb-3">Belum ada paket layanan.</p>
            <Button asChild size="sm" className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold gap-2">
              <Link href={`/dashboard/admin/services/${service.id}/items/new`}>
                <Plus className="h-3.5 w-3.5" />
                Tambah Paket Pertama
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {service.items.map((item) => {
              const tags = getTags(item.tags)
              return (
                <div
                  key={item.id}
                  className={cn(
                    "glass-card border rounded-xl px-4 py-3.5 flex items-start gap-4",
                    item.active ? "border-white/8" : "border-white/4 opacity-50"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white/85 font-medium text-sm">{item.title}</span>
                      {!item.active && (
                        <span className="text-[10px] text-white/25 border border-white/10 rounded-full px-2 py-0.5">
                          Nonaktif
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      {item.price && (
                        <span className="inline-flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                          <DollarSign className="h-3 w-3" />
                          {item.price}
                        </span>
                      )}
                      {item.description && (
                        <span className="text-white/30 text-xs line-clamp-1 max-w-xs">
                          {item.description}
                        </span>
                      )}
                    </div>

                    {tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[10px] text-white/35 bg-white/5 border border-white/8 rounded-full px-2 py-0.5"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/25 hover:text-white hover:bg-white/8 rounded-lg"
                    >
                      <Link href={`/dashboard/admin/services/${service.id}/items/${item.id}/edit`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <ServiceItemDeleteButton itemId={item.id} serviceId={service.id} itemTitle={item.title} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
