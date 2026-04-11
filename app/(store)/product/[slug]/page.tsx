import Image from "next/image";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getProducts } from "@/lib/api/woocommerce-client";
import { ProductGrid } from "@/components/commerce/product-grid";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const related = (await getProducts()).filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div className="container-padded space-y-14 py-10">
      <section className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-100"><Image src={product.image} alt={product.name} fill className="object-cover" /></div>
        <div>
          <h1 className="font-serif text-4xl">{product.name}</h1>
          <p className="mt-2 text-2xl">${product.price.amount}</p>
          <p className="mt-4 text-neutral-600">{product.shortDescription}</p>
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-neutral-700"><li>Clinically tested active blend</li><li>Fragrance-free and cruelty-free</li><li>Ships in recyclable glass packaging</li></ul>
          <div className="mt-8 flex gap-3"><Button>Add to cart</Button><Button variant="secondary">Buy now</Button></div>
          <p className="mt-4 text-xs text-neutral-500">Free shipping over $75 · 30-day returns · Secure checkout</p>
          <div className="mt-8"><Accordion items={[{ title: "How to use", content: "Apply 1-2 pumps nightly on clean skin." }, { title: "Ingredients", content: "Niacinamide, Vitamin C, Peptides." }, { title: "Shipping & returns", content: "US delivery in 2-5 business days." }]} /></div>
        </div>
      </section>
      <section><h2 className="mb-5 font-serif text-3xl">Related products</h2><ProductGrid products={related} /></section>
    </div>
  );
}
