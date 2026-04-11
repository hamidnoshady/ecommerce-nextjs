import { getBlogPost } from "@/lib/api/wp-client";

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return (
    <article className="container-padded max-w-4xl space-y-6 py-12">
      <p className="text-xs uppercase tracking-wide text-neutral-500">{post.category} · {post.publishedAt}</p>
      <h1 className="font-serif text-5xl">{post.title}</h1>
      <p className="text-lg text-neutral-600">{post.excerpt}</p>
      <div className="prose prose-neutral max-w-none"><p>{post.body}</p></div>
      <section className="rounded-2xl bg-brand-50 p-8"><h2 className="font-serif text-2xl">Related products</h2><p className="mt-2 text-sm text-neutral-600">Map related products by taxonomy or ACF product relationships.</p></section>
    </article>
  );
}
