import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import { CopyButton } from './copy-button';
import { Mermaid } from './mermaid';
import { Callout } from './callout';
import { Sidenote } from './sidenote';
import { Figure } from './figure';

export const mdxComponents: MDXComponents = {
  Callout,
  Sidenote,
  Mermaid,
  Figure,

  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return (
        <Link href={href} {...(props as Record<string, unknown>)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },

  // next/image-aware image when src is provided
  img: (props) => {
    const { src, alt = '', ...rest } = props as { src?: string; alt?: string };
    if (!src) return null;
    if (src.startsWith('http') || src.startsWith('//')) {
      // remote, fall back to native
      return <img src={src} alt={alt} {...rest} />;
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={680}
        className="rounded-md border border-paper-line"
        {...(rest as Partial<ImageProps>)}
      />
    );
  },

  // wrap pre with a copy-to-clipboard button (rehype-pretty-code already provides classes)
  pre: ({ children, ...props }) => {
    return (
      <div className="not-prose group relative my-7 overflow-hidden rounded-lg border border-paper-line">
        <CopyButton />
        <pre {...props} className="overflow-x-auto py-4 text-[13.5px]">
          {children}
        </pre>
      </div>
    );
  },
};
