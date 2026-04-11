import Link from "next/link";
import { CartSummary } from "@/components/commerce/cart-summary";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/api/woocommerce-client";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="container-padded grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <section className="rounded-2xl border border-brand-100 p-6">
        <h1 className="font-serif text-3xl">Your cart</h1>
        {cart.lines.length === 0 ? (
          <div className="mt-8 text-sm text-neutral-600">Your cart is empty. <Link href="/shop" className="underline">Continue shopping</Link>.</div>
        ) : (
          <div>Cart lines render here from WooCommerce Store API using shopper session cookies/tokens.</div>
        )}
        <div className="mt-8"><Button variant="secondary">Recommended products</Button></div>
      </section>
      <CartSummary cart={cart} />
    </div>
  );
}
