import Link from "next/link";

export default function WebsiteServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <Link href="/#services" className="text-emerald-600 mb-8 inline-block">&larr; Kembali</Link>
      <h1 className="text-4xl font-bold mb-6">Jasa Pembuatan Website</h1>
      <p className="text-gray-600 text-lg mb-8">
        Hadirkan bisnis Anda di ranah digital dengan website yang cepat, responsif, dan mudah dikelola. 
        Kami menggunakan teknologi modern (seperti Next.js) untuk memastikan performa maksimal.
      </p>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="font-bold text-xl mb-4">Spesialisasi Kami:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Company Profile (Seperti website ini)</li>
          <li>Landing Page Promosi / Penjualan</li>
          <li>Website Katalog Produk</li>
        </ul>
      </div>
    </div>
  );
}