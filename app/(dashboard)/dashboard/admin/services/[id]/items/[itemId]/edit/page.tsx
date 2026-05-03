import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateServiceItem } from "@/app/actions/serviceItem"
import { ServiceItemForm } from "@/components/dashboard/ServiceItemForm"

interface Props {
  params: Promise<{ id: string; itemId: string }>
}

export default async function EditServiceItemPage({ params }: Props) {
  const { id, itemId } = await params

  const [service, item] = await Promise.all([
    prisma.service.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, category: true },
    }),
    prisma.serviceItem.findUnique({
      where: { id: parseInt(itemId) },
    }),
  ])

  if (!service || !item || item.serviceId !== service.id) notFound()

  const tags = Array.isArray(item.tags) ? (item.tags as string[]) : []
  const features = Array.isArray(item.features) ? (item.features as string[]) : []
  const images = Array.isArray(item.images) ? (item.images as string[]) : []

  const action = updateServiceItem.bind(null, item.id, service.id)

  return (
    <div>
      <p className="text-white/30 text-xs uppercase tracking-widest mb-6">
        {service.category}
      </p>
      <ServiceItemForm
        action={action}
        serviceId={service.id}
        mode="edit"
        defaultValues={{
          title: item.title,
          description: item.description ?? "",
          price: item.price ?? "",
          tags,
          features,
          images,
          order: item.order,
          active: item.active,
        }}
      />
    </div>
  )
}
