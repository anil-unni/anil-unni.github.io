import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  image?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  readingTime: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((entry) => fs.statSync(path.join(BLOG_DIR, entry)).isDirectory());

  const posts = slugs
    .map((slug) => {
      const filePath = path.join(BLOG_DIR, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null;

      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;

      if (!fm.published) return null;

      const stats = readingTime(content);
      const excerptMatch = content.replace(/#{1,6}\s.+\n/g, "").trim();
      const excerpt = excerptMatch.split("\n").find((l) => l.trim().length > 0) ?? "";

      return {
        ...fm,
        slug,
        readingTime: stats.text,
        excerpt: excerpt.slice(0, 160),
        content,
      } satisfies Post;
    })
    .filter((p): p is Post => p !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  const stats = readingTime(content);
  const excerptMatch = content.replace(/#{1,6}\s.+\n/g, "").trim();
  const excerpt = excerptMatch.split("\n").find((l) => l.trim().length > 0) ?? "";

  return {
    ...fm,
    slug,
    readingTime: stats.text,
    excerpt: excerpt.slice(0, 160),
    content,
  };
}
