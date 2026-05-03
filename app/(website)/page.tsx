// app/(website)/page.tsx
import prisma from "@/lib/prisma";

// Mengimpor semua sections yang sudah dipisahkan
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VisiMisiSection } from "@/components/sections/VisiMisiSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ArtikelSection } from "@/components/sections/ArtikelSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function Home() {
  const [portfolios, services, articles] = await Promise.all([
    prisma.portfolio.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: {
        items: {
          where: { active: true },
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
          select: { id: true, title: true, active: true },
        },
      },
    }),
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        content: true,
        createdAt: true,
        author: { select: { name: true, image: true } },
      },
    }),
  ]);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#fafafa] text-gray-900 selection:bg-yellow-400 selection:text-black">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <VisiMisiSection />
      <ServicesSection services={services} />

      {/* Melempar data portfolios sebagai props */}
      <PortfolioSection portfolios={portfolios} />
      <ArtikelSection articles={articles} />
      <ContactSection />
    </div>
  );
}
