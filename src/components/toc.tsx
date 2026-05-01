'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type TocItem = { id: string; text: string; depth: number };

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-[13px] leading-relaxed">
      <h4 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
        On this page
      </h4>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it.id} style={{ paddingLeft: `${(it.depth - 2) * 12}px` }}>
            <a
              href={`#${it.id}`}
              className={cn(
                'block border-l border-paper-line pl-3 transition-colors',
                active === it.id
                  ? 'border-sage-400 text-ink'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Walk a markdown body and yield {text, depth} for h2/h3 headings. */
export function extractToc(body: string): TocItem[] {
  const lines = body.split('\n');
  const out: TocItem[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    const text = m[2].replace(/[`*_]/g, '');
    const id = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    out.push({ id, text, depth });
  }
  return out;
}
