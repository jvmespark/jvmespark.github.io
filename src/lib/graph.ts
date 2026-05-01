import { getAllPosts, getAllTags } from './posts';
import type { GraphData } from '@/components/knowledge-graph';

export function buildGraphData(): GraphData {
  const posts = getAllPosts();
  const tags = getAllTags();

  const nodes: GraphData['nodes'] = [
    ...posts.map((p) => ({
      id: `post:${p.slug}`,
      label: p.frontmatter.title,
      kind: 'post' as const,
      url: p.url,
      weight: 1,
    })),
    ...tags
      .filter((t) => t.count >= 1)
      .map((t) => ({
        id: `tag:${t.tag}`,
        label: `#${t.tag}`,
        kind: 'tag' as const,
        url: `/tags/${encodeURIComponent(t.tag)}`,
        weight: t.count,
      })),
  ];

  const links: GraphData['links'] = [];
  for (const p of posts) {
    for (const t of p.frontmatter.tags ?? []) {
      links.push({ source: `post:${p.slug}`, target: `tag:${t}` });
    }
    if (p.frontmatter.series) {
      const seriesPosts = posts.filter(
        (q) => q.frontmatter.series?.slug === p.frontmatter.series!.slug,
      );
      for (const q of seriesPosts) {
        if (q.slug !== p.slug) {
          links.push({ source: `post:${p.slug}`, target: `post:${q.slug}` });
        }
      }
    }
  }

  return { nodes, links };
}
