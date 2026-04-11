import { pages, posts } from "@/lib/api/mock-data";
import { BlogPost, CMSPage, FlexibleSection } from "@/lib/types/cms";

const wpApiUrl = process.env.WP_API_URL;
const wpGraphqlUrl = process.env.WP_GRAPHQL_URL ?? (wpApiUrl ? `${wpApiUrl.replace(/\/+$/, "").replace(/\/wp-json(\/wp\/v2)?$/i, "")}/graphql` : undefined);

function toPlainText(input?: string): string {
  return (input ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWPGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!wpGraphqlUrl) throw new Error("WP_GRAPHQL_URL is not configured");

  const res = await fetch(wpGraphqlUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`WordPress GraphQL request failed: ${res.status} (${wpGraphqlUrl})`);
  }

  const payload = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (payload.errors?.length) {
    throw new Error(`WordPress GraphQL error: ${payload.errors[0].message} (${wpGraphqlUrl})`);
  }
  if (!payload.data) throw new Error(`WordPress GraphQL returned no data (${wpGraphqlUrl})`);

  return payload.data;
}

function mapFlexibleSections(nodes: Array<Record<string, unknown>> | null | undefined): FlexibleSection[] {
  if (!nodes?.length) return [];

  return nodes
    .map((node, index) => {
      const typeName = String(node.__typename ?? "").toLowerCase();
      if (typeName.includes("hero")) {
        return {
          id: String(node.id ?? `hero-${index}`),
          type: "hero" as const,
          heading: typeof node.heading === "string" ? node.heading : undefined,
          body: typeof node.body === "string" ? node.body : undefined,
          ctaLabel: typeof node.ctaLabel === "string" ? node.ctaLabel : undefined,
          ctaHref: typeof node.ctaHref === "string" ? node.ctaHref : undefined
        };
      }
      if (typeName.includes("featuredproducts")) {
        return {
          id: String(node.id ?? `featured-products-${index}`),
          type: "featuredProducts" as const,
          heading: typeof node.heading === "string" ? node.heading : undefined,
          productSlugs: Array.isArray(node.productSlugs) ? (node.productSlugs as string[]) : undefined
        };
      }
      if (typeName.includes("faq")) {
        return {
          id: String(node.id ?? `faq-${index}`),
          type: "faq" as const,
          heading: typeof node.heading === "string" ? node.heading : undefined
        };
      }
      return {
        id: String(node.id ?? `rich-text-${index}`),
        type: "richText" as const,
        heading: typeof node.heading === "string" ? node.heading : undefined,
        body: typeof node.body === "string" ? node.body : undefined
      };
    })
    .filter(Boolean);
}

const PAGE_QUERY = `
  query PageBySlug($uri: ID!) {
    page(id: $uri, idType: URI) {
      slug
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      pageBuilder {
        flexibleSections {
          __typename
          ... on Page_Pagebuilder_FlexibleSections_Hero {
            id
            heading
            body
            ctaLabel
            ctaHref
          }
          ... on Page_Pagebuilder_FlexibleSections_RichText {
            id
            heading
            body
          }
          ... on Page_Pagebuilder_FlexibleSections_FeaturedProducts {
            id
            heading
            productSlugs
          }
          ... on Page_Pagebuilder_FlexibleSections_Faq {
            id
            heading
          }
        }
      }
    }
  }
`;

const POSTS_QUERY = `
  query PostsIndex {
    posts(first: 50, where: { status: PUBLISH }) {
      nodes {
        slug
        title
        excerpt
        content
        date
        dateGmt
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const POST_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      excerpt
      content
      date
      dateGmt
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

export async function getPageBySlug(slug: string): Promise<CMSPage> {
  if (!wpGraphqlUrl) {
    const page = pages.find((entry) => entry.slug === slug);
    if (!page) throw new Error(`No local page found for slug: ${slug}`);
    return page;
  }

  const data = await fetchWPGraphQL<{
    page: {
      slug: string;
      title?: string;
      content?: string;
      featuredImage?: { node?: { sourceUrl?: string } };
      pageBuilder?: { flexibleSections?: Array<Record<string, unknown>> };
    } | null;
  }>(PAGE_QUERY, { uri: `/${slug}` });

  if (!data.page) throw new Error(`Page not found for slug: ${slug}`);

  const mappedSections = mapFlexibleSections(data.page.pageBuilder?.flexibleSections);

  return {
    slug: data.page.slug,
    title: toPlainText(data.page.title),
    excerpt: toPlainText(data.page.content),
    sections:
      mappedSections.length > 0
        ? mappedSections
        : [
            {
              id: `${slug}-hero-fallback`,
              type: "hero",
              heading: toPlainText(data.page.title),
              body: toPlainText(data.page.content)
            }
          ]
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!wpGraphqlUrl) return posts;

  const data = await fetchWPGraphQL<{
    posts: {
      nodes: Array<{
        slug: string;
        title?: string;
        excerpt?: string;
        content?: string;
        date?: string;
        dateGmt?: string;
        categories?: { nodes?: Array<{ name?: string }> };
      }>;
    };
  }>(POSTS_QUERY);

  return data.posts.nodes.map((post) => ({
    slug: post.slug,
    title: toPlainText(post.title),
    excerpt: toPlainText(post.excerpt),
    body: toPlainText(post.content),
    category: post.categories?.nodes?.[0]?.name ?? "Editorial",
    publishedAt: post.dateGmt ?? post.date ?? ""
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  if (!wpGraphqlUrl) {
    const post = posts.find((entry) => entry.slug === slug);
    if (!post) throw new Error(`Post not found for slug: ${slug}`);
    return post;
  }

  const data = await fetchWPGraphQL<{
    post: {
      slug: string;
      title?: string;
      excerpt?: string;
      content?: string;
      date?: string;
      dateGmt?: string;
      categories?: { nodes?: Array<{ name?: string }> };
    } | null;
  }>(POST_QUERY, { slug });

  if (!data.post) throw new Error(`Post not found for slug: ${slug}`);

  return {
    slug: data.post.slug,
    title: toPlainText(data.post.title),
    excerpt: toPlainText(data.post.excerpt),
    body: toPlainText(data.post.content),
    category: data.post.categories?.nodes?.[0]?.name ?? "Editorial",
    publishedAt: data.post.dateGmt ?? data.post.date ?? ""
  };
}
