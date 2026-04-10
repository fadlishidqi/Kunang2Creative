import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const portfolios = await prisma.portfolio.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col w-full relative overflow-hidden selection:bg-yellow-500 selection:text-black">
      
      {/* Background Orbs untuk Efek Glassmorphism */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-white/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* 1. HOME / HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="text-center max-w-4xl glass-panel p-12 rounded-3xl mt-12">
          <Badge className="bg-white/10 text-yellow-500 hover:bg-white/20 mb-6 border border-white/20 backdrop-blur-md">
            Agensi Kreatif Digital
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Terangkan Ide Anda Bersama <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              Kunang-Kunang
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Kami membantu mewujudkan visi bisnis Anda melalui desain visual yang memukau dan website yang profesional.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold rounded-full px-8 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              <Link href="#contact">Mulai Proyek</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-panel text-white border-white/20 hover:bg-white/10 rounded-full px-8">
              <Link href="#portfolio">Lihat Karya Kami</Link>
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
        <Card className="glass-panel border-none bg-white/5 backdrop-blur-2xl">
          <CardContent className="p-10 text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Kunang-Kunang Creative adalah agensi kreatif digital yang berfokus pada dua pilar utama: <span className="text-white font-semibold">Desain Grafis (Poster/Visual)</span> dan <span className="text-white font-semibold">Pengembangan Website</span>. Kami percaya bahwa setiap bisnis, dari UMKM hingga perusahaan besar, berhak memiliki identitas digital yang bersinar terang layaknya kunang-kunang di malam hari.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 3. LAYANAN */}
      <section id="services" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Layanan Kami</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Layanan Desain */}
            <Card className="glass-panel border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:bg-white/10 transition duration-500">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <CardTitle className="text-2xl text-white">Desain Poster & Visual</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400 text-base mb-6">
                  Menciptakan desain poster yang menarik perhatian dan menyampaikan pesan promosi Anda dengan efektif.
                </CardDescription>
                <Link href="/services/design" className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-400 group">
                  Lihat Detail Layanan 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </CardContent>
            </Card>

            {/* Layanan Website */}
            <Card className="glass-panel border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:bg-white/10 transition duration-500">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <CardTitle className="text-2xl text-white">Pembuatan Website</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400 text-base mb-6">
                  Website company profile, landing page, dan sistem informasi yang responsif dan modern.
                </CardDescription>
                <Link href="/services/website" className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-400 group">
                  Lihat Detail Layanan 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. PORTOFOLIO */}
      <section id="portfolio" className="py-24 px-4 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Portofolio Pilihan</h2>
          <p className="text-gray-400">3 Karya Desain & 3 Karya Website Terbaik Kami</p>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.length > 0 ? (
            portfolios.map((item: typeof portfolios[number]) => (
              <Card key={item.id} className="glass-panel border-white/10 overflow-hidden group">
                <div className="h-56 bg-zinc-900 w-full flex items-center justify-center relative overflow-hidden">
                  {/* Efek hover zoom pada gambar nantinya */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <span className="text-zinc-600 text-sm z-0">Image: {item.imageUrl}</span>
                </div>
                <CardContent className="p-6 relative z-20">
                  <Badge variant="outline" className="mb-3 border-yellow-500/50 text-yellow-500">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-xl text-white group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            ))
          ) : (
             <div className="col-span-3 glass-panel p-12 text-center rounded-2xl">
               <p className="text-gray-400 text-lg">Belum ada portofolio di database.</p>
             </div>
          )}
        </div>
      </section>

      {/* 5. KONTAK */}
      <section id="contact" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-panel border-yellow-500/30 bg-gradient-to-br from-zinc-900/80 to-black/90 p-12 text-center rounded-[3rem]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Siap Bekerja Sama?</h2>
            <p className="mb-10 text-gray-400 text-lg max-w-xl mx-auto">
              Hubungi kami sekarang untuk mendiskusikan kebutuhan visual dan digital Anda.
            </p>
            <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold rounded-full px-12 py-6 text-lg shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] transition-all">
              <a href="mailto:halo@kunang2creative.com">Hubungi Kami Sekarang</a>
            </Button>
          </Card>
        </div>
      </section>

    </div>
  );
}