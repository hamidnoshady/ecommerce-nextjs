"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { slug: "serums", label: "Serums" },
  { slug: "cleansers", label: "Cleansers" },
  { slug: "moisturizers", label: "Moisturizers" },
  { slug: "best-sellers", label: "Best Sellers" }
];

export function ShopToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between rounded-xl border border-brand-100 p-3">
        <div className="hidden items-center gap-2 md:flex">
          {categories.map((category) => (
            <Link key={category.slug} href={`/shop/${category.slug}`} className="rounded-full px-3 py-2 text-sm transition hover:bg-brand-50">
              {category.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="secondary" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-filter-drawer">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
        <select className="rounded-md border border-brand-100 px-3 py-2 text-sm" aria-label="Sort products">
          <option>Sort: Featured</option>
          <option>Price: Low to high</option>
          <option>Price: High to low</option>
        </select>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setOpen(false)}>
          <aside
            id="mobile-filter-drawer"
            className="ml-auto h-full w-80 bg-white p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Filters</h2>
              <button aria-label="Close filters" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link key={category.slug} href={`/shop/${category.slug}`} className="block rounded-lg border border-brand-100 px-4 py-3" onClick={() => setOpen(false)}>
                  {category.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
