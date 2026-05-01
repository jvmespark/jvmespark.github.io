'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : 'light';
  const next = current === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full',
        'border border-paper-line/60 bg-paper-deep/40 text-ink',
        'transition-colors hover:bg-paper-deep',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400/50',
        className,
      )}
    >
      <Sun
        size={16}
        className={cn(
          'transition-all duration-300',
          current === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0',
        )}
      />
      <Moon
        size={16}
        className={cn(
          'absolute transition-all duration-300',
          current === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90',
        )}
      />
    </button>
  );
}
