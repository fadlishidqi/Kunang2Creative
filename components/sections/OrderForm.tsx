"use client"

import { useState } from "react"
import { ArrowUpRight, Loader2 } from "lucide-react"

interface OrderFormProps {
  itemTitle: string
  serviceCategory: string
}

const WA_NUMBER = "6281398169073"

export function OrderForm({ itemTitle, serviceCategory }: OrderFormProps) {
  const [form, setForm] = useState({
    namaProject: "",
    deskripsiProject: "",
    deadline: "",
    namaLengkap: "",
    noWa: "",
  })
  const [loading, setLoading] = useState(false)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const text = [
      `Halo Kunang-Kunang Creative! Saya ingin memesan paket berikut:`,
      ``,
      `*Paket:* ${itemTitle}`,
      `*Layanan:* ${serviceCategory}`,
      ``,
      `*Nama Project:* ${form.namaProject}`,
      `*Deskripsi Project:* ${form.deskripsiProject}`,
      `*Deadline:* ${form.deadline}`,
      ``,
      `*Nama Lengkap:* ${form.namaLengkap}`,
      `*No. WhatsApp:* ${form.noWa}`,
    ].join("\n")

    window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
  }

  const inputClass =
    "w-full rounded-xl border border-black/8 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nama Project */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          Nama Project <span className="text-red-400">*</span>
        </label>
        <input
          required
          value={form.namaProject}
          onChange={set("namaProject")}
          placeholder="Contoh: Website Toko Online Sepatu"
          className={inputClass}
        />
      </div>

      {/* Deskripsi Project */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          Deskripsi Project <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={form.deskripsiProject}
          onChange={set("deskripsiProject")}
          placeholder="Ceritakan kebutuhan project Anda secara singkat..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Deadline */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          Deadline <span className="text-red-400">*</span>
        </label>
        <input
          required
          type="date"
          value={form.deadline}
          onChange={set("deadline")}
          min={new Date().toISOString().split("T")[0]}
          className={inputClass}
        />
      </div>

      <div className="border-t border-black/5 pt-5 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Informasi Kontak
        </p>

        {/* Nama Lengkap */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">
            Nama Lengkap <span className="text-red-400">*</span>
          </label>
          <input
            required
            value={form.namaLengkap}
            onChange={set("namaLengkap")}
            placeholder="Nama lengkap Anda"
            className={inputClass}
          />
        </div>

        {/* No WA */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">
            No. WhatsApp <span className="text-red-400">*</span>
          </label>
          <input
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9]+"
            value={form.noWa}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "")
              setForm((prev) => ({ ...prev, noWa: val }))
            }}
            placeholder="08xxxxxxxxxx"
            className={inputClass}
          />
          <p className="text-xs text-gray-400">Hanya angka, tanpa tanda hubung atau spasi</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-neutral-900 transition-all hover:bg-yellow-300 active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Order Sekarang
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}
