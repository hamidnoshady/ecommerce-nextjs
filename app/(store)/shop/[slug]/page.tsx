import { ProductGrid } from "@/components/commerce/product-grid";
import { getProductsByCategory } from "@/lib/api/woocommerce-client";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  return (
    <div className="container-padded space-y-8 py-10">
      <section className="rounded-2xl border border-brand-100 p-8">
        <h1 className="font-serif text-4xl capitalize">{slug.replaceAll("-", " ")}</h1>
        <p className="mt-2 text-neutral-600">Editorial collection selected for targeted skin outcomes.</p>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}
