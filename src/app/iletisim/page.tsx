import type { Metadata } from "next";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BUSINESS_ADDRESS, GOOGLE_MAPS_URL } from "@/lib/address";

export const metadata: Metadata = {
  title: "İletişim",
  description: "TG Makina ile iletişime geçin, yedek parça talepleriniz için WhatsApp üzerinden hızlıca fiyat teklifi alın.",
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905XXXXXXXXX";

function formatPhoneDisplay(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length !== 12) return `+${digits}`;
  return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
}

const CONTACT_ITEMS = [
  {
    label: "WhatsApp",
    value: formatPhoneDisplay(WHATSAPP_NUMBER),
    href: buildWhatsAppUrl("Merhaba, yedek parça hakkında bilgi almak istiyorum.", WHATSAPP_NUMBER),
    external: true,
  },
  {
    label: "Telefon",
    value: formatPhoneDisplay(WHATSAPP_NUMBER),
    href: `tel:+${WHATSAPP_NUMBER}`,
    external: false,
  },
  {
    label: "E-posta",
    value: "info@tgmakina.com",
    href: "mailto:info@tgmakina.com",
    external: false,
  },
  {
    label: "Adres",
    value: BUSINESS_ADDRESS.line,
    href: GOOGLE_MAPS_URL,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            İletişim
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Bize ulaşın
          </h1>
          <p className="mt-4 text-base leading-7 text-steel-400">
            Yedek parça ihtiyaçlarınız için en hızlı yanıt WhatsApp üzerinden
            gelir. Aşağıdaki bilgilerden bize dilediğiniz kanaldan
            ulaşabilirsiniz.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CONTACT_ITEMS.map((item) => {
            const content = (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-steel-500">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-medium text-white">{item.value}</p>
              </>
            );

            if (!item.href) {
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-hairline bg-brand-900 p-6"
                >
                  {content}
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="rounded-xl border border-hairline bg-brand-900 p-6 transition-colors hover:border-accent-500/60"
              >
                {content}
              </a>
            );
          })}
        </div>

        <a
          href={buildWhatsAppUrl(
            "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
            WHATSAPP_NUMBER
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-whatsapp-500 px-6 py-3 text-sm font-semibold text-white shadow-premium transition-colors hover:bg-whatsapp-600"
        >
          WhatsApp Üzerinden Yaz
        </a>

        <div className="mt-10 overflow-hidden rounded-xl border border-hairline">
          <iframe
            title="TG Makina Konum"
            src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS_ADDRESS.line)}&output=embed`}
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
