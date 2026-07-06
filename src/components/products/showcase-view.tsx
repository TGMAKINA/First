"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageLightbox } from "./image-lightbox";

export function ShowcaseView({
  title,
  imageUrl,
  description,
}: {
  title: string;
  imageUrl: string | null;
  description: string | null;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-hairline bg-brand-900 shadow-premium">
        {imageUrl ? (
          <>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`${title} görselini büyüt`}
              className="relative block h-full w-full cursor-zoom-in"
            >
              <motion.div
                className="h-full w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </motion.div>
            </button>
            <ImageLightbox
              src={imageUrl}
              alt={title}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-steel-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-20 w-20">
              <path
                d="M4 7h16M4 12h16M4 17h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      <div>
        {description ? (
          <p className="whitespace-pre-line text-base leading-7 text-steel-300">{description}</p>
        ) : (
          <p className="text-sm text-steel-500">
            Bu makina hakkında içerik yakında eklenecek. Detaylı bilgi almak için bizimle
            iletişime geçebilirsiniz.
          </p>
        )}
      </div>
    </div>
  );
}
