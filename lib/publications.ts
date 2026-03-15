import { readFileSync } from 'fs';
import { join } from 'path';

export interface Publication {
  authors?: string;
  date: string;
  year: string;
  title: string;
  venue?: string;
  prefix?: string;
  volume?: number | string;
  issue?: string;
  pages?: string;
  type: string;
  url?: string;
  doi?: string;
  location?: string;
  chairs?: string;
  symposium_title?: string;
  editors?: string;
  book?: string;
}

export function getPublications(): Publication[] {
  const filePath = join(process.cwd(), 'data', 'pubs.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export const PUBLICATION_GROUPINGS: Record<string, string[]> = {
  'Peer-Reviewed Journal Articles & Conference Proceedings': ['journal', 'conference'],
  'Peer-Reviewed Workshop Papers & Posters': ['workshop', 'symposium', 'poster'],
  'Other Publications': ['book chapter', 'magazine', 'dissertation'],
};
