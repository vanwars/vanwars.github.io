import { readFileSync } from 'fs';
import { join } from 'path';
import CoursesClient from './CoursesClient';

interface Course {
  years: string;
  code?: string;
  title: string;
  description: string;
  sessions: Record<string, { period: string; url?: string; notes?: string }[]>;
}

interface CoursesData {
  [key: string]: Course[];
}

function getCourses(): CoursesData {
  const filePath = join(process.cwd(), 'data', 'courses.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default function Courses() {
  const coursesData = getCourses();

  return <CoursesClient coursesData={coursesData} />;
}
