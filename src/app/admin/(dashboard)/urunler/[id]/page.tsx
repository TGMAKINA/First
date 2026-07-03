import { notFound } from "next/navigation";
import { getProductByIdAdmin } from "@/db/queries";
import { updateProduct } from "../actions";
import { ProductForm } from "@/components/admin/product-form";
import { ImageUploader } from "@/components/admin/image-uploader";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);
  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Ürünü Düzenle</h1>
      <p className="mt-1 text-sm text-zinc-500">{product.name}</p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductForm
          action={boundUpdate}
          submitLabel="Değişiklikleri Kaydet"
          defaultValues={{
            name: product.name,
            slug: product.slug,
            category: product.category,
            description: product.description ?? "",
            quoteNote: product.quoteNote ?? "",
            displayOrder: product.displayOrder,
            isActive: product.isActive,
          }}
        />

        <div>
          <h2 className="text-sm font-semibold text-zinc-700">Görseller</h2>
          <div className="mt-2">
            <ImageUploader
              productId={product.id}
              images={product.images.map((img) => ({ id: img.id, blobUrl: img.blobUrl }))}
              primaryImageId={product.primaryImageId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
