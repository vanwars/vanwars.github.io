'use client';

import type { CoursesData } from '@/lib/courses';
import { useExpandedSet } from '@/hooks/useExpandedSet';
import CourseEntry from './CourseEntry';
import ExpandableSectionHeading from './ExpandableSectionHeading';

interface CoursesProps {
  coursesData: CoursesData;
}

export default function Courses({ coursesData }: CoursesProps) {
  const [expandedInstitutions, toggleInstitution] = useExpandedSet();

  return (
    <section>
      {Object.entries(coursesData).map(([institution, courses]) => {
        const isInstitutionExpanded = expandedInstitutions.has(institution);
        return (
          <div key={institution} className="mb-8">
            <div className="mt-6">
              <ExpandableSectionHeading
                title={institution}
                isExpanded={isInstitutionExpanded}
                onToggle={() => toggleInstitution(institution)}
                ariaLabelExpand={`Expand ${institution} courses`}
                ariaLabelCollapse={`Collapse ${institution} courses`}
              />
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
