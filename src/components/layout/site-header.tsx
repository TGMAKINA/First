"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryTabs } from "./category-tabs";
import { cn } from "@/lib/cn";

const STATIC_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-brand-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white shadow-sm">
            <Image
              src="/images/logo-icon.png"
              alt="TG Makina"
              fill
              className="object-contain p-1"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <CategoryTabs layoutId="header-tab-underline" />
          <span className="mx-2 h-5 w-px bg-hairline" />
          {STATIC_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href ? "text-white" : "text-steel-400 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
          aria-label="Menüyü aç/kapat"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? "open" : "closed"}
            className="relative block h-4 w-5"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 7 },
              }}
              className="absolute left-0 top-0 h-0.5 w-5 bg-current"
            />
            <motion.span
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -7 },
              }}
              className="absolute bottom-0 left-0 h-0.5 w-5 bg-current"
            />
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-hairline bg-brand-950 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              <CategoryTabs
                layoutId="mobile-tab-underline"
                className="flex-col items-start gap-0"
                linkClassName="w-full"
                onNavigate={() => setMenuOpen(false)}
              />
              <span className="my-1 h-px w-full bg-hairline" />
              {STATIC_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium",
                    pathname === link.href ? "text-white" : "text-steel-400"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
