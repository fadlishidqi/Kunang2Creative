"use client"

import { useTransition } from "react"
import { deleteServiceItem } from "@/app/actions/serviceItem"
import { toast } from "sonner"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Props {
  itemId: number
  serviceId: number
  itemTitle: string
}

export function ServiceItemDeleteButton({ itemId, serviceId, itemTitle }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteServiceItem(itemId, serviceId)
        toast.success("Paket berhasil dihapus")
      } catch {
        toast.error("Gagal menghapus paket")
      }
    })
  }

  return (
    <AlertDialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/25 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
                disabled={isPending}
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
          <AlertDialogTitle>Hapus Paket?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/40">
            Paket{" "}
            <span className="text-white font-medium">"{itemTitle}"</span>{" "}
            akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/6 border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white border-0"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
