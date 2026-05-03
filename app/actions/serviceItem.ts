"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const serviceItemSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().optional(),
  price: z.string().optional(),
  tags: z.array(z.string()),
  features: z.array(z.string()),
  images: z.array(z.string()),
  order: z.number().int(),
  active: z.boolean(),
})

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
  return session
}

export type ServiceItemFormState = {
  errors?: {
    title?: string[]
    description?: string[]
    price?: string[]
    tags?: string[]
    features?: string[]
    images?: string[]
    general?: string[]
  }
  success?: boolean
}

export async function createServiceItem(
  serviceId: number,
  _prev: ServiceItemFormState,
  formData: FormData
): Promise<ServiceItemFormState> {
  await requireAdmin()

  let parsedTags: string[] = []
  try {
    parsedTags = JSON.parse(formData.get("tags") as string)
  } catch {
    return { errors: { tags: ["Format tags tidak valid"] } }
  }

  let parsedFeatures: string[] = []
  try {
    parsedFeatures = JSON.parse((formData.get("features") as string) || "[]")
  } catch {
    return { errors: { features: ["Format fitur tidak valid"] } }
  }

  let parsedImages: string[] = []
  try {
    parsedImages = JSON.parse((formData.get("images") as string) || "[]")
  } catch {
    return { errors: { images: ["Format gambar tidak valid"] } }
  }

  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
    price: (formData.get("price") as string) || undefined,
    tags: parsedTags,
    features: parsedFeatures,
    images: parsedImages,
    order: parseInt((formData.get("order") as string) || "0"),
    active: formData.get("active") === "true",
  }

  const result = serviceItemSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  await prisma.serviceItem.create({
    data: {
      serviceId,
      title: result.data.title,
      description: result.data.description || null,
      price: result.data.price || null,
      tags: result.data.tags,
      features: result.data.features,
      images: result.data.images,
      order: result.data.order,
      active: result.data.active,
    },
  })

  revalidatePath(`/dashboard/admin/services/${serviceId}/edit`)
  revalidatePath("/")
  redirect(`/dashboard/admin/services/${serviceId}/edit`)
}

export async function updateServiceItem(
  itemId: number,
  serviceId: number,
  _prev: ServiceItemFormState,
  formData: FormData
): Promise<ServiceItemFormState> {
  await requireAdmin()

  let parsedTags: string[] = []
  try {
    parsedTags = JSON.parse(formData.get("tags") as string)
  } catch {
    return { errors: { tags: ["Format tags tidak valid"] } }
  }

  let parsedFeatures: string[] = []
  try {
    parsedFeatures = JSON.parse((formData.get("features") as string) || "[]")
  } catch {
    return { errors: { features: ["Format fitur tidak valid"] } }
  }

  let parsedImages: string[] = []
  try {
    parsedImages = JSON.parse((formData.get("images") as string) || "[]")
  } catch {
    return { errors: { images: ["Format gambar tidak valid"] } }
  }

  const raw = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
    price: (formData.get("price") as string) || undefined,
    tags: parsedTags,
    features: parsedFeatures,
    images: parsedImages,
    order: parseInt((formData.get("order") as string) || "0"),
    active: formData.get("active") === "true",
  }

  const result = serviceItemSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  await prisma.serviceItem.update({
    where: { id: itemId },
    data: {
      title: result.data.title,
      description: result.data.description || null,
      price: result.data.price || null,
      tags: result.data.tags,
      features: result.data.features,
      images: result.data.images,
      order: result.data.order,
      active: result.data.active,
    },
  })

  revalidatePath(`/dashboard/admin/services/${serviceId}/edit`)
  revalidatePath("/")
  redirect(`/dashboard/admin/services/${serviceId}/edit`)
}

export async function deleteServiceItem(itemId: number, serviceId: number): Promise<void> {
  await requireAdmin()
  await prisma.serviceItem.delete({ where: { id: itemId } })
  revalidatePath(`/dashboard/admin/services/${serviceId}/edit`)
  revalidatePath("/")
}
