// components/sections/AboutSection.tsx
import { ArrowUpRight, Globe, Layers, Camera, Sparkles } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Web Development",
      desc: "Website modern, responsif, dan user-friendly yang mendukung performa bisnis.",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Social Media",
      desc: "Strategi pemasaran digital tepat sasaran untuk meningkatkan engagement.",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Photo & Video",
      desc: "Konten visual berkualitas tinggi untuk memperkuat identitas brand.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "IT Solutions",
      desc: "Solusi teknologi terintegrasi disesuaikan kebutuhan bisnis Anda.",
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* text */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
            — Tentang Kami
          </p>
          <h2 className="text-5xl font-black leading-tight text-gray-900 md:text-6xl">
            Cahaya di<br />
            <span className="italic text-gray-400">Era Digital</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-gray-500">
            Kunang Kunang Creative adalah perusahaan kreatif yang bergerak di
            bidang Social Media Management, Pengembangan Website, dan Teknologi
            Informasi. Seperti kunang-kunang yang membawa cahaya di kegelapan,
            kami berkomitmen membantu brand Anda bersinar.
          </p>
          <p className="mt-4 text-base leading-8 text-gray-500">
            Kami menggabungkan keahlian teknis dengan pendekatan kreatif untuk
            menghasilkan solusi yang tidak hanya indah, tetapi berdampak nyata
            pada pertumbuhan bisnis Anda.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-yellow-600 hover:underline cursor-pointer">
            Kenali tim kami <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* feature cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((c) => (
            <div
              key={c.title}
              className="group flex flex-col gap-3 rounded-2xl border border-black/6 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:border-yellow-300/60 hover:bg-white hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500 ring-1 ring-yellow-200 transition-all group-hover:bg-yellow-100">
                {c.icon}
              </div>
              <h3 className="font-bold text-gray-900">{c.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}