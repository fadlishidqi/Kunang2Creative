"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const artikelSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Konten wajib diisi"),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
})

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized")
  return session
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
    const existing = await prisma.blog.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    })
    if (!existing) return slug
    slug = `${base}-${counter++}`
  }
}

export type ArtikelFormState = {
  errors?: {
    title?: string[]
    excerpt?: string[]
    content?: string[]
    coverImage?: string[]
    general?: string[]
  }
  success?: boolean
}

export async function createArtikel(
  _prev: ArtikelFormState,
  formData: FormData
): Promise<ArtikelFormState> {
  const session = await requireAdmin()

  const raw = {
    title: formData.get("title") as string,
    excerpt: (formData.get("excerpt") as string) || undefined,
    content: formData.get("content") as string,
    coverImage: (formData.get("coverImage") as string) || undefined,
    published: formData.get("published") === "true",
  }

  const result = artikelSchema.safeParse(raw)
  if (!result.success) return { errors: result.error.flatten().fieldErrors }

  const slug = await generateUniqueSlug(result.data.title)

  await prisma.blog.create({
    data: {
      title: result.data.title,
      slug,
      excerpt: result.data.excerpt || null,
      content: result.data.content,
      coverImage: result.data.coverImage || null,
      published: result.data.published,
      authorId: session.user.id,
    },
  })

  revalidatePath("/dashboard/admin/articles")
  revalidatePath("/artikel")
  redirect("/dashboard/admin/articles")
}

export async function updateArtikel(
  id: number,
  _prev: ArtikelFormState,
  formData: FormData
): Promise<ArtikelFormState> {
  await requireAdmin()

  const raw = {
    title: formData.get("title") as string,
    excerpt: (formData.get("excerpt") as string) || undefined,
    content: formData.get("content") as string,
    coverImage: (formData.get("coverImage") as string) || undefined,
    published: formData.get("published") === "true",
  }

  const result = artikelSchema.safeParse(raw)
  if (!result.success) return { errors: result.error.flatten().fieldErrors }

  const existing = await prisma.blog.findUnique({ where: { id }, select: { title: true, slug: true } })
  const needsSlug = existing?.title !== result.data.title || !existing?.slug
  const slug = needsSlug ? await generateUniqueSlug(result.data.title, id) : existing!.slug!

  await prisma.blog.update({
    where: { id },
    data: {
      title: result.data.title,
      slug,
      excerpt: result.data.excerpt || null,
      content: result.data.content,
      coverImage: result.data.coverImage || null,
      published: result.data.published,
    },
  })

  revalidatePath("/dashboard/admin/articles")
  revalidatePath("/artikel")
  revalidatePath(`/artikel/${slug}`)
  redirect("/dashboard/admin/articles")
}

export async function deleteArtikel(id: number): Promise<void> {
  await requireAdmin()
  await prisma.blog.delete({ where: { id } })
  revalidatePath("/dashboard/admin/articles")
  revalidatePath("/artikel")
}

export async function togglePublished(id: number, published: boolean): Promise<void> {
  await requireAdmin()
  await prisma.blog.update({ where: { id }, data: { published } })
  revalidatePath("/dashboard/admin/articles")
  revalidatePath("/artikel")
}
