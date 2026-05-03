import type { Metadata } from "next";
import "./globals.css";
import { Geist, Pixelify_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  title: "Kunang-Kunang Creative",
  description:
    "Creative Digital Agency NO.1 di Semarang. Layanan desain grafis, web, pemasaran digital & produksi video.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={cn(
          `${geist.variable} ${pixelify.variable} font-sans antialiased bg-[#fafafa] text-gray-900`
        )}
        suppressHydrationWarning
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
