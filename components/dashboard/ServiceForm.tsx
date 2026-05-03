"use client"

import { useActionState, useState } from "react"
import { ServiceFormState } from "@/app/actions/service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

interface ServiceFormProps {
  action: (prev: ServiceFormState, formData: FormData) => Promise<ServiceFormState>
  defaultValues?: {
    number?: string
    category?: string
    description?: string
    order?: number
    active?: boolean
  }
  mode: "create" | "edit"
}

const initialState: ServiceFormState = {}

export function ServiceForm({ action, defaultValues, mode }: ServiceFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [active, setActive] = useState(defaultValues?.active ?? true)

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="active" value={String(active)} />

      {state.errors?.general && (
        <div className="flex items-start gap-3 rounded-xl glass-card px-4 py-3 border-red-400/20 bg-red-400/5">
          <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-red-400 text-sm">{state.errors.general[0]}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number" className="text-white/70 text-sm">
            Nomor <span className="text-red-400">*</span>
            <span className="text-white/30 font-normal ml-1">(contoh: 01)</span>
          </Label>
          <Input
            id="number"
            name="number"
            defaultValue={defaultValues?.number ?? ""}
            placeholder="01"
            className="glass-input"
          />
          {state.errors?.number && (
            <p className="text-red-400 text-xs">{state.errors.number[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="order" className="text-white/70 text-sm">
            Urutan
          </Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={defaultValues?.order ?? 0}
            placeholder="0"
            className="glass-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-white/70 text-sm">
          Nama Kategori <span className="text-red-400">*</span>
          <span className="text-white/30 font-normal ml-1">(contoh: Social Media & Design)</span>
        </Label>
        <Input
          id="category"
          name="category"
          defaultValue={defaultValues?.category ?? ""}
          placeholder="Social Media & Design"
          className="glass-input"
        />
        {state.errors?.category && (
          <p className="text-red-400 text-xs">{state.errors.category[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-white/70 text-sm">
          Deskripsi Kategori <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description ?? ""}
          placeholder="Deskripsi singkat tentang kategori layanan ini..."
          rows={3}
          className="glass-input resize-none"
        />
        {state.errors?.description && (
          <p className="text-red-400 text-xs">{state.errors.description[0]}</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl glass-card border border-white/8 px-4 py-3">
        <div>
          <p className="text-white/80 text-sm font-medium">Tampilkan di website</p>
          <p className="text-white/30 text-xs mt-0.5">Matikan untuk menyembunyikan kategori ini</p>
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
            "Simpan Kategori"
          ) : (
            "Perbarui Kategori"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          asChild
          className="text-white/40 hover:text-white hover:bg-white/6"
        >
          <Link href="/dashboard/admin/services">Batal</Link>
        </Button>
      </div>
    </form>
  )
}
