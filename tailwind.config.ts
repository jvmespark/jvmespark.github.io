import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      fontFamily: {
        // Distinctive trio: variable serif display + geometric sans + JetBrains mono
        // Loaded via next/font in src/app/layout.tsx — exposed through CSS vars
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Light surfaces — warm cream paper
        paper: {
          DEFAULT: 'hsl(var(--paper))',
          deep: 'hsl(var(--paper-deep))',
          line: 'hsl(var(--paper-line))',
        },
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          soft: 'hsl(var(--ink-soft))',
          muted: 'hsl(var(--ink-muted))',
          faint: 'hsl(var(--ink-faint))',
        },
        // Pastel accent ramps
        sage: {
          50: '#F2F6EB',
          100: '#DCE6D0',
          200: '#BFCFAA',
          400: '#7E9560',
          600: '#4A5A38',
          800: '#2E3923',
        },
        peach: {
          50: '#FCF0E5',
          100: '#F5DDC8',
          200: '#EDC2A0',
          400: '#C8865A',
          600: '#7A4A28',
          800: '#4D2E18',
        },
        sky: {
          50: '#EEF2F8',
          100: '#D6DEEA',
          200: '#B5C2D6',
          400: '#6F84A8',
          600: '#3F4E66',
          800: '#262F3F',
        },
        rose: {
          50: '#F9EAEA',
          100: '#EFCFCE',
          200: '#E2A8A6',
          400: '#B66964',
          600: '#7A3A36',
          800: '#4D2422',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        sm: 'calc(var(--radius) - 2px)',
      },
      boxShadow: {
        soft: '0 1px 0 hsl(var(--paper-line)), 0 8px 24px -16px rgba(45, 42, 38, 0.18)',
        pop: '0 10px 30px -12px rgba(45, 42, 38, 0.25)',
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--ink-soft))',
            '--tw-prose-headings': 'hsl(var(--ink))',
            '--tw-prose-links': 'hsl(var(--ink))',
            '--tw-prose-bold': 'hsl(var(--ink))',
            '--tw-prose-counters': 'hsl(var(--ink-muted))',
            '--tw-prose-bullets': 'hsl(var(--ink-faint))',
            '--tw-prose-hr': 'hsl(var(--paper-line))',
            '--tw-prose-quotes': 'hsl(var(--ink))',
            '--tw-prose-quote-borders': theme('colors.peach.200'),
            '--tw-prose-captions': 'hsl(var(--ink-muted))',
            '--tw-prose-code': 'hsl(var(--ink))',
            '--tw-prose-pre-code': '#E6E1D6',
            '--tw-prose-pre-bg': '#1F1D19',
            '--tw-prose-th-borders': 'hsl(var(--paper-line))',
            '--tw-prose-td-borders': 'hsl(var(--paper-line))',
            maxWidth: '68ch',
            fontSize: '17px',
            lineHeight: '1.75',
          },
        },
      }),
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'wiggle': 'wiggle 600ms ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
