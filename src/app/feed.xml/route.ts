import { Feed } from 'feed';
import { siteConfig } from '@/lib/config';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.author.name}`,
    feedLinks: {
      atom: `${siteConfig.url}/feed.xml`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  });

  for (const p of posts) {
    feed.addItem({
      title: p.frontmatter.title,
      id: `${siteConfig.url}${p.url}`,
      link: `${siteConfig.url}${p.url}`,
      description: p.frontmatter.description,
      content: p.frontmatter.description,
      date: new Date(p.frontmatter.date),
      category: (p.frontmatter.tags ?? []).map((t) => ({ name: t })),
    });
  }

  return new Response(feed.atom1(), {
    headers: { 'content-type': 'application/atom+xml; charset=utf-8' },
  });
}
