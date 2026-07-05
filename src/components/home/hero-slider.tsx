"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";

const SLIDES = [
  {
    category: CATEGORIES[0],
    image: "/images/hero/ebatlama.jpg",
    heading: "Panel Ebatlama Makinaları için Orijinal Yedek Parça",
    body: "Kesim hassasiyetinizi koruyun — testere bıçağından besleme sistemine kadar tüm parçalar hazır.",
  },
  {
    category: CATEGORIES[1],
    image: "/images/hero/bantlama.jpg",
    heading: "Bantlama Makinaları için Kesintisiz Üretim",
    body: "Yapıştırıcı tankından baskı silindirine, üretim hattınız hiç durmasın.",
  },
  {
    category: CATEGORIES[2],
    image: "/images/hero/cnc.jpg",
    heading: "CNC Makinaları için Hassas Yedek Parça",
    body: "Spindle motorundan vakum pompasına, hassasiyetten ödün vermeyin.",
  },
  {
    category: CATEGORIES[3],
    image: "/images/hero/yaglar.jpg",
    heading: "Makineleriniz için Kaliteli Yağlar",
    body: "Doğru yağlama, uzun ömürlü ve sorunsuz çalışan makineler demektir.",
  },
];

const AUTOPLAY_MS = 6500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      className="relative h-[520px] w-full overflow-hidden bg-brand-950 sm:h-[600px] lg:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduceMotion ? 1 : 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: AUTOPLAY_MS / 1000 + 1, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.category.label}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/55 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) setIndex((i) => (i + 1) % SLIDES.length);
            else if (info.offset.x > 80)
              setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
          }}
          className="absolute inset-0"
        >
          <div className="relative mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6 sm:px-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              {slide.category.label}
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slide.heading}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-steel-300 sm:text-lg">
              {slide.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={`/urunler/${slide.category.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-950 shadow-premium transition-colors hover:bg-accent-400"
              >
                Ürünleri İncele
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full border border-steel-500/50 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-accent-500 hover:text-accent-400"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.category.slug}
            type="button"
            aria-label={`${s.category.label} slaytına geç`}
            onClick={() => setIndex(i)}
            className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/20"
          >
            {i === index && (
              <motion.div
                layoutId="hero-dot"
                className="absolute inset-0 rounded-full bg-accent-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
