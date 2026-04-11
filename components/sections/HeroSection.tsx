// components/sections/HeroSection.tsx
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16">
      {/* pill badge */}
      <div className="mb-10 flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500 shadow-sm backdrop-blur-md">
        <Sparkles className="h-3 w-3 text-yellow-500" />
        Digital Creative Agency — Semarang
      </div>

      {/* headline */}
      <h1 className="max-w-5xl text-center text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.9] tracking-tight">
        <span className="block text-gray-900">We Make</span>
        <span className="block italic text-yellow-400">Brands</span>
        <span className="block text-gray-900">Shine.</span>
      </h1>

      {/* sub */}
      <p className="mt-8 max-w-xl text-center text-base leading-relaxed text-gray-500 md:text-lg">
        Mitra strategis pertumbuhan digital Anda — dari identitas visual,
        social media, hingga teknologi web yang berdampak nyata.
      </p>

      {/* cta row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-bold text-black shadow-lg shadow-yellow-200 transition-all hover:bg-yellow-300 hover:shadow-yellow-300 active:scale-95"
        >
          Mulai Proyek Anda
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link
          href="#portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-8 py-3.5 text-sm font-medium text-gray-700 backdrop-blur-md transition-all hover:bg-white hover:border-black/20 active:scale-95"
        >
          Lihat Karya
        </Link>
      </div>
    </section>
  );
}