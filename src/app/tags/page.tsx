import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';
import { pickAccent } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'tags',
  url: '/tags',
  description: 'browse posts by tag',
});

const ACCENT_BG: Record<string, string> = {
  sage: 'bg-sage-100 text-sage-600 hover:bg-sage-200/80',
  peach: 'bg-peach-100 text-peach-600 hover:bg-peach-200/70',
  sky: 'bg-sky-100 text-sky-600 hover:bg-sky-200/70',
  rose: 'bg-rose-100 text-rose-600 hover:bg-rose-200/70',
};

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-medium text-ink">tags</h1>
        <p className="mt-1 text-[15px] text-ink-muted">
          {tags.length} tag{tags.length === 1 ? '' : 's'}, sized by how much i write about each.
        </p>
      </header>
      <ul className="flex flex-wrap items-center gap-2">
        {tags.map(({ tag, count }) => {
          const a = pickAccent(tag);
          // map count to size — gentle, not loud
          const size = Math.min(1.5, 0.85 + count * 0.08);
          return (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium tracking-tight transition-colors ${ACCENT_BG[a]}`}
                style={{ fontSize: `${size}rem` }}
              >
                {tag}
                <span className="font-mono text-[11px] opacity-70">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
