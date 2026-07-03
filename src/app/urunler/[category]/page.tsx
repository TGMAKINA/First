import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, isCategorySlug, getCategoryLabel } from "@/lib/categories";
import { getActiveProductsByCategory } from "@/db/queries";
import { ProductGrid } from "@/components/products/product-grid";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const label = getCategoryLabel(category);
  return {
    title: label,
    description: `${label} için orijinal ve muadil ürünler. WhatsApp üzerinden hızlı fiyat teklifi alın.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const products = await getActiveProductsByCategory(category);
  const label = getCategoryLabel(category);

  return (
    <div className="min-h-screen bg-brand-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`/urunler/${c.slug}`}
              className={
                c.slug === category
                  ? "rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-950"
                  : "rounded-full border border-hairline px-4 py-2 text-sm font-medium text-steel-400 transition-colors hover:border-accent-500 hover:text-white"
              }
            >
              {c.label}
            </a>
          ))}
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {label}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-steel-400">
          Aşağıdaki ürünlerden ilgilendiğiniz parçanın altındaki &quot;Fiyat
          Teklifi Al&quot; butonuna tıklayarak WhatsApp üzerinden anında teklif
          talep edebilirsiniz.
        </p>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
