import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BUSINESS_ADDRESS } from "@/lib/address";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.tgmakina.com";
const SITE_NAME = "TG Makina";
const DEFAULT_TITLE = "TG Makina | Makina Yedek Parça";
const DEFAULT_DESCRIPTION =
  "Ebatlama, bantlama ve CNC makinaları için orijinal ve muadil yedek parça tedariki. Hızlı fiyat teklifi için WhatsApp üzerinden iletişime geçin.";
const DEFAULT_OG_IMAGE = "/images/hero/cnc.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | TG Makina",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "ebatlama makinası yedek parça",
    "bantlama makinası yedek parça",
    "cnc makinası yedek parça",
    "makina yağları",
    "makina yedek parça",
    "TG Makina",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_ADDRESS.street,
    addressLocality: BUSINESS_ADDRESS.district,
    addressRegion: BUSINESS_ADDRESS.region,
    addressCountry: BUSINESS_ADDRESS.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905XXXXXXXXX"}`,
    areaServed: "TR",
    availableLanguage: ["Turkish"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
