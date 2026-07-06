import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, type ProductCategorySlug } from "@/lib/categories";
import { getActiveProductsByCategory, getShowcase } from "@/db/queries";
import { ProductGrid } from "@/components/products/product-grid";
import { ShowcaseView } from "@/components/products/showcase-view";

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
  const entry = getCategory(category);
  if (!entry) notFound();

  return {
    title: entry.label,
    description:
      entry.kind === "showcase"
        ? `${entry.label} hakkında detaylı bilgi alın.`
        : `${entry.label} için orijinal ve muadil ürünler. WhatsApp üzerinden hızlı fiyat teklifi alın.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const entry = getCategory(category);
  if (!entry) notFound();

  return (
    <div className="min-h-screen bg-brand-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`/urunler/${c.slug}`}
              className={
                c.slug === entry.slug
                  ? "rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-950"
                  : "rounded-full border border-hairline px-4 py-2 text-sm font-medium text-steel-400 transition-colors hover:border-accent-500 hover:text-white"
              }
            >
              {c.label}
            </a>
          ))}
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {entry.label}
        </h1>

        {entry.kind === "showcase" ? (
          <ShowcaseContent slug={entry.slug} title={entry.label} />
        ) : (
          <ProductsContent category={entry.slug} />
        )}
      </div>
    </div>
  );
}

async function ShowcaseContent({ slug, title }: { slug: string; title: string }) {
  const showcase = await getShowcase(slug);

  return (
    <div className="mt-8">
      <ShowcaseView
        title={title}
        imageUrl={showcase?.imageUrl ?? null}
        description={showcase?.description ?? null}
      />
    </div>
  );
}

async function ProductsContent({ category }: { category: ProductCategorySlug }) {
  const products = await getActiveProductsByCategory(category);

  return (
    <>
      <p className="mt-2 max-w-2xl text-sm text-steel-400">
        Aşağıdaki ürünlerden ilgilendiğiniz parçanın altındaki &quot;Fiyat
        Teklifi Al&quot; butonuna tıklayarak WhatsApp üzerinden anında teklif
        talep edebilirsiniz.
      </p>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
