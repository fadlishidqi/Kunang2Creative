import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Kunang-Kunang Creative",
  description: "Creative Digital Agency NO.1 di Semarang. Kami menyediakan layanan desain grafis, pengembangan web, pemasaran digital, dan produksi video untuk membantu bisnis Anda tumbuh dan bersinar di dunia digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(`${geist.variable} font-sans antialiased bg-[#0a0a0a] text-white`)}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}