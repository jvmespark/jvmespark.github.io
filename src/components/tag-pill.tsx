import Link from 'next/link';
import { cn, pickAccent, type AccentKey } from '@/lib/utils';

const ACCENT_CLASSES: Record<AccentKey, string> = {
  sage: 'bg-sage-100 text-sage-600 hover:bg-sage-200/80',
  peach: 'bg-peach-100 text-peach-600 hover:bg-peach-200/70',
  sky: 'bg-sky-100 text-sky-600 hover:bg-sky-200/70',
  rose: 'bg-rose-100 text-rose-600 hover:bg-rose-200/70',
};

export function TagPill({
  tag,
  accent,
  asLink = true,
  size = 'sm',
}: {
  tag: string;
  accent?: AccentKey;
  asLink?: boolean;
  size?: 'sm' | 'md';
}) {
  const a = accent ?? pickAccent(tag);
  const classes = cn(
    'inline-flex items-center rounded-full font-medium tracking-tight transition-colors',
    size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
    ACCENT_CLASSES[a],
  );
  if (!asLink) return <span className={classes}>{tag}</span>;
  return (
    <Link href={`/tags/${encodeURIComponent(tag)}`} className={classes}>
      {tag}
    </Link>
  );
}
