"use client"

import { useActionState, useState, useRef, KeyboardEvent } from "react"
import { ServiceItemFormState } from "@/app/actions/serviceItem"
import { ImageUploader } from "./ImageUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, AlertCircle, X } from "lucide-react"
import Link from "next/link"

interface ServiceItemFormProps {
  action: (prev: ServiceItemFormState, formData: FormData) => Promise<ServiceItemFormState>
  serviceId: number
  defaultValues?: {
    title?: string
    description?: string
    price?: string
    tags?: string[]
    features?: string[]
    images?: string[]
    order?: number
    active?: boolean
  }
  mode: "create" | "edit"
}

const initialState: ServiceItemFormState = {}

export function ServiceItemForm({ action, serviceId, defaultValues, mode }: ServiceItemFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [tags, setTags] = useState<string[]>(defaultValues?.tags ?? [])
  const [tagInput, setTagInput] = useState("")
  const [features, setFeatures] = useState<string[]>(defaultValues?.features ?? [])
  const [featureInput, setFeatureInput] = useState("")
  const [active, setActive] = useState(defaultValues?.active ?? true)
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? [])
  const tagInputRef = useRef<HTMLInputElement>(null)
  const featureInputRef = useRef<HTMLInputElement>(null)

  function addTag() {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags([...tags, t])
    setTagInput("")
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag))
  }

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags(tags.slice(0, -1))
    }
  }

  function addFeature() {
    const f = featureInput.trim()
    if (f && !features.includes(f)) setFeatures([...features, f])
    setFeatureInput("")
  }

  function removeFeature(f: string) {
    setFeatures(features.filter((x) => x !== f))
  }

  function handleFeatureKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addFeature()
    } else if (e.key === "Backspace" && featureInput === "" && features.length > 0) {
      setFeatures(features.slice(0, -1))
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold">
          {mode === "create" ? "Tambah Paket / Item" : "Edit Paket / Item"}
        </h2>
        <p className="text-white/40 text-sm mt-1">
          {mode === "create"
            ? "Tambah paket atau jenis layanan baru dalam kategori ini."
            : "Perbarui informasi paket layanan ini."}
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="tags" value={JSON.stringify(tags)} />
        <input type="hidden" name="features" value={JSON.stringify(features)} />
        <input type="hidden" name="active" value={String(active)} />
        <input type="hidden" name="images" value={JSON.stringify(images)} />

        {state.errors?.general && (
          <div className="flex items-start gap-3 rounded-xl glass-card px-4 py-3 border-red-400/20 bg-red-400/5">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-400 text-sm">{state.errors.general[0]}</p>
          </div>
        )}

        {/* Images */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Thumbnail Paket
            <span className="text-white/30 font-normal ml-1">(opsional · maks 1 gambar)</span>
          </Label>
          <ImageUploader value={images} onChange={setImages} maxImages={1} />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white/70 text-sm">
            Judul Paket / Layanan <span className="text-red-400">*</span>
            <span className="text-white/30 font-normal ml-1">(contoh: Social Media Management)</span>
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={defaultValues?.title ?? ""}
            placeholder="Social Media Management"
            className="glass-input"
          />
          {state.errors?.title && (
            <p className="text-red-400 text-xs">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white/70 text-sm">
            Deskripsi <span className="text-white/30 font-normal">(opsional)</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={defaultValues?.description ?? ""}
            placeholder="Jelaskan apa yang termasuk dalam paket ini..."
            rows={3}
            className="glass-input resize-none"
          />
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Poin Keunggulan / Fitur
            <span className="text-white/30 font-normal ml-1">(tekan Enter untuk menambah)</span>
          </Label>
          <div className="glass-card rounded-xl border border-white/8 divide-y divide-white/5">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shrink-0" />
                <span className="flex-1 text-sm text-white/80">{f}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(f)}
                  className="text-white/20 hover:text-red-400 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3 px-3.5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/15 shrink-0" />
              <input
                ref={featureInputRef}
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
                onBlur={addFeature}
                placeholder="Contoh: Revisi hingga 3x..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/20"
              />
            </div>
          </div>
          {state.errors?.features && (
            <p className="text-red-400 text-xs">{state.errors.features[0]}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-white/70 text-sm">
            Harga <span className="text-white/30 font-normal">(opsional, tulis fleksibel)</span>
          </Label>
          <Input
            id="price"
            name="price"
            defaultValue={defaultValues?.price ?? ""}
            placeholder="Mulai dari Rp 500.000 · atau · Hubungi Kami"
            className="glass-input"
          />
          <p className="text-white/25 text-xs">
            Contoh: &quot;Mulai dari Rp 1.500.000/bulan&quot;, &quot;Rp 75.000/desain&quot;, &quot;Hubungi Kami&quot;
          </p>
          {state.errors?.price && (
            <p className="text-red-400 text-xs">{state.errors.price[0]}</p>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label className="text-white/70 text-sm">
            Tags <span className="text-white/30 font-normal">(tekan Enter untuk menambah)</span>
          </Label>
          <div
            className="glass-input flex flex-wrap gap-2 p-2.5 min-h-[44px] cursor-text"
            onClick={() => tagInputRef.current?.focus()}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-yellow-400/15 border border-yellow-400/25 text-yellow-300 text-xs px-2.5 py-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
                  className="text-yellow-400/50 hover:text-yellow-300 transition-colors ml-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              ref={tagInputRef}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={addTag}
              placeholder={tags.length === 0 ? "Ketik tag lalu tekan Enter..." : ""}
              className="flex-1 min-w-[140px] bg-transparent text-sm text-white outline-none placeholder:text-white/20"
            />
          </div>
          {state.errors?.tags && (
            <p className="text-red-400 text-xs">{state.errors.tags[0]}</p>
          )}
        </div>

        {/* Order */}
        <div className="space-y-2">
          <Label htmlFor="order" className="text-white/70 text-sm">Urutan</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={defaultValues?.order ?? 0}
            className="glass-input w-32"
          />
        </div>

        {/* Active */}
        <div className="flex items-center justify-between rounded-xl glass-card border border-white/8 px-4 py-3">
          <div>
            <p className="text-white/80 text-sm font-medium">Tampilkan</p>
            <p className="text-white/30 text-xs mt-0.5">Matikan untuk menyembunyikan paket ini</p>
          </div>
          <Switch
            checked={active}
            onCheckedChange={setActive}
            className="data-[state=checked]:bg-yellow-400"
          />
        </div>

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
              "Simpan Paket"
            ) : (
              "Perbarui Paket"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            asChild
            className="text-white/40 hover:text-white hover:bg-white/6"
          >
            <Link href={`/dashboard/admin/services/${serviceId}/edit`}>Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
