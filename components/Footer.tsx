import Link from "next/link";

export default function Footer() {
  const nav = [
    { label: "Tentang Kami", href: "/#about" },
    { label: "Layanan", href: "/#services" },
    { label: "Portofolio", href: "/#portfolio" },
    { label: "Kontak", href: "/#contact" },
  ];

  const services = [
    "Social Media Management",
    "Graphic Design",
    "Web Development",
    "UI/UX Design",
    "Photo & Video",
    "IT Solutions",
  ];

  return (
    <footer className="border-t border-white/8 bg-[#060606]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-black text-sm font-black">K²</span>
              <span className="text-lg font-black text-white">
                Kunang² <span className="text-yellow-400">Creative</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-600">
              Mitra strategis pertumbuhan digital Anda — dari identitas visual, social media, hingga teknologi web.
            </p>
            <div className="mt-6 flex gap-3">
              {["IG", "TT", "WA", "LI"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-bold text-gray-500 transition-all hover:border-yellow-400/40 hover:bg-yellow-400/10 hover:text-yellow-400"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-600">Navigasi</p>
            <ul className="space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 transition-colors hover:text-yellow-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-600">Layanan</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-gray-500">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Kunang-Kunang Creative. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Made with <span className="text-yellow-400">✦</span> in Semarang, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}