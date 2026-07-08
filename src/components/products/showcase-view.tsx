"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageLightbox } from "./image-lightbox";

function GalleryThumb({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} görselini büyüt`}
        className="group relative aspect-square w-full overflow-hidden rounded-xl border border-hairline bg-brand-900 shadow-premium"
      >
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
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
      <ImageLightbox src={src} alt={alt} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function ShowcaseView({
  title,
  imageUrl,
  description,
  galleryImages = [],
}: {
  title: string;
  imageUrl: string | null;
  description: string | null;
  galleryImages?: string[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div>
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
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
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
            <p className="whitespace-pre-line text-base leading-7 text-steel-300">
              {description}
            </p>
          ) : (
            <p className="text-sm text-steel-500">
              Bu makina hakkında içerik yakında eklenecek. Detaylı bilgi almak için bizimle
              iletişime geçebilirsiniz.
            </p>
          )}
        </div>
      </div>

      {galleryImages.length > 0 && (
        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            Makina Görselleri
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galleryImages.map((src, i) => (
              <GalleryThumb key={src} src={src} alt={`${title} — görsel ${i + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
