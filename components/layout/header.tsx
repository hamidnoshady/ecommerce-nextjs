import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="bg-brand-900 py-2 text-center text-xs text-white">Free US shipping on orders over $75</div>
      <div className="container-padded flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-2xl">Atelier Éclat</Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-neutral-700 transition hover:text-black">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Search"><Search className="h-5 w-5" /></button>
          <Link href="/account" aria-label="Account"><User className="h-5 w-5" /></Link>
          <Link href="/cart" aria-label="Cart"><ShoppingBag className="h-5 w-5" /></Link>
        </div>
      </div>
    </header>
  );
}
