import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  // Mengambil 6 portofolio terbaru dari database (3 poster, 3 web idealnya jika data di DB sudah diatur)
  const portfolios = await prisma.portfolio.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HOME / HERO SECTION */}
      <section id="home" className="h-screen flex items-center justify-center bg-emerald-50 px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Terangkan Ide Anda Bersama <span className="text-emerald-600">Kunang-Kunang Creative</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Kami membantu mewujudkan visi bisnis Anda melalui desain visual yang memukau dan website yang profesional.
          </p>
          <Link href="#contact" className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition">
            Mulai Proyek Anda
          </Link>
        </div>
      </section>

      {/* 2. TENTANG KAMI */}
      <section id="about" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Tentang Kami</h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-600">
          <p className="max-w-3xl mx-auto leading-relaxed">
            Kunang-Kunang Creative adalah agensi kreatif digital yang berfokus pada dua pilar utama: Desain Grafis (Poster/Visual) dan Pengembangan Website. Kami percaya bahwa setiap bisnis, dari UMKM hingga perusahaan besar, berhak memiliki identitas digital yang bersinar terang layaknya kunang-kunang di malam hari.
          </p>
        </div>
      </section>

      {/* 3. LAYANAN */}
      <section id="services" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Layanan Desain */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <h3 className="text-2xl font-semibold mb-4">Desain Poster & Visual</h3>
              <p className="text-gray-600 mb-6">Menciptakan desain poster yang menarik perhatian dan menyampaikan pesan promosi Anda dengan efektif.</p>
              <Link href="/services/design" className="text-emerald-600 font-medium hover:underline">
                Lihat Detail Layanan &rarr;
              </Link>
            </div>
            {/* Layanan Website */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <h3 className="text-2xl font-semibold mb-4">Pembuatan Website</h3>
              <p className="text-gray-600 mb-6">Website company profile, landing page, dan sistem informasi yang responsif dan modern.</p>
              <Link href="/services/website" className="text-emerald-600 font-medium hover:underline">
                Lihat Detail Layanan &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PORTOFOLIO */}
      <section id="portfolio" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Portofolio Pilihan</h2>
        <p className="text-center text-gray-500 mb-12">3 Karya Desain & 3 Karya Website Terbaik Kami</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {portfolios.length > 0 ? (
            portfolios.map((item: typeof portfolios[number]) => (
              <div key={item.id} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="h-48 bg-gray-300 w-full flex items-center justify-center">
                  {/* Gunakan tag img atau next/image jika sudah punya URL gambarnya */}
                  <span className="text-gray-500 text-sm">Image: {item.imageUrl}</span>
                </div>
                <div className="p-4 bg-white">
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                </div>
              </div>
            ))
          ) : (
             <p className="text-center col-span-3 text-gray-500">Belum ada portofolio di database.</p>
          )}
        </div>
      </section>

      {/* 5. KONTAK */}
      <section id="contact" className="py-20 bg-emerald-600 text-white px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Siap Bekerja Sama?</h2>
        <p className="mb-8">Hubungi kami sekarang untuk mendiskusikan kebutuhan visual dan digital Anda.</p>
        <a href="mailto:halo@kunang2creative.com" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
          Hubungi Kami
        </a>
      </section>

    </div>
  );
}