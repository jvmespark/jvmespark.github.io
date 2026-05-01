# jvmespark.github.io

A personal website built with Next.js 14, MDX, Tailwind, and D3.

```text
.
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx        # home
│   │   ├── posts/
│   │   ├── tags/
│   │   ├── series/
│   │   ├── projects/
│   │   ├── graph/          # interactive knowledge graph
│   │   ├── about/
│   │   ├── now/            # /now page
│   │   ├── feed.xml/       # atom feed (route handler)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   └── globals.css
│   ├── components/         # ui components
│   └── lib/                # data + utilities
├── content/
│   ├── posts/              # mdx posts (and series subfolders)
│   └── data/projects.json  # project list
├── public/                 # static assets
└── …
```

## quickstart

```bash
cp .env.example .env.local      # fill in URL, name, socials
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## scripts

```bash
npm run dev         # next dev
npm run build       # next build (static + dynamic routes)
npm run start       # next start (after build)
npm run typecheck   # tsc --noEmit — the real correctness gate
npm run lint        # disabled by default (see "linting" below)
```

### linting

This project ships **without `eslint-config-next`** by default. That dependency transitively pulls in `unrs-resolver`, a native-binding package whose postinstall is currently flaky on a number of platform/npm combinations. For a personal site, `tsc --noEmit` catches everything that matters; ESLint mostly enforces style.

If you want full Next.js linting back, run:

```bash
npm install --save-dev eslint@^8 eslint-config-next@^14.2.15
```

…then add `.eslintrc.json` with `{ "extends": ["next/core-web-vitals"] }` and update `npm run lint` in `package.json` back to `"next lint"`. If the `unrs-resolver` postinstall fails on your machine, the documented escape hatches are: `npm install --no-optional`, `npm install --ignore-scripts` (then run `npx napi-postinstall sharp` manually for image optimization), or switching to pnpm/yarn, which handle these failures more gracefully.

## writing a post

Drop a `.mdx` file in `content/posts/`. Frontmatter:

```mdx
---
title: "TITLE"
description: "DESCRIPTION"
date: "0000-00-00"
tags: ["TAG1", "TAG2"]
math: false                  # set true if the post has KaTeX
draft: false                 # drafts are visible in dev only
accent: "rose"               # optional: sage | peach | sky | rose
series:                      # optional, for multi-part essays
  slug: "SLUG"
  order: 1
  title: "TITLE"
---
```

### components available inside MDX

| component         | use                                                                |
| ----------------- | ------------------------------------------------------------------ |
| `<Callout>`       | `variant="info" \| "note" \| "warn" \| "idea"` boxed asides        |
| `<Sidenote>`      | Tufte-style margin notes (inline on small screens)                 |
| `<Mermaid>`       | client-rendered Mermaid diagrams: `<Mermaid chart={\`...\`} />`     |
| `<Figure>`        | image + caption wrapper                                            |
| <code>```py</code> | fenced code with Shiki syntax highlighting + copy button           |
| `$..$`, `$$..$$`  | inline / display math, rendered with KaTeX                         |

A series is just a tag on each post pointing at a shared `slug`. Posts in the same series get a "part of a series" sidebar with prev/next links, and they show up at `/series/<slug>` and `/series`.

### draft posts

`draft: true` hides a post from production but shows it in `next dev` so you can preview it. Drafts are tagged in card listings with a small `draft` pill.

## adding a project

Edit `content/data/projects.json`. Schema in `src/lib/projects.ts`.

## customising the look

Most visual choices live in two files:

- `tailwind.config.ts` — color ramps (sage, peach, sky, rose), fonts, prose tweaks.
- `src/app/globals.css` — design tokens (`--paper`, `--ink`, `--accent`), prose treatment, code-block CSS, KaTeX overrides.

Fonts are loaded with `next/font` in `src/app/layout.tsx`. Swap any of them by changing those imports — keep the CSS-variable names so the rest of the styling continues to work.

## SEO + feeds

- Sitemap at `/sitemap.xml` (`src/app/sitemap.ts`)
- Robots at `/robots.txt` (`src/app/robots.ts`)
- Atom feed at `/feed.xml` (`src/app/feed.xml/route.ts`)
- Per-post Open Graph images generated at build time via `src/app/posts/[slug]/opengraph-image.tsx`
- Site-wide OG image at `src/app/opengraph-image.tsx`

## search

Client-side fuzzy search using `fuse.js` over a build-time-derived index of every post (`src/lib/search.ts`). It runs entirely in the browser — no server, no analytics. Hit `/` on the keyboard to focus the input.

## the knowledge graph

`/graph` renders a force-directed graph using D3. Posts are sage-colored nodes; tags are pill-shaped nodes. Edges connect a post to each tag it carries, and to other posts in the same series. Drag, scroll, and click — clicking navigates.

## deploying

The natural deploy target is **Vercel**:

1. Push to GitHub.
2. Import the repo at vercel.com/new.
3. Set `NEXT_PUBLIC_SITE_URL` and (optionally) `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_GITHUB`, `NEXT_PUBLIC_TWITTER`, `NEXT_PUBLIC_SITE_DESCRIPTION` in the project settings.
4. Vercel handles the rest.

The included GitHub Action (`.github/workflows/ci.yml`) only does CI (lint + typecheck + build) — it doesn't deploy, because Vercel's own integration is better than anything we can write.

If you'd rather self-host, `npm run build && npm start` runs the production server. For static hosts, you can configure `output: 'export'` in `next.config.mjs`, but you'll lose dynamic OG image generation in the process because a static build can only render OG images at build time.