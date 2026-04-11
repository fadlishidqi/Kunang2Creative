// components/sections/MarqueeSection.tsx
export function MarqueeSection() {
  return (
    <div className="overflow-hidden border-y border-black/6 bg-white/50 py-5 backdrop-blur-sm">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 20s linear infinite" }}
      >
        {Array(4)
          .fill([
            "Social Media",
            "Web Development",
            "UI/UX Design",
            "Video Production",
            "Brand Identity",
            "IT Solutions",
          ])
          .flat()
          .map((t, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-medium uppercase tracking-[0.15em] text-gray-400"
            >
              {t} <span className="mx-6 text-yellow-400/70">✦</span>
            </span>
          ))}
      </div>
    </div>
  );
}