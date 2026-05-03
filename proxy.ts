import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Admin-only routes
    if (pathname.startsWith("/dashboard/admin") && session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Redirect logged-in users away from login
  if (pathname === "/login" && session) {
    const redirectTo =
      session.user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/member"
    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
