import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'Post cover';

export default function OG({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const title = post?.frontmatter.title ?? siteConfig.title;
  const description = post?.frontmatter.description ?? '';
  const date = post?.frontmatter.date
    ? new Date(post.frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  const tags = (post?.frontmatter.tags ?? []).slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#FBF5EC',
          color: '#2D2A26',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{ width: 14, height: 14, borderRadius: 999, background: '#7E9560' }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#756E66',
            }}
          >
            {siteConfig.name.toLowerCase()}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1
            style={{
              fontSize: title.length > 60 ? 64 : 80,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 500,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                marginTop: 24,
                fontSize: 28,
                fontStyle: 'italic',
                color: '#4A453F',
                maxWidth: 900,
                lineHeight: 1.35,
              }}
            >
              {description}
            </p>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            fontFamily: 'monospace',
            color: '#756E66',
          }}
        >
          <span>{date}</span>
          <span style={{ display: 'flex', gap: 12 }}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  background: '#DCE6D0',
                  color: '#4A5A38',
                  padding: '6px 16px',
                  borderRadius: 999,
                  fontSize: 16,
                }}
              >
                {t}
              </span>
            ))}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
