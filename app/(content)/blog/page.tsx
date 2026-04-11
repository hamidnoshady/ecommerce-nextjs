import Link from "next/link";
import { getBlogPosts } from "@/lib/api/wp-client";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container-padded space-y-8 py-10">
      <h1 className="font-serif text-4xl">Beauty Journal</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-brand-100 p-6">
            <p className="text-xs uppercase tracking-wide text-neutral-500">{post.category}</p>
            <h2 className="mt-1 font-serif text-2xl">{post.title}</h2>
            <p className="mt-2 text-neutral-600">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm underline">Read article</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
