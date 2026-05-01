import type { ReactNode } from 'react';

export function Figure({
  src,
  alt,
  caption,
  children,
}: {
  src?: string;
  alt?: string;
  caption?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <figure className="not-prose my-7">
      {children
        ? <div className="overflow-hidden rounded-lg border border-paper-line">{children}</div>
        : src && (
            <img
              src={src}
              alt={alt ?? ''}
              className="w-full rounded-lg border border-paper-line"
            />
          )}
      {caption && (
        <figcaption className="mt-2 text-center font-display italic text-[14px] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
