"use client";

import { motion } from "framer-motion";
import { ProductCard, type ProductCardData } from "./product-card";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-hairline bg-brand-900 px-6 py-16 text-center">
        <p className="text-sm text-steel-400">
          Bu kategoride henüz ürün eklenmedi. Aradığınız parça için WhatsApp
          üzerinden bize ulaşabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
