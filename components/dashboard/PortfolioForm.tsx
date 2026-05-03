"use client"

import { useActionState, useState } from "react"
import { PortfolioFormState } from "@/app/actions/portfolio"
import { ImageUploader } from "./ImageUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  "Branding",
  "Web Design",
  "UI/UX",
  "Social Media",
  "Print Design",
  "Motion Graphics",
  "Photography",
  "Video",
  "Lainnya",
]

interface PortfolioFormProps {
  action: (prev: PortfolioFormState, formData: FormData) => Promise<PortfolioFormState>
  defaultValues?: {
    title?: string
    category?: string
    images?: string[]
    description?: string
  }
  mode: "create" | "edit"
}

const initialState: PortfolioFormState = {}

export function PortfolioForm({ action, defaultValues, mode }: PortfolioFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [category, setCategory] = useState(defaultValues?.category ?? "")
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? [])

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold">
          {mode === "create" ? "Tambah Portofolio" : "Edit Portofolio"}
        </h2>
        <p className="text-white/40 text-sm mt-1">
          {mode === "create"
            ? "Isi form berikut untuk menambah item portofolio baru."
            : "Perbarui informasi portofolio ini."}
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Hidden fields */}
        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="images" value={JSON.stringify(images)} />

        {/* General error */}
        {state.errors?.general && (
          <div className="flex items-start gap-3 rounded-xl glass-card px-4 py-3 border-red-400/20 bg-red-400/5">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-400 text-sm">{state.errors.general[0]}</p>
          </div>
        )}

        {/* Images */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Gambar <span className="text-red-400">*</span>
            <span className="text-white/30 font-normal ml-1">(rasio 4:5 · gambar pertama = cover)</span>
          </Label>
          <ImageUploader value={images} onChange={setImages} />
          {state.errors?.images && (
            <p className="text-red-400 text-xs">{state.errors.images[0]}</p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white/70 text-sm">
            Judul <span className="text-red-400">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={defaultValues?.title}
            placeholder="Contoh: Redesign Website Kafe Blok M"
            className="glass-input"
          />
          {state.errors?.title && (
            <p className="text-red-400 text-xs">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Kategori <span className="text-red-400">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Pilih kategori..." />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white">
              {CATEGORIES.map((cat) => (
                <SelectItem
                  key={cat}
                  value={cat}
                  className="focus:bg-white/10 focus:text-white"
                >
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.category && (
            <p className="text-red-400 text-xs">{state.errors.category[0]}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white/70 text-sm">
            Deskripsi{" "}
            <span className="text-white/30 font-normal">(opsional)</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={defaultValues?.description ?? ""}
            placeholder="Ceritakan sedikit tentang proyek ini..."
            rows={4}
            className="glass-input resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : mode === "create" ? (
              "Simpan Portofolio"
            ) : (
              "Perbarui Portofolio"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            asChild
            className="text-white/40 hover:text-white hover:bg-white/6"
          >
            <Link href="/dashboard/admin/portfolio">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
