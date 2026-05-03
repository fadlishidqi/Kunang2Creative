"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addComment(
  blogId: number,
  blogSlug: string,
  content: string
): Promise<{ error?: string }> {
  const session = await auth()
  if (!session) return { error: "Silakan login terlebih dahulu" }
  if (!content.trim()) return { error: "Komentar tidak boleh kosong" }
  if (content.trim().length > 2000) return { error: "Komentar terlalu panjang (maks 2000 karakter)" }

  await prisma.comment.create({
    data: {
      content: content.trim(),
      authorId: session.user.id,
      blogId,
    },
  })

  revalidatePath(`/artikel/${blogSlug}`)
  return {}
}

export async function deleteComment(commentId: number, blogSlug: string): Promise<void> {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { authorId: true },
  })

  if (!comment) throw new Error("Komentar tidak ditemukan")
  if (comment.authorId !== session.user.id && session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.comment.delete({ where: { id: commentId } })
  revalidatePath(`/artikel/${blogSlug}`)
}
