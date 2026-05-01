export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'James',
  title: 'James — notes on systems',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Compiler engineer writing about the layer below the model.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'en-US',
  author: {
    name: 'James',
    role: 'Compiler & ML systems engineer',
    location: 'Troy, NY',
    email: 'hello@example.com',
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB || 'jamesdoe',
    twitter: process.env.NEXT_PUBLIC_TWITTER || '@jamesdoe',
    linkedin: 'jamesdoe',
  },
  nav: [
    { href: '/', label: 'home' },
    { href: '/posts', label: 'writing' },
  ] as const,
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
