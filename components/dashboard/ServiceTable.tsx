"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { deleteService } from "@/app/actions/service"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Pencil, Trash2, Plus, Wrench, Package } from "lucide-react"

interface ServiceItem {
  id: number
  title: string
  active: boolean
}

interface ServiceRow {
  id: number
  number: string
  category: string
  description: string
  order: number
  active: boolean
  createdAt: Date
  items: ServiceItem[]
}

export function ServiceTable({ services }: { services: ServiceRow[] }) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [, startTransition] = useTransition()

  async function handleDelete(id: number) {
    setDeletingId(id)
    startTransition(async () => {
      try {
        await deleteService(id)
        toast.success("Kategori layanan berhasil dihapus")
      } catch {
        toast.error("Gagal menghapus kategori layanan")
      } finally {
        setDeletingId(null)
      }
    })
  }

  if (services.length === 0) {
    return (
      <div className="glass-card border border-white/8 p-14 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center">
            <Wrench className="h-5 w-5 text-white/25" />
          </div>
          <p className="text-white/40 text-sm">Belum ada kategori layanan.</p>
          <Button
            asChild
            size="sm"
            className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold mt-1 gap-2"
          >
            <Link href="/dashboard/admin/services/new">
              <Plus className="h-3.5 w-3.5" />
              Tambah Sekarang
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card border border-white/8 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/6 hover:bg-transparent">
            <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider w-12 text-center">No</TableHead>
            <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider">Kategori Layanan</TableHead>
            <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider hidden md:table-cell text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Package className="h-3 w-3" />
                Paket
              </div>
            </TableHead>
            <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider text-center">Status</TableHead>
            <TableHead className="text-white/30 font-medium text-xs uppercase tracking-wider text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((item) => {
            const activeItems = item.items.filter((i) => i.active).length
            return (
              <TableRow
                key={item.id}
                className="border-white/5 hover:bg-white/3 transition-colors group"
              >
                <TableCell className="text-center">
                  <span className="text-yellow-400 text-sm font-black tabular-nums">{item.number}</span>
                </TableCell>

                <TableCell>
                  <p className="text-white/85 font-medium text-sm leading-tight group-hover:text-white transition-colors">
                    {item.category}
                  </p>
                  <p className="text-white/25 text-xs mt-0.5 line-clamp-1 max-w-64">
                    {item.description}
                  </p>
                  {/* Item titles preview */}
                  {item.items.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {item.items.slice(0, 3).map((si) => (
                        <span
                          key={si.id}
                          className={cn(
                            "text-[10px] rounded-full px-2 py-0.5 border",
                            si.active
                              ? "bg-white/5 border-white/10 text-white/40"
                              : "bg-transparent border-white/5 text-white/20 line-through"
                          )}
                        >
                          {si.title}
                        </span>
                      ))}
                      {item.items.length > 3 && (
                        <span className="text-[10px] text-white/20">+{item.items.length - 3}</span>
                      )}
                    </div>
                  )}
                </TableCell>

                <TableCell className="hidden md:table-cell text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-white/70 text-sm font-medium tabular-nums">{item.items.length}</span>
                    {activeItems < item.items.length && (
                      <span className="text-white/25 text-[10px]">{activeItems} aktif</span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border",
                      item.active
                        ? "bg-green-400/10 border-green-400/25 text-green-300"
                        : "bg-white/4 border-white/10 text-white/30"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full", item.active ? "bg-green-400" : "bg-white/20")} />
                    {item.active ? "Aktif" : "Nonaktif"}
                  </span>
                </TableCell>

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
                            <Link href={`/dashboard/admin/services/${item.id}/edit`}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white text-xs">
                          Edit & Kelola Paket
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
                          <AlertDialogTitle>Hapus Kategori Layanan?</AlertDialogTitle>
                          <AlertDialogDescription className="text-white/40">
                            Semua paket dalam kategori{" "}
                            <span className="text-white font-medium">"{item.category}"</span>{" "}
                            ({item.items.length} paket) juga akan ikut terhapus.
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
          })}
        </TableBody>
      </Table>

      <div className="px-4 py-2.5 border-t border-white/5">
        <p className="text-white/25 text-xs">
          Total <span className="text-white/40 font-medium">{services.length}</span> kategori ·{" "}
          <span className="text-white/40 font-medium">
            {services.reduce((sum, s) => sum + s.items.length, 0)}
          </span>{" "}
          paket layanan
        </p>
      </div>
    </div>
  )
}
