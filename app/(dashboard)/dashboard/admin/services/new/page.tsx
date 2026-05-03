import { createService } from "@/app/actions/service"
import { ServiceForm } from "@/components/dashboard/ServiceForm"

export default function NewServicePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold">Tambah Kategori Layanan</h2>
        <p className="text-white/40 text-sm mt-1">
          Buat kategori baru, lalu tambahkan paket-paket layanan di dalamnya.
        </p>
      </div>
      <ServiceForm action={createService} mode="create" />
    </div>
  )
}
