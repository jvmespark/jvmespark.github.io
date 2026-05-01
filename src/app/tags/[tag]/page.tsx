import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  return buildMetadata({
    title: `#${tag}`,
    description: `posts tagged ${tag}`,
    url: `/tags/${params.tag}`,
  });
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();
  return (
    <div>
      <header className="mb-6">
        <Link
          href="/tags"
          className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
        >
          ← all tags
        </Link>
        <h1 className="mt-2 font-display text-3xl font-medium text-ink">#{tag}</h1>
        <p className="mt-1 text-[15px] text-ink-muted">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>
      <div className="divide-y divide-paper-line/60">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
