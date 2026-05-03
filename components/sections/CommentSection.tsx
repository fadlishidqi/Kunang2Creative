"use client"

import { useSession, signIn } from "next-auth/react"
import { useState, useTransition } from "react"
import { addComment, deleteComment } from "@/app/actions/comment"
import { toast } from "sonner"
import { MessageSquare, Send, Trash2, Loader2, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Comment {
  id: number
  content: string
  createdAt: Date
  author: {
    id: string
    name: string | null
    image: string | null
  }
}

interface CommentSectionProps {
  blogId: number
  blogSlug: string
  initialComments: Comment[]
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "baru saja"
  if (minutes < 60) return `${minutes} menit lalu`
  if (hours < 24) return `${hours} jam lalu`
  if (days < 30) return `${days} hari lalu`
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function CommentSection({ blogId, blogSlug, initialComments }: CommentSectionProps) {
  const { data: session, status } = useSession()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [text, setText] = useState("")
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return

    startTransition(async () => {
      const result = await addComment(blogId, blogSlug, text)
      if (result.error) {
        toast.error(result.error)
        return
      }
      setComments((prev) => [
        {
          id: Date.now(),
          content: text.trim(),
          createdAt: new Date(),
          author: {
            id: session!.user.id,
            name: session!.user.name ?? null,
            image: session!.user.image ?? null,
          },
        },
        ...prev,
      ])
      setText("")
      toast.success("Komentar berhasil ditambahkan")
    })
  }

  async function handleDelete(commentId: number) {
    setDeletingId(commentId)
    try {
      await deleteComment(commentId, blogSlug)
      setComments((prev) => prev.filter((c) => c.id !== commentId))
      toast.success("Komentar dihapus")
    } catch {
      toast.error("Gagal menghapus komentar")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="mt-14 border-t border-black/8 pt-10">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-8">
        <MessageSquare className="h-5 w-5 text-yellow-500" />
        Komentar
        {comments.length > 0 && (
          <span className="text-sm font-normal text-gray-400">({comments.length})</span>
        )}
      </h2>

      {/* Input area */}
      {status === "loading" ? (
        <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          Memuat...
        </div>
      ) : session ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="shrink-0 w-9 h-9 rounded-full overflow-hidden bg-yellow-100 border border-yellow-200 flex items-center justify-center">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name ?? ""} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-sm font-bold text-yellow-700">
                  {(session.user.name ?? session.user.email ?? "?")[0].toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xs text-gray-400">
                Komentar sebagai{" "}
                <span className="font-semibold text-gray-700">{session.user.name ?? session.user.email}</span>
              </p>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tulis komentar kamu..."
                rows={3}
                className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 transition-colors bg-white"
                maxLength={2000}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{text.length}/2000</span>
                <Button
                  type="submit"
                  disabled={isPending || !text.trim()}
                  className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold text-sm gap-2 rounded-full px-5"
                >
                  {isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                  Kirim
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">Ingin ikut berkomentar?</p>
            <p className="text-gray-500 text-sm mt-0.5">
              Login dengan akun Google kamu untuk meninggalkan komentar.
            </p>
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: `/artikel/${blogSlug}` })}
            className="inline-flex items-center gap-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm transition-all shrink-0"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Login dengan Google
            <LogIn className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Comments list */}
      {comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => {
            const isOwner = session?.user.id === comment.author.id
            const isAdmin = session?.user.role === "ADMIN"
            const canDelete = isOwner || isAdmin

            return (
              <div key={comment.id} className="flex items-start gap-3 group">
                {/* Avatar */}
                <div className="shrink-0 w-9 h-9 rounded-full overflow-hidden bg-yellow-100 border border-yellow-200 flex items-center justify-center">
                  {comment.author.image ? (
                    <img src={comment.author.image} alt={comment.author.name ?? ""} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-sm font-bold text-yellow-700">
                      {(comment.author.name ?? "?")[0].toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {comment.author.name ?? "Pengguna"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>

                {canDelete && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    disabled={deletingId === comment.id}
                    className={cn(
                      "shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                      "text-gray-300 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 transition-colors",
                      deletingId === comment.id && "opacity-100"
                    )}
                  >
                    {deletingId === comment.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
