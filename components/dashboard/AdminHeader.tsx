"use client"

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, ChevronRight } from "lucide-react"

interface Crumb {
  label: string
  href?: string
}

function useBreadcrumbs(): Crumb[] {
  const pathname = usePathname()

  // /dashboard/admin
  if (pathname === "/dashboard/admin") {
    return [{ label: "Overview" }]
  }

  // /dashboard/admin/portfolio
  if (pathname === "/dashboard/admin/portfolio") {
    return [
      { label: "Portofolio" },
    ]
  }

  // /dashboard/admin/portfolio/new
  if (pathname === "/dashboard/admin/portfolio/new") {
    return [
      { label: "Portofolio", href: "/dashboard/admin/portfolio" },
      { label: "Tambah" },
    ]
  }

  // /dashboard/admin/portfolio/[id]/edit
  if (/^\/dashboard\/admin\/portfolio\/\d+\/edit$/.test(pathname)) {
    return [
      { label: "Portofolio", href: "/dashboard/admin/portfolio" },
      { label: "Edit" },
    ]
  }

  return [{ label: "Dashboard" }]
}

interface AdminHeaderProps {
  session: Session
}

export function AdminHeader({ session }: AdminHeaderProps) {
  const breadcrumbs = useBreadcrumbs()

  const initials = session.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD"

  return (
    <header className="glass-header h-14 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5">
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1
          return (
            <div key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 text-white/20" />}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? "text-white/80 font-semibold text-sm" : "text-white/40 text-sm"}>
                  {crumb.label}
                </span>
              )}
            </div>
          )
        })}
      </nav>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2.5 hover:opacity-80 transition-opacity outline-none">
            <div className="text-right hidden sm:block">
              <p className="text-white/80 text-sm font-medium leading-tight">
                {session.user?.name || "Admin"}
              </p>
              <p className="text-white/35 text-xs leading-tight">{session.user?.email}</p>
            </div>
            <Avatar className="h-8 w-8 border border-white/15">
              <AvatarFallback className="bg-yellow-400/20 text-yellow-300 text-xs font-bold border border-yellow-400/30">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-neutral-900/90 backdrop-blur-xl border-white/10 text-white w-48"
        >
          <DropdownMenuLabel className="text-white/35 text-xs font-normal">
            {session.user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/8" />
          <DropdownMenuItem className="text-white/60 focus:bg-white/8 focus:text-white gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            Profil
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/8" />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-red-400 focus:bg-red-400/10 focus:text-red-400 gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
