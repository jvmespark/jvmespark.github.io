'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { TagPill } from './tag-pill';
import { cn } from '@/lib/utils';

const COLLAPSED_COUNT = 3;

export function ProjectsBlock({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > COLLAPSED_COUNT;
  const visible = expanded ? projects : projects.slice(0, COLLAPSED_COUNT);

  return (
    <div>
      <header
        id="projects"
        className="mb-4 flex scroll-mt-24 items-baseline justify-between border-b border-paper-line/60 pb-2"
      >
        <h2 className="font-display text-xl font-medium text-ink">selected projects</h2>
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="projects-grid"
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
          >
            {expanded ? 'show fewer' : `all projects (${projects.length})`}
            <ChevronDown
              size={12}
              className={cn(
                'transition-transform',
                expanded ? 'rotate-180' : 'rotate-0',
              )}
            />
          </button>
        )}
      </header>

      <div id="projects-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {hasMore && expanded && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              // scroll the projects header back into view so the user isn't lost
              document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-paper-line bg-paper-deep/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
          >
            <ChevronDown size={12} className="rotate-180" />
            collapse
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const href = p.link ?? p.repo;
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: '_blank', rel: 'noreferrer' as const } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col rounded-lg border border-paper-line bg-paper-deep/30 p-4 transition-colors hover:bg-paper-deep"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          {p.year} · {p.status}
        </span>
        {href && (
          <ArrowUpRight
            size={14}
            className="text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        )}
      </div>
      <h3 className="font-display text-lg font-medium text-ink">{p.title}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">{p.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {p.tags.slice(0, 3).map((t) => (
          <TagPill key={t} tag={t} asLink={false} />
        ))}
      </div>
    </Wrapper>
  );
}
