"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Panel", exact: true },
  { href: "/admin/tg1300x", label: "TG1300X Vitrin", exact: false },
  { href: "/admin/urunler", label: "Ürünler", exact: false },
  { href: "/admin/yorumlar", label: "Yorumlar", exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-5">
        <span className="relative h-8 w-8 shrink-0">
          <Image src="/images/logo-icon.png" alt="TG Makina" fill className="object-contain" />
        </span>
        <span className="text-sm font-bold text-brand-900">Admin Paneli</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-950 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-brand-900"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-3">
        <form action="/admin/logout" method="POST">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-600"
          >
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  );
}
