import { pages, posts } from "@/lib/api/mock-data";
import { BlogPost, CMSPage, RawWpPage, RawWpPost } from "@/lib/types/cms";
import { mapWpPostToBlogPost } from "@/lib/mappers/wordpress";

const wpBase = process.env.WP_API_URL;

function normalizeWpBaseUrl(input: string): string {
  return input
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/wp-json\/wp\/v2$/i, "")
    .replace(/\/wp-json$/i, "");
}

function joinUrl(base: string, path: string): string {
  const normalizedBase = normalizeWpBaseUrl(base);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function toPlainText(input?: string): string {
  return (input ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function mapWpPageFallback(raw: RawWpPage, slug: string): CMSPage {
  const title = toPlainText(raw.title?.rendered) || slug;
  const excerpt = toPlainText(raw.excerpt?.rendered);

  return {
    slug,
    title,
    excerpt,
    sections: [
      {
        id: `${slug}-hero-fallback`,
        type: "hero",
        heading: title,
        body: excerpt || "Page loaded from standard WordPress REST API because custom headless endpoint is unavailable.",
        ctaLabel: slug === "home" ? "Shop now" : undefined,
        ctaHref: slug === "home" ? "/shop" : undefined
      }
    ]
  };
}

async function fetchWP<T>(path: string): Promise<T> {
  if (!wpBase) throw new Error("WP_API_URL is not configured");
  const requestUrl = joinUrl(wpBase, path);

  const res = await fetch(requestUrl, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WordPress request failed: ${res.status} (${requestUrl})`);
  return res.json() as Promise<T>;
}

export async function getPageBySlug(slug: string): Promise<CMSPage> {
  if (!wpBase) {
    const page = pages.find((entry) => entry.slug === slug);
    if (!page) throw new Error(`No local page found for slug: ${slug}`);
    return page;
  }

  try {
    return await fetchWP<CMSPage>(`/wp-json/headless/v1/pages/${slug}`);
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("404")) throw error;

    const fallbackPages = await fetchWP<RawWpPage[]>(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=slug,title,excerpt`);
    const fallbackPage = fallbackPages[0];
    if (!fallbackPage) throw error;

    return mapWpPageFallback(fallbackPage, slug);
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!wpBase) return posts;
  const rawPosts = await fetchWP<RawWpPost[]>("/wp-json/wp/v2/posts?_embed");
  return rawPosts.map(mapWpPostToBlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const allPosts = await getBlogPosts();
  const post = allPosts.find((entry) => entry.slug === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return post;
}
