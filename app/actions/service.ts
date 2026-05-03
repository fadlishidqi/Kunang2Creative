"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const serviceSchema = z.object({
  number: z.string().min(1, "Nomor wajib diisi"),
  category: z.string().min(1, "Nama kategori wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
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

export type ServiceFormState = {
  errors?: {
    number?: string[]
    category?: string[]
    description?: string[]
    general?: string[]
  }
  success?: boolean
}

export async function createService(
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin()

  const raw = {
    number: formData.get("number") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    order: parseInt((formData.get("order") as string) || "0"),
    active: formData.get("active") === "true",
  }

  const result = serviceSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  await prisma.service.create({ data: result.data })

  revalidatePath("/dashboard/admin/services")
  revalidatePath("/")
  redirect("/dashboard/admin/services")
}

export async function updateService(
  id: number,
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin()

  const raw = {
    number: formData.get("number") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    order: parseInt((formData.get("order") as string) || "0"),
    active: formData.get("active") === "true",
  }

  const result = serviceSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  await prisma.service.update({ where: { id }, data: result.data })

  revalidatePath("/dashboard/admin/services")
  revalidatePath(`/dashboard/admin/services/${id}/edit`)
  revalidatePath("/")
  redirect(`/dashboard/admin/services/${id}/edit`)
}

export async function deleteService(id: number): Promise<void> {
  await requireAdmin()
  await prisma.service.delete({ where: { id } })
  revalidatePath("/dashboard/admin/services")
  revalidatePath("/")
}
