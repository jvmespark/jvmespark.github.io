import Link from 'next/link';
import { formatDate, pickAccent, type AccentKey } from '@/lib/utils';
import type { Post } from '@/lib/posts';
import { TagPill } from './tag-pill';

const ACCENT_DOT: Record<AccentKey, string> = {
  sage: 'bg-sage-400',
  peach: 'bg-peach-400',
  sky: 'bg-sky-400',
  rose: 'bg-rose-400',
};

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const accent = post.frontmatter.accent ?? pickAccent(post.slug);
  return (
    <article className="group relative">
      <Link href={post.url} className="block py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-ink/90">
            {post.frontmatter.title}
          </h3>
          <time
            dateTime={post.frontmatter.date}
            className="hidden shrink-0 font-mono text-xs uppercase tracking-wider text-ink-faint sm:inline"
          >
            {formatDate(post.frontmatter.date)}
          </time>
        </div>
        {post.frontmatter.description && !compact && (
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
            {post.frontmatter.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {post.frontmatter.draft && (
            <span className="rounded-full bg-paper-deep px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              draft
            </span>
          )}
          {(post.frontmatter.tags ?? []).slice(0, 4).map((t) => (
            <TagPill key={t} tag={t} asLink={false} />
          ))}
          <span className="ml-1 font-mono text-[11px] text-ink-faint">
            · {post.readingTime.text}
          </span>
        </div>
      </Link>
      <span
        aria-hidden
        className={`pointer-events-none absolute -left-3 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100 sm:block ${ACCENT_DOT[accent]}`}
      />
    </article>
  );
}
