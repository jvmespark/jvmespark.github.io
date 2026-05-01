import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatDate(input: string | Date, options?: Intl.DateTimeFormatOptions) {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(d);
}

export function formatDateLong(input: string | Date) {
  return formatDate(input, { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Stable deterministic hash → number in [0, 1) for a small, repeatable “sprinkle” */
export function hashFloat(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

/** Pick a deterministic accent color name from a string (post slug, tag, etc.) */
const ACCENT_KEYS = ['sage', 'peach', 'sky', 'rose'] as const;
export type AccentKey = (typeof ACCENT_KEYS)[number];

export function pickAccent(seed: string): AccentKey {
  const f = hashFloat(seed);
  return ACCENT_KEYS[Math.floor(f * ACCENT_KEYS.length)];
}
