import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { createServiceItem } from "@/app/actions/serviceItem"
import { ServiceItemForm } from "@/components/dashboard/ServiceItemForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function NewServiceItemPage({ params }: Props) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id: parseInt(id) },
    select: { id: true, category: true },
  })

  if (!service) notFound()

  const action = createServiceItem.bind(null, service.id)

  return (
    <div>
      <p className="text-white/30 text-xs uppercase tracking-widest mb-6">
        {service.category}
      </p>
      <ServiceItemForm action={action} serviceId={service.id} mode="create" />
    </div>
  )
}
