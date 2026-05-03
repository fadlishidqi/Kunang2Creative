import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { OrderForm } from "@/components/sections/OrderForm"

interface Props {
  params: Promise<{ itemId: string }>
}

export async function generateMetadata({ params }: Props) {
  const { itemId } = await params
  const item = await prisma.serviceItem.findUnique({
    where: { id: parseInt(itemId) },
    select: { title: true },
  })
  if (!item) return {}
  return { title: `Order ${item.title} — Kunang-Kunang Creative` }
}

export default async function OrderPage({ params }: Props) {
  const { itemId } = await params

  const item = await prisma.serviceItem.findUnique({
    where: { id: parseInt(itemId), active: true },
    include: {
      service: { select: { id: true, category: true } },
    },
  })

  if (!item) notFound()

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Back */}
        <Link
          href={`/services/${item.service.id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke {item.service.category}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
            — Pesan Sekarang
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            {item.title}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {item.service.category}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-black/6 bg-white p-6 sm:p-8">
          <OrderForm itemTitle={item.title} serviceCategory={item.service.category} />
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Setelah klik &quot;Order Sekarang&quot;, kamu akan diarahkan ke WhatsApp kami untuk konfirmasi lebih lanjut.
        </p>

      </div>
    </div>
  )
}
