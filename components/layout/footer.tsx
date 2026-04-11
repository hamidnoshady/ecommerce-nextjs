import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-50">
      <div className="container-padded grid gap-12 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl">Atelier Éclat</h2>
          <p className="mt-3 max-w-sm text-sm text-neutral-600">Performance beauty rooted in clinical ingredients and editorial rituals.</p>
        </div>
        <div><h3 className="mb-3 text-sm font-medium">Shop</h3><ul className="space-y-2 text-sm text-neutral-600"><li><Link href="/shop">All products</Link></li><li><Link href="/collections">Bundles</Link></li></ul></div>
        <div><h3 className="mb-3 text-sm font-medium">Support</h3><ul className="space-y-2 text-sm text-neutral-600"><li><Link href="/faq">FAQ</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
        <div><h3 className="mb-3 text-sm font-medium">Newsletter</h3><div className="space-y-2"><Input placeholder="Email address" /><Button className="w-full">Subscribe</Button></div></div>
      </div>
    </footer>
  );
}
