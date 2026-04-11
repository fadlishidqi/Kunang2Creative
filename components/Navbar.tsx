"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

const links = [
  { href: "/", label: "Home", section: null },
  { href: "/#about", label: "Tentang", section: "about" },
  { href: "/#services", label: "Layanan", section: "services" },
  { href: "/#portfolio", label: "Portofolio", section: "portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/");
  const manualScrolling = useRef(false);

  // Scroll → pill/flat
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = links
      .filter((l) => l.section)
      .map((l) => l.section as string);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (manualScrolling.current) return;
          if (entry.isIntersecting) setActiveHref(`/#${id}`);
        },
        { threshold: 0.35, rootMargin: "-80px 0px -35% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => {
      if (manualScrolling.current) return;
      if (window.scrollY < 80) setActiveHref("/");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveHref("/");
    manualScrolling.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => { manualScrolling.current = false; }, 1000);
  };

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 380, damping: 30 }}>
      <>
        {/* ── NAVBAR BAR ─────────────────────────────────── */}
        <motion.nav
          className="fixed z-50"
          animate={scrolled ? "pill" : "flat"}
          variants={{
            flat: {
              top: 0,
              width: "100vw",
              maxWidth: "100vw",
              borderRadius: 0,
              backgroundColor: "rgba(250,250,250,0.78)",
              boxShadow: "none",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            },
            pill: {
              top: 14,
              width: "min(calc(100vw - 2rem), 64rem)",
              maxWidth: "64rem",
              borderRadius: 18,
              backgroundColor: "rgba(255,255,255,0.90)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.07)",
            },
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            left: "50%",
            x: "-50%",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
            {/* Logo */}
            <Link
              href="/"
              onClick={goHome}
              className="flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Image
                  src="/logokunang.png"
                  alt="Kunang² Creative"
                  width={150}
                  height={50}
                  className="h-11 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop links */}
            <nav
              className="hidden items-center gap-0.5 md:flex"
            >
              {links.map((l) => {
                const isActive = activeHref === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={l.href === "/" ? goHome : () => setActiveHref(l.href)}
                    className="relative rounded-xl px-4 py-2 text-sm z-10"
                  >
                    {/* Active underline that slides between links */}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-yellow-400"
                        initial={false}
                      />
                    )}

                    <span
                      className="relative z-10 transition-colors duration-200"
                      style={{ color: isActive ? "#111827" : "#6b7280" }}
                    >
                      {l.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="hidden rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-black shadow-sm shadow-yellow-200 hover:bg-yellow-300 transition-colors md:inline-flex"
                >
                  Kontak
                </button>
              </motion.div>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl border border-black/8 bg-black/5 md:hidden"
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

        {/* ── MOBILE BACKDROP ────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />
          )}
        </AnimatePresence>

        {/* ── MOBILE MENU ────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-3 z-50 overflow-hidden rounded-2xl border border-black/8 bg-white/96 shadow-2xl shadow-black/10 backdrop-blur-2xl md:hidden"
            >
              {/* Top row */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
                <Link
                  href="/"
                  onClick={(e) => { setOpen(false); goHome(e); }}
                  className="flex items-center"
                >
                  <Image
                    src="/logokunang.png"
                    alt="Kunang² Creative"
                    width={130}
                    height={44}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileTap={{ scale: 0.88 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/8 bg-black/5 text-gray-600"
                >
                  ✕
                </motion.button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-1 p-3">
                {links.map((l, i) => {
                  const isActive = activeHref === l.href;
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.04 + i * 0.055,
                        duration: 0.32,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={l.href === "/" ? (e) => { setOpen(false); goHome(e); } : () => { setOpen(false); setActiveHref(l.href); }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors duration-200 ${
                          isActive
                            ? "bg-yellow-50 text-yellow-700"
                            : "text-gray-800 hover:bg-yellow-50 hover:text-yellow-700"
                        }`}
                      >
                        <span>{l.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="mobileActiveDot"
                            className="h-2 w-2 rounded-full bg-yellow-400"
                            initial={false}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 + links.length * 0.055,
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-2"
                >
                  <button
                    onClick={() => { setOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="flex w-full items-center justify-center rounded-xl bg-yellow-400 px-4 py-3.5 text-base font-black text-black shadow-sm shadow-yellow-200 hover:bg-yellow-300 transition-colors"
                  >
                    Mulai Proyek →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </MotionConfig>
  );
}
