import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTimeFn from 'reading-time';

export type PostFrontmatter = {
  title: string;
  description?: string;
  date: string;
  updated?: string;
  tags?: string[];
  draft?: boolean;
  math?: boolean;
  series?: { slug: string; order: number; title?: string };
  cover?: string;
  /** override the auto-picked accent (sage | peach | sky | rose) */
  accent?: 'sage' | 'peach' | 'sky' | 'rose';
};

export type Post = {
  slug: string;
  /** path segments under content/posts (without extension), used to build the URL */
  segments: string[];
  /** primary URL path (e.g. "/posts/hello-world") */
  url: string;
  body: string;
  readingTime: { text: string; minutes: number; words: number };
  frontmatter: PostFrontmatter;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function walkMdx(dir: string, base: string[] = []): { absPath: string; segments: string[] }[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out: { absPath: string; segments: string[] }[] = [];
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walkMdx(abs, [...base, e.name]));
    } else if (e.isFile() && /\.mdx?$/.test(e.name)) {
      const stem = e.name.replace(/\.mdx?$/, '');
      out.push({ absPath: abs, segments: [...base, stem] });
    }
  }
  return out;
}

function parseFile(absPath: string, segments: string[]): Post {
  const raw = fs.readFileSync(absPath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const slug = segments[segments.length - 1];
  const rt = readingTimeFn(content);
  return {
    slug,
    segments,
    url: `/posts/${slug}`,
    body: content,
    readingTime: { text: rt.text, minutes: rt.minutes, words: rt.words },
    frontmatter: {
      ...fm,
      tags: fm.tags ?? [],
      draft: fm.draft ?? false,
    },
  };
}

let _cache: Post[] | null = null;

export function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): Post[] {
  if (_cache) {
    return includeDrafts ? _cache : _cache.filter((p) => !p.frontmatter.draft);
  }
  const files = walkMdx(POSTS_DIR);
  const posts = files.map(({ absPath, segments }) => parseFile(absPath, segments));
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
  _cache = posts;
  return includeDrafts ? posts : posts.filter((p) => !p.frontmatter.draft);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts({ includeDrafts: process.env.NODE_ENV !== 'production' }).find(
    (p) => p.slug === slug,
  );
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.frontmatter.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    (p.frontmatter.tags ?? []).map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

export type Series = {
  slug: string;
  title: string;
  posts: Post[];
};

export function getAllSeries(): Series[] {
  const map = new Map<string, Series>();
  for (const p of getAllPosts()) {
    const s = p.frontmatter.series;
    if (!s) continue;
    if (!map.has(s.slug)) {
      map.set(s.slug, { slug: s.slug, title: s.title ?? s.slug, posts: [] });
    }
    const series = map.get(s.slug)!;
    if (s.title && !series.title) series.title = s.title;
    series.posts.push(p);
  }
  for (const series of map.values()) {
    series.posts.sort(
      (a, b) => (a.frontmatter.series?.order ?? 0) - (b.frontmatter.series?.order ?? 0),
    );
  }
  return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title));
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return getAllSeries().find((s) => s.slug === slug);
}

/** Adjacent post pair within a series (for prev/next nav) */
export function getSeriesNeighbors(post: Post): { prev?: Post; next?: Post } {
  if (!post.frontmatter.series) return {};
  const s = getSeriesBySlug(post.frontmatter.series.slug);
  if (!s) return {};
  const idx = s.posts.findIndex((p) => p.slug === post.slug);
  return {
    prev: idx > 0 ? s.posts[idx - 1] : undefined,
    next: idx < s.posts.length - 1 ? s.posts[idx + 1] : undefined,
  };
}
