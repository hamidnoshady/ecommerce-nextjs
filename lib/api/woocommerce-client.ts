import { products } from "@/lib/api/mock-data";
import { Cart, Product, RawWooProduct } from "@/lib/types/commerce";
import { mapWooProductToProduct } from "@/lib/mappers/woocommerce";

const wcBase = process.env.WC_STORE_API_URL;

async function fetchWC<T>(path: string, init?: RequestInit): Promise<T> {
  if (!wcBase) throw new Error("WC_STORE_API_URL is not configured");
  const res = await fetch(`${wcBase}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) throw new Error(`WooCommerce request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  if (!wcBase) return products;
  const rawProducts = await fetchWC<RawWooProduct[]>("/products");
  return rawProducts.map(mapWooProductToProduct);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((product) => product.categories.includes(category));
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const all = await getProducts();
  const product = all.find((entry) => entry.slug === slug);
  if (!product) throw new Error(`Product not found for slug: ${slug}`);
  return product;
}

export async function getCart(): Promise<Cart> {
  if (!wcBase) {
    return {
      lines: [],
      subtotal: { amount: 0, currency: "USD" },
      discountTotal: { amount: 0, currency: "USD" }
    };
  }
  return fetchWC<Cart>("/cart");
}
