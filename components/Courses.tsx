import { readFileSync } from 'fs';
import { join } from 'path';

interface CourseSession {
  period: string;
  url?: string;
  notes?: string;
}

interface Course {
  years: string;
  code?: string;
  title: string;
  description: string;
  sessions: Record<string, CourseSession[]>;
}

interface CoursesData {
  [key: string]: Course[];
}

function getCourses(): CoursesData {
  const filePath = join(process.cwd(), 'public', 'data', 'courses.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

const toLinks = (courses: CourseSession[]) => {
  return courses.map((course) => {
    let html = '';
    if (course.url) {
      html += `<a href="${course.url}" target="_blank">${course.period}</a>`;
    } else {
      html += `<span>${course.period}</span>`;
    }
    html += course.notes ? ' ' + course.notes : '';
    return html;
  }).join(' &bull; ');
};

const toTable = (sessions: Record<string, CourseSession[]>) => {
  let html = '<table>';
  for (const key in sessions) {
    const currentSession = sessions[key];
    html += `<tr>
      <th>${key}</th>
      <td>${toLinks(currentSession)}</td>
    </tr>`;
  }
  html += '</table>';
  return html;
};

export default function Courses() {
  const coursesData = getCourses();

  return (
    <section className="teaching-section">
      {Object.entries(coursesData).map(([institution, courses]) => (
        <div key={institution}>
          <h2>{institution}</h2>
          {courses.map((course, idx) => (
            <section key={idx} className="teaching">
              <section className="details">
                <h3>
                  {course.code ? `${course.code}: ${course.title}` : course.title}
                </h3>
                <div className="courses">
                  <p>{course.description}</p>
                  <div dangerouslySetInnerHTML={{ __html: toTable(course.sessions) }} />
                </div>
              </section>
              <p className="years">{course.years}</p>
            </section>
          ))}
        </div>
      ))}
    </section>
  );
}
