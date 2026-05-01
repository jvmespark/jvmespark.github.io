import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  // Dual themes — light + dark, switched via CSS data-attr
  theme: {
    light: 'github-light',
    dark: 'github-dark-dimmed',
  },
  keepBackground: false,
  defaultLang: { block: 'plaintext', inline: 'plaintext' },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid`
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = [...(node.properties.className ?? []), 'line-highlighted'];
  },
};

export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, prettyCodeOptions],
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: { className: ['heading-anchor'] },
      },
    ],
    rehypeKatex,
  ],
};
