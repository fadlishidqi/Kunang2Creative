import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-2xl text-emerald-600">
            Kunang² Creative
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/#home" className="text-gray-600 hover:text-emerald-600">Home</Link>
            <Link href="/#about" className="text-gray-600 hover:text-emerald-600">Tentang Kami</Link>
            <Link href="/#services" className="text-gray-600 hover:text-emerald-600">Layanan</Link>
            <Link href="/#portfolio" className="text-gray-600 hover:text-emerald-600">Portofolio</Link>
            <Link href="/#blog" className="text-gray-600 hover:text-emerald-600">Blog</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-emerald-600">Kontak</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}