import { createProduct } from "../actions";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Yeni Ürün Ekle</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Ürünü kaydettikten sonra görsel ekleyebilirsiniz.
      </p>

      <div className="mt-6">
        <ProductForm action={createProduct} submitLabel="Ürünü Kaydet ve Devam Et" />
      </div>
    </div>
  );
}
