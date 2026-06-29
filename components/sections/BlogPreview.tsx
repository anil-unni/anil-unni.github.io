import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section
      id="blog"
      aria-label="Technical Blog Preview"
      className="px-6 py-24 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
              Technical Blog
            </p>
            <h2
              className="font-semibold text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              Writing on craft & systems.
            </h2>
          </div>
          <Link
            href="/blog"
            data-cursor="hover"
            className="hidden sm:inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            All posts →
          </Link>
        </div>

        <ul className="space-y-0">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-border">
              <Link
                href={`/blog/${post.slug}`}
                data-cursor="hover"
                className="group flex flex-col gap-1.5 py-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-[10px] text-muted font-mono">{post.readingTime}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-1">{post.excerpt}</p>
                <time dateTime={post.date} className="text-[10px] text-muted font-mono">
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
          <li className="border-t border-border" aria-hidden="true" />
        </ul>

        <div className="mt-8 sm:hidden">
          <Link href="/blog" data-cursor="hover" className="text-xs text-muted hover:text-foreground transition-colors">
            All posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
