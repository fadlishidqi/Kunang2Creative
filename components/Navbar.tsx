"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/#about", label: "Tentang" },
  { href: "/#services", label: "Layanan" },
  { href: "/#portfolio", label: "Portofolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route-like scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── NAVBAR BAR ─────────────────────────── */}
      <motion.nav
        className="fixed z-50"
        animate={scrolled ? "pill" : "flat"}
        variants={{
          flat: {
            top: 0,
            width: "100vw",
            maxWidth: "100vw",
            borderRadius: 0,
            backgroundColor: "rgba(250,250,250,0.75)",
            boxShadow: "none",
            border: "0px solid rgba(0,0,0,0)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          },
          pill: {
            top: 14,
            width: "min(calc(100vw - 2rem), 64rem)",
            maxWidth: "64rem",
            borderRadius: 18,
            backgroundColor: "rgba(255,255,255,0.88)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.07)",
          },
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        // Tailwind can't drive backdropFilter via variants, so keep it here
        style={{
          left: "50%",
          x: "-50%",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-400 text-black text-sm font-black shadow-sm shadow-yellow-200 group-hover:bg-yellow-300 transition-colors">
              K²
            </span>
            <span className="font-black tracking-tight text-gray-900 text-[0.95rem]">
              Kunang²{" "}
              <span className="text-yellow-500">Creative</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative rounded-xl px-4 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900 hover:bg-black/5 group"
              >
                {l.label}
                <span className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-yellow-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black shadow-sm shadow-yellow-200 transition-all hover:bg-yellow-300 active:scale-95 md:inline-flex"
            >
              Kontak
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl border border-black/8 bg-black/5 md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="h-[1.5px] w-4 bg-gray-800 rounded-full block origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="h-[1.5px] w-4 bg-gray-800 rounded-full block"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="h-[1.5px] w-4 bg-gray-800 rounded-full block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE BACKDROP ────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/15 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE MENU ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-3 top-3 z-50 overflow-hidden rounded-2xl border border-black/8 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur-2xl md:hidden"
          >
            {/* top row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 text-black text-xs font-black">
                  K²
                </span>
                <span className="font-black text-gray-900 text-sm">
                  Kunang² <span className="text-yellow-500">Creative</span>
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/8 bg-black/5 text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* links */}
            <div className="flex flex-col gap-1 p-3">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3.5 text-base font-semibold text-gray-800 transition-colors hover:bg-yellow-50 hover:text-yellow-700"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.25 }}
                className="mt-2"
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-yellow-400 px-4 py-3.5 text-base font-black text-black shadow-sm shadow-yellow-200 hover:bg-yellow-300 transition-colors"
                >
                  Mulai Proyek →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}