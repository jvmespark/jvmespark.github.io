'use client';

import Fuse from 'fuse.js';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import type { SearchDoc } from '@/lib/search';
import { TagPill } from './tag-pill';
import { formatDate } from '@/lib/utils';

export function PostSearch({ docs }: { docs: SearchDoc[] }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.25 },
          { name: 'tags', weight: 0.15 },
          { name: 'excerpt', weight: 0.1 },
        ],
        threshold: 0.34,
        ignoreLocation: true,
      }),
    [docs],
  );

  const tags = useMemo(() => {
    const set = new Map<string, number>();
    for (const d of docs) for (const t of d.tags) set.set(t, (set.get(t) ?? 0) + 1);
    return Array.from(set.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12);
  }, [docs]);

  let results: SearchDoc[] = docs;
  if (query.trim()) results = fuse.search(query.trim()).map((r) => r.item);
  if (activeTag) results = results.filter((d) => d.tags.includes(activeTag));

  // keyboard shortcut: "/" focuses the input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('post-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div>
      <div className="relative">
        <Search
          aria-hidden
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          id="post-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…  press / to focus"
          className="w-full rounded-full border border-paper-line bg-paper-deep/40 py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-ink-faint focus:border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-200/60"
          aria-label="Search posts"
        />
        {(query || activeTag) && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveTag(null);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-muted hover:bg-paper-deep hover:text-ink"
            aria-label="Clear filters"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            tags
          </span>
          {tags.map(([t]) => {
            const active = t === activeTag;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(active ? null : t)}
                className="appearance-none"
                aria-pressed={active}
              >
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${
                    active
                      ? 'bg-ink text-paper'
                      : 'bg-paper-deep text-ink-muted hover:bg-paper-line'
                  }`}
                >
                  {t}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        {results.length} {results.length === 1 ? 'post' : 'posts'}
      </div>

      <ul className="divide-y divide-paper-line/60">
        {results.map((d) => (
          <li key={d.slug}>
            <Link href={d.url} className="group block py-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-medium leading-snug text-ink">
                  {d.title}
                </h3>
                <time className="hidden shrink-0 font-mono text-xs text-ink-faint sm:inline">
                  {formatDate(d.date)}
                </time>
              </div>
              {d.description && (
                <p className="mt-1 text-[14.5px] text-ink-muted">{d.description}</p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {d.tags.slice(0, 4).map((t) => (
                  <TagPill key={t} tag={t} asLink={false} />
                ))}
              </div>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="py-10 text-center text-ink-muted">
            no posts match. try fewer words.
          </li>
        )}
      </ul>
    </div>
  );
}
