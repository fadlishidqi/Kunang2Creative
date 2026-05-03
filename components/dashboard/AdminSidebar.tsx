"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Images,
  Wrench,
  Newspaper,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Portofolio", href: "/dashboard/admin/portfolio", icon: Images },
  { label: "Layanan", href: "/dashboard/admin/services", icon: Wrench },
  { label: "Artikel", href: "/dashboard/admin/articles", icon: Newspaper },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="glass-sidebar flex flex-col w-64 min-h-screen shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/7">
        <Image
          src="/logokunangsimple.png"
          alt="Kunang-Kunang Creative"
          width={36}
          height={36}
          className="shrink-0"
        />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Kunang-Kunang</p>
          <p className="text-white/35 text-xs">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-white/25 text-xs font-medium uppercase tracking-wider px-2 mb-2">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === "/dashboard/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                isActive
                  ? "bg-yellow-400/15 text-yellow-300 border border-yellow-400/20"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <ChevronRight className="ml-auto h-3.5 w-3.5 text-yellow-400/50" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4">
        <Separator className="bg-white/7 mb-3" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full justify-start gap-3 text-white/40 hover:text-red-400 hover:bg-red-400/10 px-3 rounded-xl"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </aside>
  )
}
