import Link from 'next/link';
import { getAllSeries } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'series',
  url: '/series',
  description: 'multi-part essays grouped into a series.',
});

export default function SeriesIndexPage() {
  const series = getAllSeries();
  if (series.length === 0) {
    return (
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">series</h1>
        <p className="mt-3 text-ink-muted">no series yet.</p>
      </div>
    );
  }
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-medium text-ink">series</h1>
        <p className="mt-1 text-[15px] text-ink-muted">
          longer arcs broken into parts.
        </p>
      </header>
      <div className="space-y-6">
        {series.map((s) => (
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className="group block rounded-lg border border-paper-line bg-paper-deep/30 p-5 transition-colors hover:bg-paper-deep"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-medium text-ink">{s.title}</h2>
              <span className="font-mono text-[11px] text-ink-faint">
                {s.posts.length} parts
              </span>
            </div>
            <ol className="mt-3 space-y-1 border-l border-paper-line pl-4 text-sm text-ink-muted">
              {s.posts.slice(0, 3).map((p) => (
                <li key={p.slug} className="line-clamp-1">
                  <span className="font-mono text-[11px] text-ink-faint mr-2">
                    {String(p.frontmatter.series?.order ?? 0).padStart(2, '0')}
                  </span>
                  {p.frontmatter.title}
                </li>
              ))}
              {s.posts.length > 3 && (
                <li className="font-mono text-[11px] text-ink-faint">
                  + {s.posts.length - 3} more
                </li>
              )}
            </ol>
          </Link>
        ))}
      </div>
    </div>
  );
}
