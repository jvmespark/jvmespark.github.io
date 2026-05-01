import type { ReactNode } from 'react';

export function Sidenote({ children }: { children: ReactNode }) {
  return (
    <span className="sidenote not-prose relative inline-block align-baseline">
      <span aria-hidden className="font-mono text-[11px] text-peach-600">[†]</span>
      <span
        className="
          ml-2 text-[14px] text-ink-muted
          lg:absolute lg:left-[calc(100%+1.5rem)] lg:top-0 lg:ml-0 lg:w-56 lg:text-[13px]
          lg:before:absolute lg:before:-left-3 lg:before:top-1.5 lg:before:h-px lg:before:w-2 lg:before:bg-paper-line
        "
      >
        {children}
      </span>
    </span>
  );
}
