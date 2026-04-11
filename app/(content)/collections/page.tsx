import Link from "next/link";

export default function CollectionsPage() {
  return (
    <div className="container-padded space-y-8 py-10">
      <h1 className="font-serif text-4xl">Collections & Offers</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/shop/best-sellers" className="rounded-2xl border border-brand-100 p-8">Best Sellers Ritual</Link>
        <Link href="/shop/new-arrivals" className="rounded-2xl border border-brand-100 p-8">New Arrivals Edit</Link>
      </div>
    </div>
  );
}
