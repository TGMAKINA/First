import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Hakkımızda | TG Makina",
  description:
    "TG Makina; ebatlama, bantlama ve CNC makinaları için yedek parça tedarikinde deneyimli çözüm ortağınız.",
};

const VALUES = [
  {
    title: "Hızlı Teklif",
    description:
      "WhatsApp üzerinden dakikalar içinde fiyat teklifi alın, uzun form ve e-posta beklemeyin.",
  },
  {
    title: "Geniş Stok",
    description:
      "Ebatlama, bantlama ve CNC makinaları için sık kullanılan yedek parçalar stoklarımızda hazır bulunur.",
  },
  {
    title: "Uzman Destek",
    description:
      "Doğru parçayı seçmenizde makina modeli ve ihtiyacınıza göre teknik destek sağlıyoruz.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            Hakkımızda
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Mobilya ve ahşap işleme makinaları için güvenilir yedek parça ortağınız
          </h1>
          <p className="mt-4 text-base leading-7 text-steel-400">
            TG Makina olarak yıllardır ebatlama, bantlama ve CNC makinaları
            kullanan üreticilere kaliteli yedek parça tedarik ediyoruz.
            Amacımız, üretiminizin duraksamadan devam etmesi için doğru
            parçaya en hızlı şekilde ulaşmanızı sağlamak.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-hairline bg-brand-900 p-6 shadow-premium"
            >
              <h2 className="text-lg font-semibold text-white">{value.title}</h2>
              <p className="mt-2 text-sm leading-6 text-steel-400">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-hairline bg-brand-900 p-8">
          <h2 className="text-lg font-semibold text-white">Ürün Kategorilerimiz</h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            {CATEGORIES.map((category) => (
              <li
                key={category.slug}
                className="rounded-full border border-hairline bg-brand-800 px-4 py-2 text-steel-300"
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
