import { Product, RawWooProduct } from "@/lib/types/commerce";

function normalizeAmount(priceRaw: string, minorUnit = 2): number {
  const parsed = Number(priceRaw ?? 0);
  if (Number.isNaN(parsed)) return 0;
  return parsed / 10 ** minorUnit;
}

export function mapWooProductToProduct(raw: RawWooProduct): Product {
  const primaryImage = raw.images?.[0]?.src ?? "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";
  const currency = raw.prices?.currency_code ?? "USD";
  const minorUnit = raw.prices?.currency_minor_unit ?? 2;

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    shortDescription: raw.short_description?.replace(/<[^>]+>/g, "").trim() ?? "",
    description: raw.description?.replace(/<[^>]+>/g, "").trim() ?? "",
    image: primaryImage,
    gallery: raw.images?.map((image) => image.src) ?? [primaryImage],
    price: {
      amount: normalizeAmount(raw.prices?.price ?? "0", minorUnit),
      currency
    },
    compareAtPrice: raw.prices?.regular_price
      ? {
          amount: normalizeAmount(raw.prices.regular_price, minorUnit),
          currency
        }
      : undefined,
    categories: raw.categories?.map((category) => category.slug).filter(Boolean) ?? [],
    badges: raw.on_sale ? ["Sale"] : undefined
  };
}
