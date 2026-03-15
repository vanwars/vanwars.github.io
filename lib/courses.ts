import { readFileSync } from 'fs';
import { join } from 'path';

export interface Course {
  years: string;
  code?: string;
  title: string;
  description: string;
  sessions: Record<string, { period: string; url?: string; notes?: string }[]>;
}

export interface CoursesData {
  [key: string]: Course[];
}

export function getCourses(): CoursesData {
  const filePath = join(process.cwd(), 'data', 'courses.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
