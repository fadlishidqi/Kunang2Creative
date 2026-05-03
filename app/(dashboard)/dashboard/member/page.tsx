import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { signOut } from "@/auth"

export default async function MemberDashboardPage() {
  const session = await auth()
  if (!session || session.user.role !== "MEMBER") redirect("/login")

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-white text-2xl font-bold">Member Dashboard</h1>
        <p className="text-neutral-400">Halaman ini sedang dalam pengembangan.</p>
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" })
          }}
        >
          <button
            type="submit"
            className="text-sm text-red-400 hover:text-red-300 underline"
          >
            Keluar
          </button>
        </form>
      </div>
    </div>
  )
}
