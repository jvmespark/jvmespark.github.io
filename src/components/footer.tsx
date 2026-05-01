import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-paper-line/50 py-10 text-sm text-ink-muted">
      <div className="container max-w-3xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display italic">{siteConfig.name.toLowerCase()}</span>
          <span className="font-mono text-xs text-ink-faint">© {year}</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
          <Link href="/feed.xml" className="hover:text-ink">rss</Link>
          <Link href="/sitemap.xml" className="hover:text-ink">sitemap</Link>
          <a
            href={`https://github.com/${siteConfig.social.github}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            github
          </a>
          <a
            href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            twitter
          </a>
          <a href={`mailto:${siteConfig.author.email}`} className="hover:text-ink">
            email
          </a>
        </nav>
      </div>
    </footer>
  );
}
