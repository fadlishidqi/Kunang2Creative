// app/page.tsx
import prisma from "@/lib/prisma";

// Mengimpor semua sections yang sudah dipisahkan
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VisiMisiSection } from "@/components/sections/VisiMisiSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function Home() {
  // Fetch data tetap di sisi server component utama
  const portfolios = await prisma.portfolio.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative w-full overflow-x-hidden bg-[#fafafa] text-gray-900 selection:bg-yellow-400 selection:text-black">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <VisiMisiSection />
      <ServicesSection />
      
      {/* Melempar data portfolios sebagai props */}
      <PortfolioSection portfolios={portfolios} />
      
      <ContactSection />
    </div>
  );
}