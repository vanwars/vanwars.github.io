import { readFileSync } from 'fs';
import { join } from 'path';

export interface NamedLink {
  label: string;
  url?: string;
}

export interface NewsCitation {
  title: string;
  date?: string;
  source?: string;
  url?: string;
  embedUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  years: string;
  description: string;
  video?: string;
  funding?: NamedLink[];
  papers?: NamedLink[];
  news?: NewsCitation[];
  newsLabel?: string;
  partners?: NamedLink[];
  partnersLabel?: string;
  projects?: NamedLink[];
  projectsLabel?: string;
}

export function getProjects(): Project[] {
  const filePath = join(process.cwd(), 'data', 'projects.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
