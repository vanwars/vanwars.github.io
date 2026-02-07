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
  const filePath = join(process.cwd(), 'data', 'courses.json');
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
    <section>
      {Object.entries(coursesData).map(([institution, courses]) => (
        <div key={institution}>
          <h2 className="font-condensed text-[1.8em] text-blue border-b border-blue font-medium pb-[3px] mt-0 mb-[10px]">{institution}</h2>
          {courses.map((course, idx) => (
            <section key={idx} className="grid grid-cols-[auto_100px] mb-[30px] max-md:block max-md:grid-cols-1">
              <section className="mb-[30px]">
                <h3 className="text-base font-semibold m-0">
                  {course.code ? `${course.code}: ${course.title}` : course.title}
                </h3>
                <div className="pl-[5px] ml-2 border-l border-redpurple mt-[3px]">
                  <p className="text-base leading-[1.4em] mb-[10px]">{course.description}</p>
                  <div className="[&_table_th:first-child]:min-w-[105px] [&_table_td:first-child]:min-w-[105px] [&_table_td]:m-0 [&_table_td]:pr-[10px] [&_table_td]:pl-0 [&_table_th]:m-0 [&_table_th]:pr-[10px] [&_table_th]:pl-0 [&_table_th]:font-medium [&_table_th]:text-left" dangerouslySetInnerHTML={{ __html: toTable(course.sessions) }} />
                </div>
              </section>
              <p className="font-semibold m-0 text-base text-right max-md:hidden">{course.years}</p>
            </section>
          ))}
        </div>
      ))}
    </section>
  );
}
