'use client';

import { useState } from 'react';
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

interface CoursesClientProps {
  coursesData: CoursesData;
}

export default function CoursesClient({ coursesData }: CoursesClientProps) {
  const [expandedInstitutions, setExpandedInstitutions] = useState<Set<string>>(
    new Set() // Start with all collapsed
  );

  const toggleInstitution = (institution: string) => {
    setExpandedInstitutions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(institution)) {
        newSet.delete(institution);
      } else {
        newSet.add(institution);
      }
      return newSet;
    });
  };

  return (
    <section>
      {Object.entries(coursesData).map(([institution, courses]) => {
        const isInstitutionExpanded = expandedInstitutions.has(institution);
        return (
          <div key={institution} className="mb-8">
            <div className="flex gap items-center mb-1 mt-6">
              <h2 className="heading2-expandable">{institution}</h2>
              <button
                onClick={() => toggleInstitution(institution)}
                className="p-2 text-redpurple-darkest hover:bg-blue/10 rounded-full w-9 h-9 transition-all duration-200 flex items-center justify-center"
                aria-expanded={isInstitutionExpanded}
                aria-label={isInstitutionExpanded ? `Collapse ${institution} courses` : `Expand ${institution} courses`}
              >
                <span className="relative inline-flex flex-col items-center justify-center h-4 w-4">
                  <i className={`fa-solid text-[0.7rem] leading-none font-redpurple transition-transform duration-300 ${isInstitutionExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                  <i className={`fa-solid text-[0.7rem] leading-none font-redpurple -mt-0.5 transition-transform duration-300 ${isInstitutionExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </span>
              </button>
            </div>
            {courses.map((course, idx) => (
              <CourseEntry key={idx} course={course} isExpanded={isInstitutionExpanded} />
            ))}
          </div>
        );
      })}
    </section>
  );
}
