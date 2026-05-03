"use client"

import { useActionState, useState, useRef } from "react"
import { ArtikelFormState } from "@/app/actions/artikel"
import { ImageUploader } from "./ImageUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, AlertCircle, Eye, EyeOff, ImagePlus } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ArticleFormProps {
  action: (prev: ArtikelFormState, formData: FormData) => Promise<ArtikelFormState>
  defaultValues?: {
    title?: string
    excerpt?: string
    content?: string
    coverImage?: string
    published?: boolean
  }
  mode: "create" | "edit"
}

const initialState: ArtikelFormState = {}

export function ArticleForm({ action, defaultValues, mode }: ArticleFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [coverImages, setCoverImages] = useState<string[]>(
    defaultValues?.coverImage ? [defaultValues.coverImage] : []
  )
  const [published, setPublished] = useState(defaultValues?.published ?? false)
  const [content, setContent] = useState(defaultValues?.content ?? "")
  const [uploading, setUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageInsert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (!res.ok) { toast.error("Upload gagal"); return }
      const { url } = await res.json()
      const ta = textareaRef.current
      const pos = ta?.selectionStart ?? content.length
      const before = content.slice(0, pos)
      const after = content.slice(pos)
      const tag = `\n\n[img:${url}]\n\n`
      setContent(before + tag + after)
      toast.success("Gambar disisipkan")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold">
          {mode === "create" ? "Tulis Artikel" : "Edit Artikel"}
        </h2>
        <p className="text-white/40 text-sm mt-1">
          {mode === "create"
            ? "Isi form berikut untuk mempublikasikan artikel baru."
            : "Perbarui informasi artikel ini."}
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="coverImage" value={coverImages[0] ?? ""} />
        <input type="hidden" name="published" value={String(published)} />
        <input type="hidden" name="content" value={content} />

        {state.errors?.general && (
          <div className="flex items-start gap-3 rounded-xl glass-card px-4 py-3 border-red-400/20 bg-red-400/5">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-400 text-sm">{state.errors.general[0]}</p>
          </div>
        )}

        {/* Cover Image */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Cover Artikel{" "}
            <span className="text-white/30 font-normal">(opsional · rasio 16:9 tampil lebih baik)</span>
          </Label>
          <ImageUploader value={coverImages} onChange={setCoverImages} maxImages={1} />
          {state.errors?.coverImage && (
            <p className="text-red-400 text-xs">{state.errors.coverImage[0]}</p>
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
            placeholder="Tulis judul artikel yang menarik..."
            className="glass-input text-base"
          />
          {state.errors?.title && (
            <p className="text-red-400 text-xs">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt" className="text-white/70 text-sm">
            Ringkasan{" "}
            <span className="text-white/30 font-normal">(opsional · tampil di daftar artikel)</span>
          </Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={defaultValues?.excerpt ?? ""}
            placeholder="Ringkasan singkat artikel (1–2 kalimat)..."
            rows={2}
            className="glass-input resize-none"
          />
          {state.errors?.excerpt && (
            <p className="text-red-400 text-xs">{state.errors.excerpt[0]}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="content" className="text-white/70 text-sm">
              Konten <span className="text-red-400">*</span>
            </Label>
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-yellow-400 transition-colors disabled:opacity-40"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
              {uploading ? "Mengupload..." : "Sisipkan Gambar"}
            </button>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageInsert} />
          </div>
          <Textarea
            ref={textareaRef}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis isi artikel di sini..."
            rows={16}
            className="glass-input resize-y"
          />
          {state.errors?.content && (
            <p className="text-red-400 text-xs">{state.errors.content[0]}</p>
          )}
        </div>

        {/* Published toggle */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/3">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors shrink-0",
              published ? "bg-yellow-400 border-yellow-400" : "bg-white/10 border-white/15"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                published ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <div>
            <p className="text-white/80 text-sm font-medium flex items-center gap-1.5">
              {published ? (
                <><Eye className="h-3.5 w-3.5 text-yellow-400" /> Dipublikasikan</>
              ) : (
                <><EyeOff className="h-3.5 w-3.5 text-white/30" /> Draft</>
              )}
            </p>
            <p className="text-white/30 text-xs mt-0.5">
              {published
                ? "Artikel terlihat oleh publik"
                : "Artikel disimpan sebagai draft, tidak terlihat publik"}
            </p>
          </div>
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
              "Simpan Artikel"
            ) : (
              "Perbarui Artikel"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            asChild
            className="text-white/40 hover:text-white hover:bg-white/6"
          >
            <Link href="/dashboard/admin/articles">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
