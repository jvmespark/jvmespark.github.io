import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import { siteConfig } from '@/lib/config';
import { buildGraphData } from '@/lib/graph';
import { PostCard } from '@/components/post-card';
import { Avatar } from '@/components/avatar';
import { ExperienceList } from '@/components/experience-list';
import { EducationList } from '@/components/education-list';
import { KnowledgeGraph } from '@/components/knowledge-graph';
import { ProjectsBlock } from '@/components/projects-block';
import { formatDate } from '@/lib/utils';

/** Anchor heading used by every block — keeps the rhythm consistent. */
function BlockHeader({
  id,
  title,
  href,
  hrefLabel,
}: {
  id: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <header
      id={id}
      className="mb-4 flex scroll-mt-24 items-baseline justify-between border-b border-paper-line/60 pb-2"
    >
      <h2 className="font-display text-xl font-medium text-ink">{title}</h2>
      {href && (
        <Link
          href={href}
          className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
        >
          {hrefLabel ?? 'more →'}
        </Link>
      )}
    </header>
  );
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);
  const allProjects = getAllProjects();
  const lastPost = posts[0];
  const graph = buildGraphData();

  return (
    <div className="space-y-16">
      {/* hero — avatar + name + intro */}
      <section className="animate-fade-up">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar size={104} />
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-400 motion-safe:animate-pulse" />
              {siteConfig.author.location} · writing in public
            </div>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-[2.9rem]">
              hi, i'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10">
                  {siteConfig.author.name.toLowerCase()}.
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-3 -rotate-1 rounded-md bg-peach-100"
                />
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              {siteConfig.author.role.toLowerCase()} · {siteConfig.author.location.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            read the writing
            <ArrowUpRight size={14} />
          </Link>
          <a
            href={`https://github.com/${siteConfig.social.github}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-deep/40 px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
            aria-label="GitHub"
          >
            <Github size={14} /> github
          </a>
          <a
            href={`https://linkedin.com/in/${siteConfig.social.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-deep/40 px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} /> linkedin
          </a>
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-deep/40 px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
            aria-label="Email"
          >
            <Mail size={14} /> email
          </a>
        </div>
      </section>

      {/* about */}
      <section>
        <BlockHeader id="about" title="about" />
        <div className="space-y-4 text-[16.5px] leading-relaxed text-ink-soft">
          <p>
            i work on compilers, gpu kernels, and the things that make models go fast. these are
            notes from the layer below the model — sometimes essays, sometimes diagrams,
            occasionally a kernel walkthrough.
          </p>
          <p>
            most of my time goes to a small mlir-based compiler, side projects in
            jax/pallas, and reading more of the llvm tree than is probably healthy. i write here
            to think more clearly; the audience is mostly future-me.
          </p>
          <p>
            outside the terminal i'm usually walking, reading, or quietly losing at chess. if any
            of that resonates, you can{' '}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-ink underline decoration-peach-200 decoration-2 underline-offset-2 hover:decoration-peach-400"
            >
              say hi
            </a>
            .
          </p>
        </div>
      </section>

      {/* experience */}
      <section>
        <BlockHeader id="experience" title="experience" />
        <ExperienceList />
      </section>

      {/* education */}
      <section>
        <BlockHeader id="education" title="education" />
        <EducationList />
      </section>

      {/* writing */}
      <section>
        <BlockHeader id="writing" title="recent writing" href="/posts" hrefLabel="all posts →" />
        {posts.length === 0 ? (
          <p className="py-4 text-[15px] italic text-ink-muted">
            nothing here yet — the first post is coming soon.
          </p>
        ) : (
          <div className="divide-y divide-paper-line/60">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>

      {/* projects */}
      <section>
        <ProjectsBlock projects={allProjects} />
      </section>

      {/* graph — appears once you have posts */}
      {graph.nodes.length > 0 && (
        <section>
          <BlockHeader id="graph" title="the graph" />
          <p className="mb-4 text-[15px] text-ink-muted">
            posts and the tags that connect them. drag the nodes around — they'll settle.
          </p>
          <div className="rounded-lg border border-paper-line bg-paper-deep/30 p-2">
            <KnowledgeGraph data={graph} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-sage-400" /> post
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded-sm border border-paper-line bg-paper-deep" />{' '}
              tag
            </span>
            <span>
              · {graph.nodes.length} nodes · {graph.links.length} edges
            </span>
          </div>
        </section>
      )}

      {/* now strip */}
      <section className="rounded-lg border border-paper-line bg-paper-deep/30 p-5">
        <div className="flex items-baseline justify-between">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            currently
          </div>
          <Link
            href="/now"
            className="font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
          >
            /now →
          </Link>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink">
          reading kernels in <span className="font-mono">jax/pallas</span>, sketching a small{' '}
          <span className="font-mono">mlir</span> dialect, and slowly working through an{' '}
          <em className="font-display">undergraduate</em> microeconomics text.
        </p>
        {lastPost && (
          <p className="mt-3 font-mono text-[11px] text-ink-faint">
            last post: {formatDate(lastPost.frontmatter.date)} —{' '}
            <Link href={lastPost.url} className="hover:text-ink">
              {lastPost.frontmatter.title}
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
