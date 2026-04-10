import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          `${geist.variable} font-sans antialiased bg-[#fafafa] text-gray-900`
        )}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}