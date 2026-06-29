import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Technical Blog",
  description: "In-depth writing on ERP systems, solutions architecture, Next.js, and the craft of building software.",
  alternates: { canonical: "https://anil-unni.github.io/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main
      aria-label="Technical Blog"
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <header className="mb-14">
        <p className="text-label-sm tracking-[0.2em] text-accent uppercase mb-3">
          Technical Writing
        </p>
        <h1 className="text-display-md font-semibold text-foreground">Blog</h1>
        <p className="mt-4 text-sm text-muted leading-relaxed max-w-lg">
          In-depth writing on ERP systems, solutions architecture, Next.js patterns,
          and the craft of building software that actually works.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted text-sm">No posts published yet.</p>
      ) : (
        <ol className="space-y-px" aria-label="Blog post list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-transparent hover:border-border bg-transparent hover:bg-surface px-5 py-5 -mx-5 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <span className="shrink-0 text-[10px] text-muted">{post.readingTime}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <time
                    dateTime={post.date}
                    className="text-[10px] text-muted"
                  >
                    {formatDate(post.date)}
                  </time>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
