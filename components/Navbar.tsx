import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full glass-panel z-50 rounded-b-2xl md:rounded-full md:top-4 md:w-[calc(100%-2rem)] md:left-4 md:right-4 max-w-7xl mx-auto transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-2xl tracking-tight text-white drop-shadow-sm">
            Kunang² <span className="text-yellow-500">Creative</span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/#home" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">Home</Link>
            <Link href="/#about" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">Tentang Kami</Link>
            <Link href="/#services" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">Layanan</Link>
            <Link href="/#portfolio" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium">Portofolio</Link>
            <Link href="/#contact" className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}