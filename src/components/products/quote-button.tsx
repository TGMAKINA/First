"use client";

import { motion } from "framer-motion";
import { buildProductQuoteMessage, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function QuoteButton({
  productName,
  quoteNote,
  className,
  fullWidth = true,
}: {
  productName: string;
  quoteNote?: string | null;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openWhatsApp(buildProductQuoteMessage(productName, quoteNote));
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-whatsapp-600",
        fullWidth && "w-full",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.93L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.79 14.02c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.12.11-1.81-.11-.42-.13-.95-.3-1.64-.6-2.88-1.24-4.76-4.15-4.9-4.34-.14-.19-1.17-1.56-1.17-2.98s.73-2.11 1-2.4c.24-.27.53-.34.71-.34h.5c.16 0 .38-.03.58.44.24.57.79 1.98.86 2.13.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.6-.05.16-.16.68-.79.87-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.14.44.2.51.32.07.13.07.72-.17 1.4Z" />
      </svg>
      Fiyat Teklifi Al
    </motion.button>
  );
}
