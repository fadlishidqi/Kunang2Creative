// components/sections/MarqueeSection.tsx
export function MarqueeSection() {
  return (
    <div className="overflow-hidden border-y border-black/10 bg-white/50 py-5 backdrop-blur-sm">
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
              // Mengganti font-mono dengan font Pixelify Sans
              className="mx-8 text-sm font-['Pixelify_Sans',sans-serif] text-black"
            >
              {t} 
              <span className="mx-6 text-black/40">{"//"}</span>
            </span>
          ))}
      </div>
    </div>
  );
}