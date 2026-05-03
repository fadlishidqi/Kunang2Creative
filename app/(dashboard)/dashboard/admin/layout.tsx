import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/dashboard/AdminSidebar"
import { AdminHeader } from "@/components/dashboard/AdminHeader"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") redirect("/login")

  return (
    <div className="relative flex min-h-screen bg-[#080c14] overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-yellow-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] bg-amber-400/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-yellow-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.04),transparent_60%)]" />
      </div>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <AdminHeader session={session} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
