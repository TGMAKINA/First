import { and, asc, eq } from "drizzle-orm";
import { db } from "./index";
import { products, productImages, testimonials, showcases } from "./schema";
import type { ProductCategorySlug } from "@/lib/categories";

export async function getActiveProductsByCategory(category: ProductCategorySlug) {
  const rows = await db.query.products.findMany({
    where: and(eq(products.category, category), eq(products.isActive, true)),
    orderBy: [asc(products.displayOrder), asc(products.name)],
    with: { images: true },
  });

  return rows.map(attachPrimaryImage);
}

export async function getAllActiveProducts() {
  const rows = await db.query.products.findMany({
    where: eq(products.isActive, true),
    orderBy: [asc(products.displayOrder), asc(products.name)],
    with: { images: true },
  });

  return rows.map(attachPrimaryImage);
}

export async function getAllProductsAdmin() {
  const rows = await db.query.products.findMany({
    orderBy: [asc(products.category), asc(products.displayOrder), asc(products.name)],
    with: { images: true },
  });

  return rows.map(attachPrimaryImage);
}

export async function getProductByIdAdmin(id: string) {
  const row = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: { images: true },
  });

  return row ? attachPrimaryImage(row) : null;
}

export async function getActiveTestimonials() {
  return db.query.testimonials.findMany({
    where: eq(testimonials.isActive, true),
    orderBy: [asc(testimonials.displayOrder), asc(testimonials.createdAt)],
  });
}

export async function getAllTestimonialsAdmin() {
  return db.query.testimonials.findMany({
    orderBy: [asc(testimonials.displayOrder), asc(testimonials.createdAt)],
  });
}

export async function getTestimonialByIdAdmin(id: string) {
  const row = await db.query.testimonials.findFirst({ where: eq(testimonials.id, id) });
  return row ?? null;
}

export async function getShowcase(slug: string) {
  const row = await db.query.showcases.findFirst({ where: eq(showcases.slug, slug) });
  return row ?? null;
}

type ProductWithImages = typeof products.$inferSelect & {
  images: (typeof productImages.$inferSelect)[];
};

function attachPrimaryImage(row: ProductWithImages) {
  const primaryImage =
    row.images.find((img) => img.id === row.primaryImageId) ?? row.images[0] ?? null;
  return { ...row, primaryImage };
}
