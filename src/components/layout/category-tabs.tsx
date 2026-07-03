"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/cn";

export function CategoryTabs({
  layoutId,
  className,
  linkClassName,
  onNavigate,
}: {
  layoutId: string;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {CATEGORIES.map((category) => {
        const href = `/urunler/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            onClick={onNavigate}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              isActive ? "text-white" : "text-steel-400 hover:text-white",
              linkClassName
            )}
          >
            {category.label}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent-500"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
