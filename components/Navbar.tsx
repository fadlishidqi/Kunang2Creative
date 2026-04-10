"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/#about", label: "Tentang" },
    { href: "/#services", label: "Layanan" },
    { href: "/#portfolio", label: "Portofolio" },
  ];

  return (
    <>
      <nav
        className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled
            ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-xl"
            : "top-0 w-full border-b border-white/5 bg-black/20 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 text-black text-xs font-black">K²</span>
            <span className="font-black tracking-tight text-white">
              Kunang² <span className="text-yellow-400">Creative</span>
            </span>
          </Link>

          {/* desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-4 py-2 text-sm text-gray-400 transition-all hover:bg-white/8 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* cta + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black transition-all hover:bg-yellow-300 active:scale-95 md:inline-flex"
            >
              Kontak
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 md:hidden"
              aria-label="Menu"
            >
              <span className={`h-px w-4 bg-white transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-white transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-4 bg-white transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-black/95 px-6 pt-24 pb-12 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-4 text-lg font-bold text-white transition-all hover:bg-white/8"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-2xl bg-yellow-400 px-4 py-4 text-center text-lg font-black text-black"
          >
            Mulai Proyek →
          </Link>
        </div>
      </div>
    </>
  );
}