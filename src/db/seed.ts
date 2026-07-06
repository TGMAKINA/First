import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { products, testimonials } from "./schema";
import type { ProductCategorySlug } from "@/lib/categories";

const seedProducts: {
  name: string;
  slug: string;
  category: ProductCategorySlug;
  description: string;
  quoteNote?: string;
  displayOrder: number;
}[] = [
  {
    name: "Ebatlama Testere Bıçağı",
    slug: "ebatlama-testere-bicagi",
    category: "ebatlama",
    description: "Sert metal uçlu, yüksek hızlı kesim testere bıçağı.",
    quoteNote: "Bıçak çapı ve diş sayısı belirtiniz.",
    displayOrder: 1,
  },
  {
    name: "Ebatlama Besleme Rulmanı",
    slug: "ebatlama-besleme-rulmani",
    category: "ebatlama",
    description: "Panel besleme sistemine uygun yüksek dayanımlı rulman.",
    displayOrder: 2,
  },
  {
    name: "Bantlama Yapıştırıcı Tankı",
    slug: "bantlama-yapistirici-tanki",
    category: "bantlama",
    description: "PUR/EVA yapıştırıcı için orijinal ölçülerde tank.",
    displayOrder: 1,
  },
  {
    name: "Bantlama Baskı Silindiri",
    slug: "bantlama-baski-silindiri",
    category: "bantlama",
    description: "Kenar bandı baskı ünitesi için silikon kaplı silindir.",
    displayOrder: 2,
  },
  {
    name: "CNC Spindle Motoru",
    slug: "cnc-spindle-motoru",
    category: "cnc",
    description: "Su soğutmalı, yüksek devirli CNC spindle motoru.",
    quoteNote: "Güç (kW) ve mil çapını belirtiniz.",
    displayOrder: 1,
  },
  {
    name: "CNC Vakum Pompası",
    slug: "cnc-vakum-pompasi",
    category: "cnc",
    description: "Malzeme sabitleme masası için endüstriyel vakum pompası.",
    displayOrder: 2,
  },
];

const seedTestimonials: {
  authorName: string;
  companyName: string;
  quote: string;
  rating: number;
  displayOrder: number;
}[] = [
  {
    authorName: "Mehmet Yılmaz",
    companyName: "Yılmaz Mobilya",
    quote:
      "Ebatlama makinamız için acil ihtiyaç duyduğumuz testere bıçağını aynı gün içinde temin ettiler. Üretimimiz hiç durmadı.",
    rating: 5,
    displayOrder: 1,
  },
  {
    authorName: "Ayşe Kara",
    companyName: "Kara Ahşap Sanayi",
    quote:
      "WhatsApp üzerinden teklif almak inanılmaz hızlı ve pratik. Fiyatlar da piyasaya göre oldukça uygun.",
    rating: 5,
    displayOrder: 2,
  },
  {
    authorName: "Hakan Demir",
    companyName: "Demir CNC Atölyesi",
    quote:
      "CNC spindle motorumuz için doğru parçayı bulmakta zorlanıyorduk, teknik ekip doğru ürünü önerdi. Kesinlikle tavsiye ederim.",
    rating: 5,
    displayOrder: 3,
  },
];

async function main() {
  for (const product of seedProducts) {
    await db.insert(products).values(product).onConflictDoNothing({ target: products.slug });
  }
  console.log(`Seeded ${seedProducts.length} products.`);

  const existingTestimonials = await db.query.testimonials.findMany({ limit: 1 });
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values(seedTestimonials);
    console.log(`Seeded ${seedTestimonials.length} testimonials.`);
  } else {
    console.log("Testimonials already exist, skipping.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
