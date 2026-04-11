import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types/commerce";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-brand-100 bg-white">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-neutral-500">${product.price.amount}</p>
        </Link>
        <Button className="w-full">Quick add</Button>
      </div>
    </article>
  );
}
