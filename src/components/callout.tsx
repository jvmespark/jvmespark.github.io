import type { ReactNode } from 'react';
import { Info, Lightbulb, AlertTriangle, NotebookPen } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'info' | 'note' | 'warn' | 'idea';

const VARIANTS: Record<
  Variant,
  { icon: typeof Info; bg: string; border: string; text: string; label: string }
> = {
  info: {
    icon: Info,
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-600',
    label: 'note',
  },
  note: {
    icon: NotebookPen,
    bg: 'bg-sage-50',
    border: 'border-sage-100',
    text: 'text-sage-600',
    label: 'aside',
  },
  warn: {
    icon: AlertTriangle,
    bg: 'bg-peach-50',
    border: 'border-peach-100',
    text: 'text-peach-600',
    label: 'careful',
  },
  idea: {
    icon: Lightbulb,
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-600',
    label: 'idea',
  },
};

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const V = VARIANTS[variant];
  return (
    <aside
      className={cn(
        'not-prose my-6 flex gap-3 rounded-lg border p-4 text-[15px] leading-relaxed',
        V.bg,
        V.border,
      )}
    >
      <V.icon className={cn('mt-0.5 shrink-0', V.text)} size={18} />
      <div className="min-w-0">
        <div
          className={cn(
            'mb-1 font-mono text-[10px] uppercase tracking-widest',
            V.text,
          )}
        >
          {title ?? V.label}
        </div>
        <div className="text-ink-soft [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
