"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { deletePortfolio, toggleFeatured } from "@/app/actions/portfolio"
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Pencil, Trash2, ImageOff, Plus, Globe, Search, ExternalLink, X, Star, Loader2 } from "lucide-react"

interface PortfolioItem {
  id: number
  slug?: string | null
  title: string
  category: string
  images: unknown
  description: string | null
  featured: boolean
  createdAt: Date
}

function getCover(images: unknown): string | null {
  if (Array.isArray(images) && typeof images[0] === "string") return images[0]
  return null
}

function getImageCount(images: unknown): number {
  if (Array.isArray(images)) return images.length
  return 0
}

function FeaturedToggle({ id, initial }: { id: number; initial: boolean }) {
  const [featured, setFeatured] = useState(initial)
  const [pending, startTransition] = useTransition()

  function handleToggle() {
    const next = !featured
    setFeatured(next)
    startTransition(async () => {
      try {
        await toggleFeatured(id, next)
        toast.success(next ? "Ditampilkan di beranda" : "Disembunyikan dari beranda")
      } catch {
        setFeatured(!next)
        toast.error("Gagal mengubah status tampil")
      }
    })
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleToggle}
        disabled={pending}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all select-none",
          "border",
          pending && "cursor-wait opacity-60",
          featured && !pending
            ? "bg-yellow-400/15 border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/25"
            : !pending
            ? "bg-white/4 border-white/10 text-white/30 hover:bg-white/8 hover:text-white/50 hover:border-white/20"
            : "bg-white/4 border-white/10 text-white/30"
        )}
      >
        {pending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Star
            className={cn("h-3 w-3", featured ? "fill-yellow-400 text-yellow-400" : "text-white/25")}
          />
        )}
        <span>{pending ? "..." : featured ? "Beranda" : "Sembunyikan"}</span>
      </button>
    </div>
  )
}

const ALL_CATEGORIES = "Semua"

export function PortfolioTable({ portfolios }: { portfolios: PortfolioItem[] }) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES)

  const categories = Array.from(new Set(portfolios.map((p) => p.category))).sort()

  const filtered = portfolios.filter((item) => {
    const matchSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      categoryFilter === ALL_CATEGORIES || item.category === categoryFilter
    return matchSearch && matchCategory
  })

  async function handleDelete(id: number) {
    setDeletingId(id)
    try {
      await deletePortfolio(id)
      toast.success("Portofolio berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus portofolio")
    } finally {
      setDeletingId(null)
    }
  }

  if (portfolios.length === 0) {
    return (
      <div className="glass-card border border-white/8 p-14 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center">
            <ImageOff className="h-5 w-5 text-white/25" />
          </div>
          <p className="text-white/40 text-sm">Belum ada portofolio.</p>
          <Button
            asChild
            size="sm"
            className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold mt-1 gap-2"
          >
            <Link href="/dashboard/admin/portfolio/new">
              <Plus className="h-3.5 w-3.5" />
              Tambah Sekarang
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/25 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau kategori..."
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
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="glass-input h-9 text-sm w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900/95 backdrop-blur-xl border-white/10 text-white">
            <SelectItem value={ALL_CATEGORIES} className="focus:bg-white/10 focus:text-white">
              Semua Kategori
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="focus:bg-white/10 focus:text-white">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="glass-card border border-white/8 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/6 hover:bg-transparent">
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider w-10 text-center">#</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider w-14">Cover</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider">Judul & Deskripsi</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Kategori</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider hidden lg:table-cell text-center">Foto</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Dibuat</TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Globe className="h-3 w-3" />
                  Beranda
                </div>
              </TableHead>
              <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-5 w-5 text-white/15" />
                    <p className="text-white/30 text-sm">Tidak ada hasil untuk pencarian ini.</p>
                    <button
                      onClick={() => { setSearch(""); setCategoryFilter(ALL_CATEGORIES) }}
                      className="text-yellow-400/70 hover:text-yellow-400 text-xs transition-colors"
                    >
                      Reset filter
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, idx) => {
                const cover = getCover(item.images)
                const count = getImageCount(item.images)
                return (
                  <TableRow
                    key={item.id}
                    className="border-white/5 hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* No */}
                    <TableCell className="text-center">
                      <span className="text-white/20 text-xs tabular-nums">{idx + 1}</span>
                    </TableCell>

                    {/* Cover */}
                    <TableCell>
                      <div
                        className="w-10 rounded-lg overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center shrink-0"
                        style={{ aspectRatio: "4/5" }}
                      >
                        {cover ? (
                          <img src={cover} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageOff className="h-3.5 w-3.5 text-white/15" />
                        )}
                      </div>
                    </TableCell>

                    {/* Title + description */}
                    <TableCell>
                      <p className="text-white/85 font-medium text-sm leading-tight line-clamp-1 group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-white/25 text-xs mt-0.5 line-clamp-1 max-w-56">
                          {item.description}
                        </p>
                      )}
                    </TableCell>

                    {/* Category */}
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="bg-yellow-400/10 text-yellow-300 border-yellow-400/20 text-[11px] font-medium px-2 py-0.5">
                        {item.category}
                      </Badge>
                    </TableCell>

                    {/* Image count */}
                    <TableCell className="hidden lg:table-cell text-center">
                      <span className="text-white/35 text-xs tabular-nums">{count}</span>
                    </TableCell>

                    {/* Created */}
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-white/30 text-xs">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </TableCell>

                    {/* Featured toggle */}
                    <TableCell>
                      <FeaturedToggle id={item.id} initial={item.featured} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/25 hover:text-white hover:bg-white/8 rounded-lg"
                              >
                                <Link href={`/portfolio/${item.slug ?? item.id}`} target="_blank">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white text-xs">
                              Lihat di website
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                asChild
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/25 hover:text-white hover:bg-white/8 rounded-lg"
                              >
                                <Link href={`/dashboard/admin/portfolio/${item.id}/edit`}>
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
                              <AlertDialogTitle>Hapus Portofolio?</AlertDialogTitle>
                              <AlertDialogDescription className="text-white/40">
                                Tindakan ini tidak dapat dibatalkan. Portofolio{" "}
                                <span className="text-white font-medium">"{item.title}"</span>{" "}
                                akan dihapus secara permanen.
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
                )
              })
            )}
          </TableBody>
        </Table>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
            <p className="text-white/25 text-xs">
              Menampilkan <span className="text-white/40 font-medium">{filtered.length}</span> dari{" "}
              <span className="text-white/40 font-medium">{portfolios.length}</span> item
            </p>
            <p className="text-white/20 text-xs hidden sm:block">
              {portfolios.filter((p) => p.featured).length} tampil di beranda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
