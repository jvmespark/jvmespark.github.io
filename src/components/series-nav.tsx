import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSeriesNeighbors, getSeriesBySlug, type Post } from '@/lib/posts';

export function SeriesNav({ post }: { post: Post }) {
  if (!post.frontmatter.series) return null;
  const series = getSeriesBySlug(post.frontmatter.series.slug);
  if (!series) return null;
  const { prev, next } = getSeriesNeighbors(post);
  const totalParts = series.posts.length;
  const idx = series.posts.findIndex((p) => p.slug === post.slug);

  return (
    <aside
      className="not-prose my-10 rounded-lg border border-paper-line bg-paper-deep/30 p-5"
      aria-label="Series navigation"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            part of a series
          </div>
          <Link
            href={`/series/${series.slug}`}
            className="font-display text-lg font-medium text-ink hover:text-ink/90"
          >
            {series.title}
          </Link>
        </div>
        <div className="font-mono text-[11px] text-ink-muted">
          {idx + 1} / {totalParts}
        </div>
      </div>

      <ol className="mb-4 space-y-1.5 border-l border-paper-line pl-4 text-[13.5px]">
        {series.posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={p.url}
              className={
                p.slug === post.slug
                  ? 'font-medium text-ink'
                  : 'text-ink-muted hover:text-ink'
              }
            >
              <span className="font-mono text-[11px] text-ink-faint mr-2">
                {String((p.frontmatter.series?.order ?? 0)).padStart(2, '0')}
              </span>
              {p.frontmatter.title}
            </Link>
          </li>
        ))}
      </ol>

      <div className="flex items-center justify-between gap-3 border-t border-paper-line/60 pt-3 text-sm">
        {prev ? (
          <Link
            href={prev.url}
            className="group flex items-center gap-2 text-ink-muted hover:text-ink"
          >
            <ChevronLeft size={14} />
            <span className="line-clamp-1">{prev.frontmatter.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.url}
            className="group flex items-center gap-2 text-ink-muted hover:text-ink"
          >
            <span className="line-clamp-1">{next.frontmatter.title}</span>
            <ChevronRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </aside>
  );
}
