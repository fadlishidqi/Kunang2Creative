import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const portfolios = await prisma.portfolio.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  // Karena Anda tidak ingin mengubah globals.css, kita buat variabel kelas Tailwind 
  // di sini untuk digunakan berulang kali agar efek glassmorphism konsisten.
  const glassPanel = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]";
  const glassPanelYellow = "bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 shadow-[0_8px_32px_rgba(234,179,8,0.15)]";

  return (
    {/* Menggunakan bg-[#0a0a0a] dan text-white untuk memaksa tema gelap di halaman ini saja */}
    <div className="flex flex-col w-full relative overflow-hidden bg-[#0a0a0a] text-white min-h-screen selection:bg-yellow-500 selection:text-black">
      
      {/* Efek Cahaya Kunang-kunang di Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-500/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative z-10">
        <div className={`text-center max-w-4xl p-8 md:p-14 rounded-3xl mt-12 ${glassPanel}`}>
          <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 mb-6 font-bold px-4 py-1 text-sm border-none">
            Digital Creative Agency
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Bersinar Bersama <br/>
            <span className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              Kunang-Kunang Creative
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Mitra strategis bagi bisnis yang ingin berkembang di era digital dengan solusi yang inovatif, kreatif, dan berbasis teknologi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold rounded-full px-8 shadow-[0_0_20px_rgba(234,179,8,0.3)] border-none">
              <Link href="#contact">Mulai Proyek Anda</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={`text-white hover:text-black hover:bg-white rounded-full px-8 ${glassPanel}`}>
              <Link href="#services">Jelajahi Layanan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. TENTANG KAMI */}
      <section id="about" className="py-24 px-4 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Tentang Kami</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full" />
        </div>
        <div className={`rounded-3xl p-8 md:p-12 text-center md:text-left grid md:grid-cols-2 gap-12 items-center ${glassPanel}`}>
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Cahaya di Era Digital</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Kunang Kunang Creative adalah perusahaan yang bergerak di bidang Social Media Management, Pengembangan Website, dan Teknologi Informasi. Kami hadir sebagai mitra strategis bagi bisnis yang ingin berkembang di era digital dengan solusi yang inovatif, kreatif, dan berbasis teknologi.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Dengan semangat seperti kunang-kunang yang membawa cahaya di kegelapan, kami berkomitmen untuk membantu brand Anda bersinar di tengah persaingan yang semakin kompetitif. Kami menggabungkan keahlian teknis dengan pendekatan kreatif untuk menciptakan solusi yang berdampak nyata.
            </p>
          </div>
          <div className="space-y-4">
            <div className={`p-6 rounded-2xl ${glassPanelYellow}`}>
              <h4 className="font-bold text-white text-lg mb-2">Social Media Management</h4>
              <p className="text-gray-400 text-sm">Strategi pemasaran digital yang tepat sasaran untuk meningkatkan engagement dan brand awareness.</p>
            </div>
            <div className={`p-6 rounded-2xl ${glassPanel}`}>
              <h4 className="font-bold text-white text-lg mb-2">Web Development</h4>
              <p className="text-gray-400 text-sm">Pembuatan website modern, responsif, dan user-friendly yang mendukung performa bisnis Anda secara optimal.</p>
            </div>
            <div className={`p-6 rounded-2xl ${glassPanel}`}>
              <h4 className="font-bold text-white text-lg mb-2">IT Solutions</h4>
              <p className="text-gray-400 text-sm">Pengembangan sistem dan solusi teknologi yang disesuaikan dengan kebutuhan bisnis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI, MISI, TUJUAN */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Visi */}
            <Card className={`text-center flex flex-col ${glassPanel} border-white/10`}>
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/50">
                  <span className="text-3xl">👁️</span>
                </div>
                <CardTitle className="text-2xl text-yellow-500">Visi</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-300">
                  Menjadi perusahaan kreatif terdepan yang membantu brand berkembang secara digital melalui strategi media sosial yang inovatif dan pengembangan website yang modern, efektif, dan berorientasi pada hasil.
                </p>
              </CardContent>
            </Card>

            {/* Misi */}
            <Card className={`text-left flex flex-col ${glassPanel} border-white/10`}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <CardTitle className="text-2xl text-white">Misi</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-gray-300 list-decimal pl-4">
                  <li>Memberikan layanan pengelolaan media sosial yang kreatif, konsisten, dan berbasis data.</li>
                  <li>Mengembangkan website yang responsif, user-friendly, dan sesuai kebutuhan.</li>
                  <li>Menghadirkan solusi digital yang terintegrasi.</li>
                  <li>Mengutamakan kualitas, kreativitas, dan kepuasan klien.</li>
                  <li>Terus mengikuti perkembangan tren digital dan teknologi.</li>
                  <li>Membangun hubungan jangka panjang yang transparan dan profesional.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tujuan */}
            <Card className={`text-left flex flex-col ${glassPanel} border-white/10`}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <CardTitle className="text-2xl text-white">Tujuan</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-gray-300 list-decimal pl-4">
                  <li>Membantu bisnis klien meningkatkan visibilitas dan daya saing.</li>
                  <li>Menjadi mitra terpercaya dalam pengelolaan media sosial & website.</li>
                  <li>Menghasilkan karya digital yang berdampak nyata.</li>
                  <li>Mencapai pertumbuhan perusahaan yang berkelanjutan.</li>
                  <li>Membangun portofolio proyek yang berkualitas luas.</li>
                  <li>Menciptakan tim kreatif yang kompeten dan berintegritas.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. SERVICES / LAYANAN */}
      <section id="services" className="py-24 px-4 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Services</h2>
          <p className="text-gray-400">Solusi digital komprehensif untuk bisnis Anda</p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Social Media & Graphic Design */}
          <Card className={`border-t-4 border-t-yellow-500 hover:bg-white/10 transition-colors ${glassPanel}`}>
            <CardHeader>
              <CardTitle className="text-xl text-yellow-500 mb-2">Social Media & Graphic Design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Instagram Post", "Instagram Story", "Company Profile", "Kartu Nama", "Poster", "Brosur", "Katalog", "Sertifikat", "Banner"].map((item) => (
                  <Badge key={item} variant="outline" className="bg-white/5 text-gray-300 border-white/20">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photo & Video Production */}
          <Card className={`border-t-4 border-t-white hover:bg-white/10 transition-colors ${glassPanel}`}>
            <CardHeader>
              <CardTitle className="text-xl text-white mb-2">Photo & Video Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Foto Produk", "Advertising Video", "Company Profile", "Tiktok Post", "Instagram Reels"].map((item) => (
                  <Badge key={item} variant="outline" className="bg-white/5 text-gray-300 border-white/20">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Web Develop */}
          <Card className={`border-t-4 border-t-yellow-500 hover:bg-white/10 transition-colors ${glassPanel}`}>
            <CardHeader>
              <CardTitle className="text-xl text-yellow-500 mb-2">Web Development & IT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong className="text-white text-sm block mb-1">Website Development:</strong>
                <p className="text-gray-400 text-xs leading-relaxed">Landing Page, Company Profile, UMKM / Bisnis, Personal Branding, Portfolio, Custom Website.</p>
              </div>
              <div>
                <strong className="text-white text-sm block mb-1">UI/UX Design:</strong>
                <p className="text-gray-400 text-xs leading-relaxed">UI Design (Figma/XD), UX Research, Wireframe & Prototype, Redesign Web, Mobile Responsive.</p>
              </div>
              <div>
                <strong className="text-white text-sm block mb-1">E-Commerce & Lainnya:</strong>
                <p className="text-gray-400 text-xs leading-relaxed">Web Toko Online, Integrasi Payment, SEO Optimization, Website Maintenance & Security.</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* 5. PORTOFOLIO */}
      <section id="portfolio" className="py-24 px-4 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Portofolio Pilihan</h2>
          <p className="text-gray-400">Beberapa karya digital terbaik dari Kunang-Kunang Creative</p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.length > 0 ? (
            portfolios.map((item: typeof portfolios[number]) => (
              <Card key={item.id} className={`overflow-hidden group ${glassPanel} border-white/10`}>
                <div className="h-56 bg-[#1a1a1a] w-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <span className="text-zinc-500 text-sm z-0">Image: {item.imageUrl}</span>
                </div>
                <CardContent className="p-6 relative z-20">
                  <Badge variant="outline" className="mb-3 border-yellow-500/50 text-yellow-500 bg-transparent">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-xl text-white group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            ))
          ) : (
             <div className={`col-span-3 p-12 text-center rounded-2xl ${glassPanel}`}>
               <p className="text-gray-400 text-lg">Belum ada portofolio di database.</p>
             </div>
          )}
        </div>
      </section>

      {/* 6. KONTAK */}
      <section id="contact" className="py-24 px-4 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-black/40 p-12 text-center rounded-[3rem] ${glassPanelYellow}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Siap Bekerja Sama?</h2>
            <p className="mb-10 text-gray-300 text-lg max-w-xl mx-auto">
              Percayakan pertumbuhan digital bisnis Anda pada kami. Hubungi Kunang-Kunang Creative sekarang.
            </p>
            <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold rounded-full px-12 py-6 text-lg shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] transition-all border-none">
              <a href="mailto:halo@kunang2creative.com">Hubungi Kami Sekarang</a>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}