import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { mdxOptions } from '@/lib/mdx-options';
import { mdxComponents } from '@/components/mdx-components';
import { Toc, extractToc } from '@/components/toc';
import { ReadingProgress } from '@/components/reading-progress';
import { SeriesNav } from '@/components/series-nav';
import { TagPill } from '@/components/tag-pill';
import { postMetadata } from '@/lib/seo';
import { formatDateLong } from '@/lib/utils';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not found' };
  return postMetadata(post);
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const toc = extractToc(post.body);

  return (
    <>
      <ReadingProgress />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article>
          <Link
            href="/posts"
            className="mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
          >
            <ArrowLeft size={12} />
            back to writing
          </Link>

          <header className="mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {post.frontmatter.draft && (
                <span className="rounded-full bg-rose-100 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-rose-600">
                  draft
                </span>
              )}
              <time
                dateTime={post.frontmatter.date}
                className="font-mono text-[11px] uppercase tracking-wider text-ink-faint"
              >
                {formatDateLong(post.frontmatter.date)}
              </time>
              <span className="font-mono text-[11px] text-ink-faint">·</span>
              <span className="font-mono text-[11px] text-ink-faint">
                {post.readingTime.text}
              </span>
            </div>
            <h1 className="font-display text-[2.2rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-[2.6rem]">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.description && (
              <p className="mt-4 font-display text-[1.15rem] italic text-ink-muted">
                {post.frontmatter.description}
              </p>
            )}
            {(post.frontmatter.tags ?? []).length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.frontmatter.tags!.map((t) => (
                  <TagPill key={t} tag={t} />
                ))}
              </div>
            )}
          </header>

          <div className="prose article-body">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MDXRemote
              source={post.body}
              components={mdxComponents}
              options={{ mdxOptions: mdxOptions as any }}
            />
          </div>

          <SeriesNav post={post} />

          <hr className="mt-16" />
          <footer className="mt-6 flex items-center justify-between text-sm text-ink-muted">
            <Link href="/posts" className="hover:text-ink">
              ← all writing
            </Link>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `"${post.frontmatter.title}"`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              share
            </a>
          </footer>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc items={toc} />
          </div>
        </aside>
      </div>
    </>
  );
}
