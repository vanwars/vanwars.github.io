import { readFileSync } from 'fs';
import { join } from 'path';
import CourseEntry from './CourseEntry';

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

  return (
    <section>
      {Object.entries(coursesData).map(([institution, courses]) => (
        <div key={institution} className="mb-8">
          <h2 className="heading2">{institution}</h2>
          {courses.map((course, idx) => (
            <CourseEntry key={idx} course={course} />
          ))}
        </div>
      ))}
    </section>
  );
}
