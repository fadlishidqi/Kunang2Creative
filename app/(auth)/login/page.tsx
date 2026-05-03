"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", { email, password, redirect: false })
    setLoading(false)

    if (result?.error) {
      setError("Email atau password salah.")
      return
    }

    const res = await fetch("/api/auth/session")
    const session = await res.json()
    const role = session?.user?.role

    router.push(role === "ADMIN" ? "/dashboard/admin" : "/dashboard/member")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#080c14] overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-yellow-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-amber-400/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-yellow-600/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm px-4 z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Image
            src="/logokunangsimple.png"
            alt="Kunang-Kunang Creative"
            width={56}
            height={56}
            className="drop-shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-white font-bold text-xl tracking-tight">Kunang-Kunang Creative</h1>
            <p className="text-white/35 text-sm mt-0.5">Masuk ke dashboard</p>
          </div>
        </div>

        {/* Glass card */}
        <div className="glass-card border border-white/10 p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/60 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@kunang2.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white/60 text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/8 border border-red-400/20 px-3 py-2.5">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold h-10 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memuat...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Kunang-Kunang Creative
        </p>
      </div>
    </div>
  )
}
