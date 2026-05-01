import projectsData from '../../content/data/projects.json';

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  status: 'shipped' | 'building' | 'archived' | 'paused';
  tags: string[];
  link?: string;
  repo?: string;
  /** override accent color */
  accent?: 'sage' | 'peach' | 'sky' | 'rose';
};

export function getAllProjects(): Project[] {
  return (projectsData as Project[]).slice().sort((a, b) =>
    b.year.localeCompare(a.year) || a.title.localeCompare(b.title),
  );
}
