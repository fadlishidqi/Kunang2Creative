"use client";

import { useEffect, useRef } from "react";

const items = [
  "Social Media",
  "Web Development",
  "UI/UX Design",
  "Video Production",
  "Brand Identity",
  "IT Solutions",
];

export function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let raf: number;
    const speed = 0.6; // px per frame — naikkan untuk lebih cepat

    function tick() {
      pos -= speed;
      // Ambil lebar satu set (separuh dari total karena ada 2 set)
      const halfW = track!.scrollWidth / 2;
      // Reset pas ketika sudah geser satu set penuh
      if (Math.abs(pos) >= halfW) pos = 0;
      track!.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const renderItems = () =>
    items.map((item, i) => (
      <div key={i} className="flex items-center shrink-0">
        <span
          className="whitespace-nowrap px-12 text-[20px] font-semibold tracking-wide text-gray-800"
          style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
        >
          {item}
        </span>
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 shrink-0" />
      </div>
    ));

  return (
    <div className="relative overflow-hidden border-y border-black/8 bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max">
          {/* Set A */}
          {renderItems()}
          {/* Set B — identik persis */}
          {renderItems()}
        </div>
      </div>
    </div>
  );
}