import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  active: boolean;
}

interface Service {
  id: number;
  number: string;
  category: string;
  description: string;
  items: ServiceItem[];
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-32">

      {/* Header */}
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
            — Layanan
          </p>
          <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
            Apa Yang<br />Kami Buat
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-7 text-gray-500">
          Solusi digital komprehensif — dari strategi hingga eksekusi, semua
          dikerjakan dengan standar premium.
        </p>
      </div>

      {/* Service list */}
      <ul>
        {services.map((s) => {
          const activeItems = s.items.filter((i) => i.active);
          return (
            <li key={s.id} className="border-t border-black/5 last:border-b">
              <Link
                href={`/services/${s.id}`}
                className="group block py-10 transition-colors hover:bg-yellow-50/30 px-2"
              >
                <div className="grid gap-6 md:grid-cols-[80px_1fr_40px] md:gap-10 md:items-start">

                  {/* Number + category */}
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5 md:pt-1">
                    <span className="text-sm font-black tabular-nums text-yellow-400">
                      {s.number}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/25">
                      {s.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {s.category}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-sm leading-7 text-gray-500">
                      {s.description}
                    </p>

                    {/* Item titles as bubbles */}
                    {activeItems.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeItems.map((item) => (
                          <span
                            key={item.id}
                            className="rounded-full border border-black/8 bg-white/80 px-3 py-1 text-xs text-gray-500"
                          >
                            {item.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-gray-300 transition-all group-hover:border-yellow-400/60 group-hover:text-yellow-500 mt-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>

                </div>
              </Link>
            </li>
          );
        })}
      </ul>

    </section>
  );
}
