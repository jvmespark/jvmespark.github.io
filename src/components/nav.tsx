'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 w-full border-b border-paper-line/50 bg-paper/80 backdrop-blur-md">
      <div className="container flex h-14 max-w-3xl items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-base font-medium text-ink"
          aria-label="Home"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-sage-400 transition-transform group-hover:rotate-45 group-hover:bg-peach-400"
          />
          <span className="lowercase">{siteConfig.name.toLowerCase()}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {siteConfig.nav.map((item) => {
            const isHashLink = item.href.includes('#');
            const active = isHashLink
              ? false // hash links never show as "active" in the nav — they're jumps, not pages
              : item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  active
                    ? 'bg-paper-deep text-ink'
                    : 'text-ink-muted hover:text-ink hover:bg-paper-deep/60',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle className="ml-1" />
        </nav>
      </div>
    </header>
  );
}
