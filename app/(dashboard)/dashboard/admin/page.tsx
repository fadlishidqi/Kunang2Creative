import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Images, Users, Newspaper, Wrench, Plus, TrendingUp } from "lucide-react"

async function getStats() {
  const [portfolioCount, blogCount] = await Promise.all([
    prisma.portfolio.count(),
    prisma.blog.count(),
  ])
  return { portfolioCount, blogCount }
}

export default async function AdminOverviewPage() {
  const stats = await getStats()

  const cards = [
    {
      title: "Total Portofolio",
      value: stats.portfolioCount,
      icon: Images,
      desc: "Item portofolio aktif",
      accent: "text-yellow-300",
      glow: "bg-yellow-400/10",
      border: "border-yellow-400/15",
    },
    {
      title: "Total Artikel",
      value: stats.blogCount,
      icon: Newspaper,
      desc: "Artikel blog diterbitkan",
      accent: "text-blue-300",
      glow: "bg-blue-400/10",
      border: "border-blue-400/15",
    },
    {
      title: "Layanan",
      value: "—",
      icon: Wrench,
      desc: "Segera hadir",
      accent: "text-purple-300",
      glow: "bg-purple-400/10",
      border: "border-purple-400/15",
    },
    {
      title: "Member",
      value: "—",
      icon: Users,
      desc: "Segera hadir",
      accent: "text-emerald-300",
      glow: "bg-emerald-400/10",
      border: "border-emerald-400/15",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold tracking-tight">Selamat Datang</h2>
          <p className="text-white/40 text-sm mt-1">
            Kelola konten Kunang-Kunang Creative dari sini.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-3 py-2">
          <TrendingUp className="h-4 w-4 text-yellow-400" />
          <span className="text-yellow-300 text-sm font-medium">Admin</span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className={`glass-card p-5 flex flex-col gap-3 border ${card.border} hover:bg-white/8 transition-colors`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm font-medium">{card.title}</span>
                <div className={`${card.glow} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${card.accent}`} />
                </div>
              </div>
              <div>
                <p className={`text-3xl font-bold ${card.accent}`}>{card.value}</p>
                <p className="text-white/30 text-xs mt-0.5">{card.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="glass-card p-5 border border-white/8">
        <p className="text-white/60 text-sm font-medium mb-3">Aksi Cepat</p>
        <div className="space-y-2">
          <Link
            href="/dashboard/admin/portfolio/new"
            className="flex items-center gap-3 p-3 rounded-xl bg-white/4 hover:bg-white/8 text-white/60 hover:text-white transition-all text-sm border border-white/6 hover:border-white/12"
          >
            <div className="w-7 h-7 rounded-lg bg-yellow-400/15 flex items-center justify-center">
              <Plus className="h-3.5 w-3.5 text-yellow-400" />
            </div>
            Tambah Portofolio Baru
          </Link>
        </div>
      </div>
    </div>
  )
}
