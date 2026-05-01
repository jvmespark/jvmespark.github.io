import experienceData from '../../content/data/experience.json';
import educationData from '../../content/data/education.json';

export type Experience = {
  company: string;
  role: string;
  location?: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null for "present" */
  end: string | null;
  summary: string;
  tags?: string[];
  url?: string;
};

export type Education = {
  school: string;
  degree: string;
  location?: string;
  start: string;
  end: string | null;
  summary?: string;
  honors?: string[];
};

export function getExperience(): Experience[] {
  return (experienceData as Experience[]).slice().sort((a, b) =>
    monthKey(b.end ?? '9999-12').localeCompare(monthKey(a.end ?? '9999-12')),
  );
}

export function getEducation(): Education[] {
  return (educationData as Education[]).slice().sort((a, b) =>
    monthKey(b.end ?? '9999-12').localeCompare(monthKey(a.end ?? '9999-12')),
  );
}

function monthKey(ym: string): string {
  // Pad single-digit months: "2024-5" → "2024-05"
  const [y, m] = ym.split('-');
  return `${y}-${(m ?? '01').padStart(2, '0')}`;
}

/** "2024-08" → "Aug 2024" */
export function formatYearMonth(ym: string): string {
  const [yStr, mStr] = ym.split('-');
  const y = Number(yStr);
  const m = Number(mStr ?? '1');
  if (!Number.isFinite(y) || !Number.isFinite(m)) return ym;
  const date = new Date(Date.UTC(y, Math.max(0, m - 1), 1));
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "Aug 2024 – Present" or "Sep 2022 – May 2026" */
export function formatRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`;
}
