import { Accordion } from "@/components/ui/accordion";

const faqs = [
  { title: "Shipping", content: "US shipping takes 2-5 business days." },
  { title: "Returns", content: "Returns accepted within 30 days for unopened products." },
  { title: "Orders", content: "Track orders from your account dashboard." },
  { title: "Payments", content: "We accept major cards and digital wallets configured in WooCommerce." },
  { title: "Product usage", content: "Use serums before creams, morning and evening as directed." },
  { title: "Ingredients", content: "See product pages for full INCI lists and suitability guidance." },
  { title: "Account & support", content: "Email support for account recovery and order updates." }
];

export default function FAQPage() {
  return <div className="container-padded space-y-6 py-10"><h1 className="font-serif text-4xl">Support FAQ</h1><Accordion items={faqs} /></div>;
}
