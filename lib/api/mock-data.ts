import { BlogPost, CMSPage } from "@/lib/types/cms";
import { Product } from "@/lib/types/commerce";

export const products: Product[] = [
  {
    id: 1,
    slug: "radiance-serum",
    name: "Radiance Reset Serum",
    shortDescription: "Vitamin-rich overnight renewal for glow and tone.",
    description: "A concentrated serum with niacinamide and stabilized vitamin C to visibly brighten and smooth texture.",
    image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137",
    gallery: ["https://images.unsplash.com/photo-1625772452859-1c03d5bf1137", "https://images.unsplash.com/photo-1556228720-195a672e8a03"],
    price: { amount: 64, currency: "USD" },
    compareAtPrice: { amount: 79, currency: "USD" },
    categories: ["serums", "best-sellers"],
    badges: ["Best Seller", "Clean Formula"]
  },
  {
    id: 2,
    slug: "velvet-cleanse-balm",
    name: "Velvet Cleanse Balm",
    shortDescription: "Melt-away makeup remover with barrier support.",
    description: "A buttery balm that emulsifies into milk, removing sunscreen and makeup while preserving moisture.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
    gallery: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b"],
    price: { amount: 38, currency: "USD" },
    categories: ["cleansers", "new-arrivals"]
  },
  {
    id: 3,
    slug: "night-repair-cream",
    name: "Night Repair Cream",
    shortDescription: "Rich peptide moisturizer for overnight restoration.",
    description: "A plush ceramide and peptide treatment cream designed to improve elasticity and deeply hydrate.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    gallery: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
    price: { amount: 72, currency: "USD" },
    categories: ["moisturizers", "best-sellers"]
  }
];

export const pages: CMSPage[] = [
  {
    slug: "home",
    title: "Luxury Beauty, Clinically Crafted.",
    sections: [
      { id: "h1", type: "hero", heading: "Editorial skincare rituals for visible results", body: "Science-backed essentials for glow, clarity, and confidence.", ctaLabel: "Shop Best Sellers", ctaHref: "/shop" },
      { id: "h2", type: "featuredCategories", heading: "Shop by collection" },
      { id: "h3", type: "featuredProducts", heading: "Best sellers" },
      { id: "h4", type: "newArrivals", heading: "Just arrived" },
      { id: "h5", type: "bundleOffer", heading: "Build your ritual", body: "Save 15% on curated regimen bundles." },
      { id: "h6", type: "trustBenefits", items: [{ title: "Dermatologist reviewed", body: "Safe for sensitive skin" }, { title: "Free US shipping", body: "On orders $75+" }, { title: "30-day returns", body: "Simple and fast support" }] },
      { id: "h7", type: "testimonials", heading: "Loved by 50k+ customers" },
      { id: "h8", type: "faq", heading: "Popular questions" },
      { id: "h9", type: "newsletter", heading: "Your weekly beauty edit" }
    ]
  }
];

export const posts: BlogPost[] = [
  {
    slug: "niacinamide-for-beginners",
    title: "Niacinamide for Beginners: How to Layer Without Irritation",
    excerpt: "A practical guide to adding niacinamide into your routine for tone and texture.",
    body: "Start with lower concentrations and pair with barrier-support ingredients.",
    category: "Ingredient Education",
    publishedAt: "2026-03-01"
  }
];
