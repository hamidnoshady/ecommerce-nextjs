export type FlexibleSectionType =
  | "hero"
  | "promoBanner"
  | "richText"
  | "imageText"
  | "splitEditorial"
  | "featuredCategories"
  | "featuredProducts"
  | "newArrivals"
  | "bundleOffer"
  | "trustBenefits"
  | "socialProof"
  | "testimonials"
  | "faq"
  | "newsletter"
  | "cta";

export type FlexibleSection = {
  id: string;
  type: FlexibleSectionType;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  categorySlugs?: string[];
  productSlugs?: string[];
  items?: Array<{ title: string; body: string }>;
};

export type CMSPage = {
  slug: string;
  title: string;
  excerpt?: string;
  sections: FlexibleSection[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string;
};
