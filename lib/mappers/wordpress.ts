import { BlogPost, RawWpPost } from "@/lib/types/cms";

function toPlainText(input: string): string {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function mapWpPostToBlogPost(raw: RawWpPost): BlogPost {
  const category = raw._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Editorial";

  return {
    slug: raw.slug,
    title: toPlainText(raw.title?.rendered ?? "Untitled"),
    excerpt: toPlainText(raw.excerpt?.rendered ?? ""),
    body: toPlainText(raw.content?.rendered ?? ""),
    category,
    publishedAt: raw.date_gmt || raw.date
  };
}
