import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSeries, getSeriesBySlug } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getSeriesBySlug(params.slug);
  if (!s) return { title: 'Not found' };
  return buildMetadata({
    title: s.title,
    description: `series · ${s.posts.length} parts`,
    url: `/series/${s.slug}`,
  });
}

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const s = getSeriesBySlug(params.slug);
  if (!s) notFound();

  return (
    <div>
      <Link
        href="/series"
        className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
      >
        ← all series
      </Link>
      <header className="mt-2 mb-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          series
        </div>
        <h1 className="font-display text-3xl font-medium text-ink">{s.title}</h1>
        <p className="mt-1 text-[15px] text-ink-muted">
          {s.posts.length} parts
        </p>
      </header>

      <ol className="space-y-1 border-l border-paper-line">
        {s.posts.map((p) => (
          <li key={p.slug} className="pl-5 relative">
            <span
              aria-hidden
              className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-sage-400 ring-2 ring-paper"
            />
            <Link href={p.url} className="group block py-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-medium text-ink group-hover:text-ink/90">
                  <span className="font-mono text-[11px] text-ink-faint mr-2">
                    {String(p.frontmatter.series?.order ?? 0).padStart(2, '0')}
                  </span>
                  {p.frontmatter.title}
                </h3>
                <time className="hidden shrink-0 font-mono text-xs text-ink-faint sm:inline">
                  {formatDate(p.frontmatter.date)}
                </time>
              </div>
              {p.frontmatter.description && (
                <p className="mt-1 text-[14.5px] text-ink-muted">
                  {p.frontmatter.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
