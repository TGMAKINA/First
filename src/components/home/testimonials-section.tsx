"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";

export type TestimonialData = {
  id: string;
  authorName: string;
  companyName: string | null;
  quote: string;
  rating: number;
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className={i < rating ? "h-4 w-4 text-accent-500" : "h-4 w-4 text-steel-600"}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialData[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-brand-950 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            Referanslarımız
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Müşterilerimiz Ne Diyor?
          </h2>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <TiltCard
              key={t.id}
              maxTilt={6}
              variants={cardVariants}
              className="flex h-full flex-col rounded-2xl border border-hairline bg-brand-900 p-6 shadow-premium"
            >
              <svg
                viewBox="0 0 32 24"
                fill="currentColor"
                className="h-8 w-8 text-accent-500/40"
              >
                <path d="M9.4 0C4.2 2.6 0 8 0 13.8 0 19 3.4 24 9.6 24c4 0 7-3 7-6.8 0-3.6-2.6-6.2-6-6.2-.8 0-1.6.2-2 .4C9.2 7.4 12.4 3.2 17 .8L9.4 0Zm18 0C22.2 2.6 18 8 18 13.8c0 5.2 3.4 10.2 9.6 10.2 4 0 7-3 7-6.8 0-3.6-2.6-6.2-6-6.2-.8 0-1.6.2-2 .4C27.2 7.4 30.4 3.2 35 .8L27.4 0Z" />
              </svg>

              <p className="mt-4 flex-1 text-sm leading-6 text-steel-300">{t.quote}</p>

              <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                <div>
                  <p className="text-sm font-semibold text-white">{t.authorName}</p>
                  {t.companyName && <p className="text-xs text-steel-500">{t.companyName}</p>}
                </div>
                <StarRating rating={t.rating} />
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
