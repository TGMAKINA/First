import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { BUSINESS_ADDRESS, GOOGLE_MAPS_URL } from "@/lib/address";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905XXXXXXXXX";

function formatPhoneDisplay(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length !== 12) return `+${digits}`;
  return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-brand-950 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-sm font-extrabold">
              TG
            </span>
            <span>
              TG <span className="text-accent-500">Makina</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Ebatlama, bantlama ve CNC makinaları için güvenilir yedek parça
            tedarikçiniz. Hızlı teklif, kaliteli parça.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            Yedek Parça Kategorileri
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/urunler/${category.slug}`}
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">
            İletişim
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                WhatsApp: {formatPhoneDisplay(WHATSAPP_NUMBER)}
              </a>
            </li>
            <li>
              <Link href="/iletisim" className="transition-colors hover:text-white">
                İletişim Formu
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="transition-colors hover:text-white">
                Hakkımızda
              </Link>
            </li>
            <li>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {BUSINESS_ADDRESS.line}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline px-4 py-4 text-center text-xs text-zinc-500 sm:px-6">
        © {new Date().getFullYear()} TG Makina. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
