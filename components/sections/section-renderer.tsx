import Link from "next/link";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/lib/api/woocommerce-client";
import { FlexibleSection } from "@/lib/types/cms";

export async function SectionRenderer({ sections }: { sections: FlexibleSection[] }) {
  const products = await getProducts();

  return (
    <div className="space-y-16 py-10">
      {sections.map((section) => {
        if (section.type === "hero") {
          return (
            <section key={section.id} className="container-padded py-20 text-center">
              <h1 className="editorial-title text-4xl sm:text-6xl">{section.heading}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-neutral-600">{section.body}</p>
              {section.ctaHref && section.ctaLabel && <Link href={section.ctaHref} className="mt-8 inline-flex rounded-full bg-brand-900 px-6 py-3 text-white">{section.ctaLabel}</Link>}
            </section>
          );
        }
        if (section.type === "featuredProducts" || section.type === "newArrivals") {
          return <section key={section.id} className="container-padded space-y-6"><h2 className="font-serif text-3xl">{section.heading}</h2><ProductGrid products={products} /></section>;
        }
        if (section.type === "featuredCategories") {
          const categories = ["Serums", "Cleansers", "Moisturizers"];
          return <section key={section.id} className="container-padded"><h2 className="mb-6 font-serif text-3xl">{section.heading}</h2><div className="grid gap-4 sm:grid-cols-3">{categories.map((category) => <Link key={category} href={`/shop/${category.toLowerCase()}`} className="rounded-xl border border-brand-100 p-6 text-center transition hover:-translate-y-1">{category}</Link>)}</div></section>;
        }
        if (section.type === "trustBenefits") {
          return <section key={section.id} className="container-padded grid gap-4 rounded-2xl bg-brand-50 p-8 sm:grid-cols-3">{section.items?.map((item) => <div key={item.title}><h3 className="text-sm font-semibold">{item.title}</h3><p className="text-sm text-neutral-600">{item.body}</p></div>)}</section>;
        }
        if (section.type === "faq") {
          return <section key={section.id} className="container-padded"><h2 className="font-serif text-3xl">{section.heading}</h2><div className="mt-4 space-y-3 text-sm text-neutral-700"><p>How long is shipping? 2-5 business days domestic.</p><p>Returns accepted? Yes, within 30 days for unopened items.</p></div></section>;
        }
        if (section.type === "newsletter") {
          return <section key={section.id} className="container-padded rounded-2xl border border-brand-100 p-8 text-center"><h2 className="font-serif text-3xl">{section.heading}</h2><div className="mx-auto mt-4 flex max-w-md gap-2"><Input placeholder="Email" /><Button>Join</Button></div></section>;
        }
        return <section key={section.id} className="container-padded rounded-2xl bg-brand-50 p-8"><h2 className="font-serif text-3xl">{section.heading}</h2><p className="mt-2 text-neutral-600">{section.body ?? "Configured in WordPress flexible sections."}</p></section>;
      })}
    </div>
  );
}
