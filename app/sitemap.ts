import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/lib/config";

const BASE = siteConfig.url;

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
{ url: `${BASE}/consulting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
];

function getBlogSlugs(): { slug: string; date: string }[] {
  const blogDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((e) => fs.statSync(path.join(blogDir, e)).isDirectory())
    .flatMap((slug) => {
      const fp = path.join(blogDir, slug, "index.mdx");
      if (!fs.existsSync(fp)) return [];
      const { data } = matter(fs.readFileSync(fp, "utf-8"));
      if (!data.published) return [];
      return [{ slug, date: data.date as string }];
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map(({ slug, date }) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...blogRoutes];
}
