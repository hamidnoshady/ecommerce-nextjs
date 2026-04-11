import { ProductGrid } from "@/components/commerce/product-grid";
import { getProducts } from "@/lib/api/woocommerce-client";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="container-padded space-y-8 py-10">
      <section className="rounded-2xl bg-brand-50 p-8">
        <h1 className="font-serif text-4xl">Shop All</h1>
        <p className="mt-2 text-neutral-600">Build your ritual with clinically effective essentials.</p>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}
