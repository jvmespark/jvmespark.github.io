import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
        404 · not found
      </span>
      <h1 className="mt-3 font-display text-5xl font-medium text-ink">
        nothing here.
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
        the page you tried to load doesn't exist, was moved, or was never written. you can{' '}
        <Link href="/" className="underline decoration-peach-200 decoration-2 hover:decoration-peach-400">
          go home
        </Link>{' '}
        or{' '}
        <Link href="/posts" className="underline decoration-peach-200 decoration-2 hover:decoration-peach-400">
          read what i've written
        </Link>{' '}
        instead.
      </p>
    </div>
  );
}
