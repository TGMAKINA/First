"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";
import { TiltCard } from "@/components/ui/tilt-card";

const ICONS: Record<string, React.ReactNode> = {
  ebatlama: (
    <path
      d="M4 6h16M4 12h10M4 18h16M17 9v6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  bantlama: (
    <path
      d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z M4 12h16"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  cnc: (
    <path
      d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  yaglar: (
    <path
      d="M12 3c3 3.6 5 6.6 5 9.2A5 5 0 0 1 7 12.2C7 9.6 9 6.6 12 3Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function CategoryEntryCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORIES.map((category) => (
        <TiltCard key={category.slug} maxTilt={8} whileTap={{ scale: 0.98 }} className="h-full">
          <Link
            href={`/urunler/${category.slug}`}
            className="group flex h-full flex-col justify-between rounded-2xl border border-hairline bg-brand-900 p-6 shadow-premium transition-colors hover:border-accent-500/60"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-brand-950"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                {ICONS[category.slug]}
              </svg>
            </motion.div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white">{category.label}</h3>
              <p className="mt-2 text-sm text-steel-400">
                Bu kategorideki ürünleri görüntüleyin ve WhatsApp üzerinden
                fiyat teklifi alın.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-400">
              Ürünleri Gör
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </TiltCard>
      ))}
    </div>
  );
}
