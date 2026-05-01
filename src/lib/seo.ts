import type { Metadata } from 'next';
import { siteConfig } from './config';
import type { Post } from './posts';

export function buildMetadata({
  title,
  description,
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const desc = description ?? siteConfig.description;
  const ogImage = image ?? `${siteConfig.url}/opengraph-image`;

  return {
    title: title ?? siteConfig.title,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: fullUrl },
    openGraph: {
      type,
      url: fullUrl,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? siteConfig.name }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
      ...(type === 'article' && tags ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      creator: siteConfig.social.twitter,
      images: [ogImage],
    },
  };
}

export function postMetadata(post: Post): Metadata {
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: post.url,
    image: `${siteConfig.url}${post.url}/opengraph-image`,
    type: 'article',
    publishedTime: new Date(post.frontmatter.date).toISOString(),
    modifiedTime: post.frontmatter.updated
      ? new Date(post.frontmatter.updated).toISOString()
      : undefined,
    tags: post.frontmatter.tags,
  });
}
