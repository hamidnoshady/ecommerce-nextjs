import { pages, posts } from "@/lib/api/mock-data";
import { BlogPost, CMSPage } from "@/lib/types/cms";

const wpBase = process.env.WP_API_URL;

async function fetchWP<T>(path: string): Promise<T> {
  if (!wpBase) throw new Error("WP_API_URL is not configured");
  const res = await fetch(`${wpBase}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WordPress request failed: ${res.status}`);
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
  return fetchWP<BlogPost[]>("/wp-json/wp/v2/posts?_embed");
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const allPosts = await getBlogPosts();
  const post = allPosts.find((entry) => entry.slug === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return post;
}
