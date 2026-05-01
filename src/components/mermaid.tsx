'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod = await import('mermaid');
        const mermaid = mod.default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
          fontFamily: 'var(--font-sans), ui-sans-serif, sans-serif',
          themeVariables: {
            primaryColor: '#FBF5EC',
            primaryTextColor: '#2D2A26',
            primaryBorderColor: '#DDD3C0',
            lineColor: '#A8A39A',
            secondaryColor: '#DCE6D0',
            tertiaryColor: '#F5DDC8',
            background: 'transparent',
          },
        });
        const { svg: rendered } = await mermaid.render(`mmd-${id}`, chart.trim());
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'mermaid render failed');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  return (
    <figure className="not-prose my-7 overflow-hidden rounded-lg border border-paper-line bg-paper-deep/30 p-4">
      {error ? (
        <pre className="text-xs text-rose-600">{error}</pre>
      ) : svg ? (
        <div
          ref={ref}
          className="mermaid-container [&_svg]:mx-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex h-32 items-center justify-center text-xs text-ink-faint">
          rendering…
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-center font-display italic text-[14px] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
