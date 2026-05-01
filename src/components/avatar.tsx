import { cn } from '@/lib/utils';

/**
 * Drop a square `profile.jpg` (or .png/.webp) into /public to override the SVG placeholder.
 * Update the `src` here if you change the filename.
 */
export function Avatar({
  size = 96,
  className,
  alt = 'Profile photo',
  src = '/profile.svg',
}: {
  size?: number;
  className?: string;
  alt?: string;
  src?: string;
}) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full ring-1 ring-paper-line/80',
        'bg-paper-deep shadow-soft',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
