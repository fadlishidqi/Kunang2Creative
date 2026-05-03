"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { deleteArtikel, togglePublished } from "@/app/actions/artikel"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  FileText,
  MessageSquare,
} from "lucide-react"

interface ArticleItem {
  id: number
  title: string
  slug: string | null
  excerpt: string | null
  coverImage: string | null
  published: boolean
  _count: { comments: number }
  createdAt: Date
}

function PublishedToggle({ id, initial }: { id: number; initial: boolean }) {
  const [published, setPublished] = useState(initial)
  const [pending, startTransition] = useTransition()

  function handleToggle() {
    const next = !published
    setPublished(next)
    startTransition(async () => {
      try {
        await togglePublished(id, next)
        toast.success(next ? "Artikel dipublikasikan" : "Artikel dijadikan draft")
      } catch {
        setPublished(!next)
        toast.error("Gagal mengubah status publikasi")
      }
    })
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleToggle}
        disabled={pending}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all select-none border",
          pending && "cursor-wait opacity-60",
          published && !pending
            ? "bg-green-400/15 border-green-400/30 text-green-300 hover:bg-green-400/25"
            : !pending
            ? "bg-white/4 border-white/10 text-white/30 hover:bg-white/8 hover:text-white/50"
            : "bg-white/4 border-white/10 text-white/30"
        )}
      >
        {pending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : published ? (
          <Eye className="h-3 w-3" />
        ) : (
          <EyeOff className="h-3 w-3" />
        )}
        <span>{pending ? "..." : published ? "Publik" : "Draft"}</span>
      </button>
    </div>
  )
}

export function ArticleTable({ articles }: { articles: ArticleItem[] }) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [search, setSearch] = useState("")

  const filtered = articles.filter(
    (a) =>
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt ?? "").toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete(id: number) {
    setDeletingId(id)
    try {
      await deleteArtikel(id)
      toast.success("Artikel berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus artikel")
    } finally {
      setDeletingId(null)
    }
  }

  if (articles.length === 0) {
    return (
      <div className="glass-card border border-white/8 p-14 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-white/25" />
          </div>
          <p className="text-white/40 text-sm">Belum ada artikel.</p>
          <Button
            asChild
            size="sm"
            className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold mt-1 gap-2"
          >
            <Link href="/dashboard/admin/articles/new">
              <Plus className="h-3.5 w-3.5" />
              Tulis Sekarang
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25 pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel..."
          className="glass-input pl-9 pr-9 h-9 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass-card border border-white/8 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/6 hover:bg-transparent">
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider w-10 text-center">#</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider w-14">Cover</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider">Judul & Ringkasan</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider hidden lg:table-cell text-center">Komentar</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Dibuat</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider text-center">Status</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-5 w-5 text-white/15" />
                    <p className="text-white/30 text-sm">Tidak ada hasil.</p>
                    <button
                      onClick={() => setSearch("")}
                      className="text-yellow-400/70 hover:text-yellow-400 text-xs transition-colors"
                    >
                      Reset pencarian
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => (
                <TableRow
                  key={item.id}
                  className="border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <TableCell className="text-center">
                    <span className="text-white/20 text-xs tabular-nums">{idx + 1}</span>
                  </TableCell>

                  <TableCell>
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="h-3.5 w-3.5 text-white/15" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-white/85 font-medium text-sm leading-tight line-clamp-1 group-hover:text-white transition-colors">
                      {item.title}
                    </p>
                    {item.excerpt && (
                      <p className="text-white/25 text-xs mt-0.5 line-clamp-1 max-w-64">
                        {item.excerpt}
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-center">
                    <span className="inline-flex items-center gap-1 text-white/35 text-xs">
                      <MessageSquare className="h-3 w-3" />
                      {item._count.comments}
                    </span>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <p className="text-white/30 text-xs">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </TableCell>

                  <TableCell>
                    <PublishedToggle id={item.id} initial={item.published} />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {item.slug && (
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/25 hover:text-white hover:bg-white/8 rounded-lg"
                              >
                                <Link href={`/artikel/${item.slug}`} target="_blank">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white text-xs">
                              Lihat artikel
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white/25 hover:text-white hover:bg-white/8 rounded-lg"
                            >
                              <Link href={`/dashboard/admin/articles/${item.id}/edit`}>
                                <Pencil className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white text-xs">
                            Edit
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <AlertDialog>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-white/25 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
                                  disabled={deletingId === item.id}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white text-xs">
                              Hapus
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <AlertDialogContent className="bg-neutral-900/95 backdrop-blur-xl border-white/10 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/40">
                              Tindakan ini tidak dapat dibatalkan. Artikel{" "}
                              <span className="text-white font-medium">"{item.title}"</span>{" "}
                              beserta semua komentarnya akan dihapus permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white/6 border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 hover:bg-red-600 text-white border-0"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
            <p className="text-white/25 text-xs">
              Menampilkan <span className="text-white/40 font-medium">{filtered.length}</span> dari{" "}
              <span className="text-white/40 font-medium">{articles.length}</span> artikel
            </p>
            <p className="text-white/20 text-xs hidden sm:block">
              {articles.filter((a) => a.published).length} dipublikasikan ·{" "}
              {articles.filter((a) => !a.published).length} draft
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
