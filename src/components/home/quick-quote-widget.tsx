"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { buildQuickQuoteMessage, openWhatsApp } from "@/lib/whatsapp";

export type QuickQuoteProduct = { id: string; name: string };

export function QuickQuoteWidget({
  productsByCategory,
}: {
  productsByCategory: Record<CategorySlug, QuickQuoteProduct[]>;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [category, setCategory] = useState<CategorySlug | null>(null);
  const [productId, setProductId] = useState<string>("");

  const parts = category ? productsByCategory[category] ?? [] : [];
  const categoryLabel = CATEGORIES.find((c) => c.slug === category)?.label ?? "";
  const selectedProduct = parts.find((p) => p.id === productId);

  function handleSelectCategory(slug: CategorySlug) {
    setCategory(slug);
    setProductId("");
    setStep(2);
  }

  function handleSubmit() {
    if (!selectedProduct || !category) return;
    openWhatsApp(buildQuickQuoteMessage(categoryLabel, selectedProduct.name));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-brand-800 shadow-premium">
      <div className="border-b border-hairline bg-brand-900 px-6 py-4">
        <h2 className="text-base font-semibold text-white">Hızlı Teklif Al</h2>
        <p className="mt-1 text-sm text-steel-400">
          Makinanızı ve parçayı seçin, saniyeler içinde WhatsApp&apos;tan
          teklif isteyin.
        </p>
      </div>

      <div className="relative min-h-[180px] overflow-hidden px-6 py-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="text-sm font-medium text-steel-300">1. Makina seçin</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => handleSelectCategory(c.slug)}
                    className="rounded-lg border border-hairline px-4 py-3 text-left text-sm font-medium text-steel-300 transition-colors hover:border-accent-500 hover:text-white"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mb-3 text-xs font-medium text-steel-500 hover:text-steel-300"
              >
                ← Makinayı değiştir
              </button>
              <p className="text-sm font-medium text-steel-300">
                2. {categoryLabel} için parça seçin
              </p>

              {parts.length === 0 ? (
                <p className="mt-3 text-sm text-steel-400">
                  Bu kategoride henüz ürün eklenmedi.
                </p>
              ) : (
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="flex-1 rounded-lg border border-hairline bg-brand-900 px-4 py-3 text-sm text-steel-300 focus:border-accent-500 focus:outline-none"
                  >
                    <option value="">Parça seçin...</option>
                    {parts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={!productId}
                    onClick={handleSubmit}
                    className="rounded-lg bg-whatsapp-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    WhatsApp&apos;tan Teklif Al
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
