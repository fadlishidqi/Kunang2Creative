import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="id" className="scroll-smooth">
      <body className="antialiased font-sans text-gray-800">
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}