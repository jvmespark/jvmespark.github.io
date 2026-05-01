'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async (e) => {
        const wrapper = (e.currentTarget.parentElement as HTMLElement) ?? null;
        const code = wrapper?.querySelector('pre code')?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      aria-label="Copy code"
      className="absolute right-2 top-2 z-10 rounded-md border border-paper-line/70 bg-paper/85 p-1.5 text-ink-muted opacity-0 backdrop-blur transition-opacity hover:bg-paper hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
    >
      {copied ? <Check size={14} className="text-sage-400" /> : <Copy size={14} />}
    </button>
  );
}
