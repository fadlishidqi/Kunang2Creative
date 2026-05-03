import Link from "next/link";

export default function DesignServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <Link href="/#services" className="text-emerald-600 mb-8 inline-block">&larr; Kembali</Link>
      <h1 className="text-4xl font-bold mb-6">Jasa Desain Poster & Visual</h1>
      <p className="text-gray-600 text-lg mb-8">
        Kami menyediakan jasa desain profesional untuk kebutuhan promosi, event, media sosial, dan identitas brand.
        Setiap karya dibuat dengan riset target audiens agar visual tidak hanya indah, tapi juga berdampak.
      </p>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="font-bold text-xl mb-4">Paket yang tersedia:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Desain Poster Event / Promosi</li>
          <li>Desain Konten Feed & Story Instagram</li>
          <li>Desain Banner / Spanduk Digital</li>
        </ul>
      </div>
    </div>
  );
}
