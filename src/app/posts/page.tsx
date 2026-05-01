import { buildSearchDocs } from '@/lib/search';
import { PostSearch } from '@/components/post-search';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'writing',
  description: 'essays, notes, and walkthroughs on compilers, gpus, and ml systems.',
  url: '/posts',
});

export default function PostsPage() {
  const docs = buildSearchDocs();

  if (docs.length === 0) {
    return (
      <div>
        <header className="mb-6">
          <h1 className="font-display text-3xl font-medium text-ink">writing</h1>
          <p className="mt-1 text-[15px] text-ink-muted">
            no posts yet. drop an <code className="font-mono text-[13px]">.mdx</code> file in{' '}
            <code className="font-mono text-[13px]">content/posts/</code> to start.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-medium text-ink">writing</h1>
        <p className="mt-1 text-[15px] text-ink-muted">
          {docs.length} {docs.length === 1 ? 'post' : 'posts'}.
        </p>
      </header>
      <PostSearch docs={docs} />
    </div>
  );
}
