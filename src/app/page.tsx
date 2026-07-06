import { getAllActiveProducts, getActiveTestimonials, getShowcase } from "@/db/queries";
import { PRODUCT_CATEGORIES, type ProductCategorySlug } from "@/lib/categories";
import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryEntryCards } from "@/components/home/category-entry-cards";
import { QuickQuoteWidget } from "@/components/home/quick-quote-widget";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, testimonials, showcase] = await Promise.all([
    getAllActiveProducts(),
    getActiveTestimonials(),
    getShowcase("tg1300x"),
  ]);

  const productsByCategory = PRODUCT_CATEGORIES.reduce(
    (acc, c) => {
      acc[c.slug] = products
        .filter((p) => p.category === c.slug)
        .map((p) => ({ id: p.id, name: p.name }));
      return acc;
    },
    {} as Record<ProductCategorySlug, { id: string; name: string }[]>
  );

  return (
    <div>
      <HeroSlider showcaseImage={showcase?.imageUrl ?? null} />

      <section className="bg-brand-950 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
              Yedek Parça Kategorileri
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              İhtiyacınız olan makinayı seçin
            </h2>
          </div>
          <div className="mt-8">
            <CategoryEntryCards />
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <QuickQuoteWidget productsByCategory={productsByCategory} />
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
