import { getAllPosts } from './posts';

export type SearchDoc = {
  slug: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  excerpt: string;
};

export function buildSearchDocs(): SearchDoc[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    url: p.url,
    title: p.frontmatter.title,
    description: p.frontmatter.description ?? '',
    tags: p.frontmatter.tags ?? [],
    date: p.frontmatter.date,
    // first 320 plain-text chars of body, stripped of mdx noise
    excerpt: p.body
      .replace(/```[\s\S]*?```/g, '')
      .replace(/!\[[^\]]*]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
      .replace(/[#*_>`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 320),
  }));
}
