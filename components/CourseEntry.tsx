'use client';

import { useState } from 'react';

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

interface CourseEntryProps {
  course: Course;
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
  let html = '<table class="md:mr-32">';
  for (const key in sessions) {
    const currentSession = sessions[key];
    html += `<tr>
      <th class="text-left pr-4 font-semibold text-[1.0rem] min-w-[110px] w-24 align-top max-md:text-[1.125rem]">${key}</th>
      <td class="text-[1.0rem] max-md:text-[1.125rem]">${toLinks(currentSession)}</td>
    </tr>`;
  }
  html += '</table>';
  return html;
};

const ChevronRight = () => (
  <svg
    className="inline-block w-4 h-4 text-blue"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronDown = () => (
  <svg
    className="inline-block w-4 h-4 text-blue"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function CourseEntry({ course }: CourseEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={`transition-all duration-300 ease-in-out px-2 pt-0 ${isExpanded ? 'rounded-lg pb-4 mb-6' : ''}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-left w-full transition-all duration-200 hover:bg-blue/5 hover:text-redpurple hover:rounded-md hover:px-2 hover:-mx-2 grid grid-cols-[auto_100px] max-md:grid-cols-1 items-start py-1 -my-1"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse course details' : 'Expand course details'}
      >
        <h3 className={`text-base max-md:text-lg m-0 inline-flex items-center transition-all duration-300 ${isExpanded ? 'font-semibold' : 'font-normal'}`}>
          <span className={`mr-2 flex items-center transition-transform duration-300 ${isExpanded ? 'rotate-0' : ''}`}>
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </span>
          {course.code ? `${course.code}: ${course.title}` : course.title}
        </h3>
        <p className={`m-0 text-base max-md:text-lg text-right max-md:hidden transition-all duration-300 ${isExpanded ? 'font-semibold' : 'font-normal'}`}>{course.years}</p>
      </button>
      <div 
        className={`ml-2 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <p className="text-[1rem] max-md:text-lg leading-[1.4em] mb-[10px] pr-0 md:pr-32">{course.description}</p>
        <div className="teaching" dangerouslySetInnerHTML={{ __html: toTable(course.sessions) }} />
      </div>
    </section>
  );
}
