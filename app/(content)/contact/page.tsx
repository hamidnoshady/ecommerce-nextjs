import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="container-padded grid gap-8 py-10 lg:grid-cols-2">
      <div><h1 className="font-serif text-4xl">Contact</h1><p className="mt-2 text-neutral-600">hello@ateliereclat.com · @ateliereclat</p></div>
      <form className="space-y-4 rounded-2xl border border-brand-100 p-6"><Input placeholder="Name" /><Input placeholder="Email" /><Input placeholder="How can we help?" /><Button>Send message</Button></form>
    </div>
  );
}
