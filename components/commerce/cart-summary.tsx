import { Cart } from "@/lib/types/commerce";
import { Button } from "@/components/ui/button";

export function CartSummary({ cart }: { cart: Cart }) {
  return (
    <aside className="rounded-2xl border border-brand-100 p-6">
      <h2 className="font-serif text-xl">Order Summary</h2>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal.amount}</span></div>
        <div className="flex justify-between text-emerald-600"><span>Savings</span><span>-${cart.discountTotal.amount}</span></div>
      </div>
      <Button className="mt-6 w-full">Proceed to checkout</Button>
    </aside>
  );
}
