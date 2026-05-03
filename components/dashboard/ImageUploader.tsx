"use client"

import { useRef, useState } from "react"
import { Upload, X, GripVertical, ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
}

export function ImageUploader({ value, onChange, maxImages }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [draggingOver, setDraggingOver] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  async function uploadFiles(files: FileList | File[]) {
    const arr = Array.from(files)
    if (!arr.length) return

    const remaining = maxImages ? maxImages - value.length : arr.length
    if (remaining <= 0) {
      toast.error(`Maksimal ${maxImages} gambar`)
      return
    }

    const toUpload = arr.slice(0, remaining)
    if (toUpload.length < arr.length) {
      toast.warning(`Hanya ${toUpload.length} gambar yang diupload (batas ${maxImages})`)
    }

    setUploading(true)
    const uploaded: string[] = []
    for (const file of toUpload) {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (res.ok) {
        const data = await res.json()
        uploaded.push(data.url)
      } else {
        const err = await res.json()
        toast.error(err.error || "Upload gagal")
      }
    }

    onChange([...value, ...uploaded])
    setUploading(false)
  }

  function removeImage(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDraggingOver(false)
    if (e.dataTransfer.files.length) {
      uploadFiles(e.dataTransfer.files)
    }
  }

  // Reorder via drag
  function onItemDragStart(index: number) {
    setDragIndex(index)
  }
  function onItemDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    setDragOverIndex(index)
  }
  function onItemDrop(index: number) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null)
      setDragOverIndex(null)
      return
    }
    const reordered = [...value]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(index, 0, moved)
    onChange(reordered)
    setDragIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div className="space-y-3">
      {/* Image grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, index) => (
            <div
              key={url + index}
              draggable
              onDragStart={() => onItemDragStart(index)}
              onDragOver={(e) => onItemDragOver(e, index)}
              onDrop={() => onItemDrop(index)}
              onDragEnd={() => { setDragIndex(null); setDragOverIndex(null) }}
              className={cn(
                "relative rounded-xl overflow-hidden border transition-all cursor-move group",
                dragOverIndex === index
                  ? "border-yellow-400/60 ring-2 ring-yellow-400/30"
                  : "border-white/10"
              )}
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={url}
                alt={`Gambar ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Cover badge */}
              {index === 0 && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Cover
                </span>
              )}

              {/* Number badge */}
              {index > 0 && (
                <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {index + 1}
                </span>
              )}

              {/* Drag handle */}
              <div className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-1">
                  <GripVertical className="h-3 w-3 text-white" />
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm hover:bg-red-500/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="h-3 w-3 text-white" />
              </button>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {(!maxImages || value.length < maxImages) && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDraggingOver(true) }}
          onDragLeave={() => setDraggingOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed transition-all cursor-pointer",
            "bg-white/3 hover:bg-white/6",
            draggingOver
              ? "border-yellow-400/60 bg-yellow-400/5 scale-[1.01]"
              : "border-white/15 hover:border-white/25",
            uploading && "pointer-events-none opacity-60",
            value.length > 0 ? "py-5" : "py-12"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 text-yellow-400 animate-spin" />
              <p className="text-white/50 text-sm">Mengupload...</p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/7 border border-white/15">
                {value.length === 0 ? (
                  <ImageIcon className="h-5 w-5 text-white/40" />
                ) : (
                  <Upload className="h-5 w-5 text-white/40" />
                )}
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm font-medium">
                  {value.length === 0 ? "Upload gambar" : "Tambah gambar"}
                </p>
                <p className="text-white/30 text-xs mt-0.5">
                  Drag & drop atau klik · JPG, PNG, WebP · Maks 5MB
                  {maxImages && ` · ${value.length}/${maxImages} gambar`}
                </p>
              </div>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  )
}
