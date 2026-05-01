import { getEducation, formatRange } from '@/lib/profile';

export function EducationList() {
  const items = getEducation();
  return (
    <ol className="relative space-y-7 border-l border-paper-line/60 pl-6">
      {items.map((it, idx) => {
        const present = it.end === null;
        return (
          <li key={`${it.school}-${idx}`} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-paper ${
                present ? 'bg-peach-400' : 'bg-paper-line'
              }`}
            />
            <h3 className="font-display text-lg font-medium text-ink">
              {it.school}
            </h3>
            <div className="mt-0.5 font-display italic text-[15px] text-ink-muted">
              {it.degree}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              {formatRange(it.start, it.end)}
              {it.location && <span> · {it.location}</span>}
            </div>
            {it.summary && (
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                {it.summary}
              </p>
            )}
            {it.honors && it.honors.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[13px] text-ink-muted">
                {it.honors.map((h) => (
                  <li key={h} className="before:mr-2 before:text-ink-faint before:content-['·'] first:before:hidden first:before:mr-0">
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
