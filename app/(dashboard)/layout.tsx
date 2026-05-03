import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  )
}
