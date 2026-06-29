import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import TableOfContents from "@/components/blog/TableOfContents";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/config";

const SITE_URL = siteConfig.url;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const ogImage = post.image ?? `${SITE_URL}/og-image.png`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Anil Unni"],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
  };
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = (match[1].length as 2 | 3);
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: SITE_URL,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/blog/${params.slug}`,
    image: post.image ?? `${SITE_URL}/og-image.png`,
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd data={articleJsonLd} />

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16">
        {/* Article body */}
        <article aria-label={post.title}>
          {/* Author metadata */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-display-md font-semibold text-foreground mb-5 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="font-medium text-foreground">Anil Unni</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* MDX content */}
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* Sidebar ToC */}
        <aside aria-label="Reading navigation" className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </main>
  );
}
