import { ProductCard } from "@/components/commerce/product-card";
import { Product } from "@/lib/types/commerce";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <div className="rounded-xl border border-dashed border-brand-100 p-10 text-center text-sm text-neutral-500">No products found in this collection yet.</div>;
  }

  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
