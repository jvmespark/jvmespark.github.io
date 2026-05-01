import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { getAllPosts, getAllTags, getAllSeries } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ['', '/posts', '/projects', '/tags', '/series', '/now'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    }),
  );

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}${p.url}`,
    lastModified: new Date(p.frontmatter.updated ?? p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const tagRoutes = getAllTags().map(({ tag }) => ({
    url: `${base}/tags/${encodeURIComponent(tag)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  const seriesRoutes = getAllSeries().map((s) => ({
    url: `${base}/series/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes, ...seriesRoutes];
}
