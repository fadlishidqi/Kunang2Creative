// components/sections/ContactSection.tsx
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-yellow-400 via-yellow-400 to-amber-400 p-12 text-center shadow-2xl shadow-yellow-200 md:p-20">
          {/* decorative rings */}
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[40px] border-yellow-300/30" />
          <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full border-[30px] border-amber-300/30" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

          <div className="relative">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-700">
              — Mari Berkolaborasi
            </p>
            <h2 className="text-4xl font-black text-gray-900 md:text-6xl">
              Punya Proyek<br />
              <span className="italic">dalam Pikiran?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-yellow-900/70">
              Ceritakan ide Anda kepada kami. Kami siap membantu mewujudkan
              visi digital bisnis Anda menjadi kenyataan.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:halo@kunang2creative.com"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-700 active:scale-95 shadow-lg shadow-gray-900/20"
              >
                halo@kunang2creative.com
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-yellow-600/30 bg-white/30 px-8 py-4 text-sm font-bold text-gray-900 backdrop-blur-md transition-all hover:bg-white/50 active:scale-95"
              >
                WhatsApp Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}