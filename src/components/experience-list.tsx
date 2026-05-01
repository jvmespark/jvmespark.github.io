import { ArrowUpRight } from 'lucide-react';
import { getExperience, formatRange } from '@/lib/profile';
import { TagPill } from './tag-pill';

export function ExperienceList() {
  const items = getExperience();
  return (
    <ol className="relative space-y-7 border-l border-paper-line/60 pl-6">
      {items.map((it, idx) => {
        const Wrapper = it.url ? 'a' : 'div';
        const wrapperProps = it.url
          ? { href: it.url, target: '_blank', rel: 'noreferrer' as const }
          : {};
        const present = it.end === null;
        return (
          <li key={`${it.company}-${idx}`} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-paper ${
                present ? 'bg-sage-400' : 'bg-paper-line'
              }`}
            />
            <Wrapper
              {...wrapperProps}
              className="group block"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-medium text-ink">
                  {it.role}
                  <span className="text-ink-muted"> · </span>
                  <span className="text-ink">
                    {it.company}
                    {it.url && (
                      <ArrowUpRight
                        size={12}
                        className="ml-1 inline-block -translate-y-0.5 text-ink-faint transition-transform group-hover:-translate-y-1 group-hover:translate-x-0.5"
                      />
                    )}
                  </span>
                </h3>
              </div>
              <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                {formatRange(it.start, it.end)}
                {it.location && <span> · {it.location}</span>}
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                {it.summary}
              </p>
              {it.tags && it.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <TagPill key={t} tag={t} asLink={false} />
                  ))}
                </div>
              )}
            </Wrapper>
          </li>
        );
      })}
    </ol>
  );
}
