"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const portfolioSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  images: z.array(z.string()).min(1, "Minimal satu gambar wajib diupload"),
  description: z.string().optional(),
})

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
  return session
}

export type PortfolioFormState = {
  errors?: {
    title?: string[]
    category?: string[]
    images?: string[]
    description?: string[]
    general?: string[]
  }
  success?: boolean
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

async function generateUniqueSlug(title: string, excludeId?: number): Promise<string> {
  const base = slugify(title)
  let slug = base
  let counter = 2
  for (;;) {
    const existing = await prisma.portfolio.findFirst({
      where: {
        slug,
        ...(excludeId !== undefined ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    })
    if (!existing) return slug
    slug = `${base}-${counter++}`
  }
}

export async function createPortfolio(
  _prev: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  await requireAdmin()

  let parsedImages: string[] = []
  try {
    parsedImages = JSON.parse(formData.get("images") as string)
  } catch {
    return { errors: { images: ["Format gambar tidak valid"] } }
  }

  const raw = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    images: parsedImages,
    description: formData.get("description") as string | undefined,
  }

  const result = portfolioSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const slug = await generateUniqueSlug(result.data.title)

  await prisma.portfolio.create({
    data: {
      title: result.data.title,
      slug,
      category: result.data.category,
      images: result.data.images,
      description: result.data.description || null,
    },
  })

  revalidatePath("/dashboard/admin/portfolio")
  revalidatePath("/portfolio")
  revalidatePath("/")
  redirect("/dashboard/admin/portfolio")
}

export async function updatePortfolio(
  id: number,
  _prev: PortfolioFormState,
  formData: FormData
): Promise<PortfolioFormState> {
  await requireAdmin()

  let parsedImages: string[] = []
  try {
    parsedImages = JSON.parse(formData.get("images") as string)
  } catch {
    return { errors: { images: ["Format gambar tidak valid"] } }
  }

  const raw = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    images: parsedImages,
    description: formData.get("description") as string | undefined,
  }

  const result = portfolioSchema.safeParse(raw)
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const existing = await prisma.portfolio.findUnique({ where: { id }, select: { title: true, slug: true } })
  const needsSlug = existing?.title !== result.data.title || !existing?.slug
  const slug = needsSlug ? await generateUniqueSlug(result.data.title, id) : existing!.slug!

  await prisma.portfolio.update({
    where: { id },
    data: {
      title: result.data.title,
      slug,
      category: result.data.category,
      images: result.data.images,
      description: result.data.description || null,
    },
  })

  revalidatePath("/dashboard/admin/portfolio")
  revalidatePath("/portfolio")
  revalidatePath("/portfolio/[slug]", "page")
  revalidatePath("/")
  redirect("/dashboard/admin/portfolio")
}

export async function deletePortfolio(id: number): Promise<void> {
  await requireAdmin()
  await prisma.portfolio.delete({ where: { id } })
  revalidatePath("/dashboard/admin/portfolio")
  revalidatePath("/portfolio")
  revalidatePath("/")
}

export async function toggleFeatured(id: number, featured: boolean): Promise<void> {
  await requireAdmin()
  await prisma.portfolio.update({ where: { id }, data: { featured } })
  revalidatePath("/dashboard/admin/portfolio")
  revalidatePath("/")
}
