import { pages, posts } from "@/lib/api/mock-data";
import { BlogPost, CMSPage, RawWpPost } from "@/lib/types/cms";
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
  return fetchWP<CMSPage>(`/wp-json/headless/v1/pages/${slug}`);
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
