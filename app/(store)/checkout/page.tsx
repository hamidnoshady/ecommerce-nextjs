import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  return (
    <div className="container-padded grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <form className="space-y-6 rounded-2xl border border-brand-100 p-6">
        <h1 className="font-serif text-3xl">Checkout</h1>
        <div className="grid gap-4 sm:grid-cols-2"><Input placeholder="First name" /><Input placeholder="Last name" /></div>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Address" />
        <div className="grid gap-4 sm:grid-cols-3"><Input placeholder="City" /><Input placeholder="State" /><Input placeholder="ZIP" /></div>
        <Button>Place order</Button>
      </form>
      <aside className="rounded-2xl bg-brand-50 p-6"><h2 className="font-serif text-2xl">Order Summary</h2><p className="mt-2 text-sm text-neutral-600">Totals and payment methods from WooCommerce checkout endpoint (requires live gateway + session configuration).</p></aside>
    </div>
  );
}
