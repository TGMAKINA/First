"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { QuoteButton } from "./quote-button";
import { TiltCard } from "@/components/ui/tilt-card";
import { ImageLightbox } from "./image-lightbox";

export type ProductCardData = {
  id: string;
  name: string;
  description: string | null;
  quoteNote: string | null;
  primaryImage: { blobUrl: string } | null;
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <TiltCard
      maxTilt={6}
      variants={cardVariants}
      className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-brand-900 shadow-premium transition-colors hover:border-accent-500/50"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-brand-800">
        {product.primaryImage ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label={`${product.name} görselini büyüt`}
              className="relative block h-full w-full cursor-zoom-in"
            >
              <motion.div
                className="h-full w-full"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={product.primaryImage.blobUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-950">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 0v0M21 21l-4.35-4.35M7.5 10h5M10 7.5v5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </button>
            <ImageLightbox
              src={product.primaryImage.blobUrl}
              alt={product.name}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-steel-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16">
              <path
                d="M4 7h16M4 12h16M4 17h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent-500 transition-transform duration-300 group-hover:scale-x-100" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-white">{product.name}</h3>
        {product.description && (
          <p className="line-clamp-2 flex-1 text-sm leading-5 text-steel-400">
            {product.description}
          </p>
        )}
        <div className="pt-2">
          <QuoteButton productName={product.name} quoteNote={product.quoteNote} />
        </div>
      </div>
    </TiltCard>
  );
}
