'use client';
import { useState } from 'react';
import type { CoursesData } from '@/lib/courses';
import { useExpandedSet } from '@/hooks/useExpandedSet';
import CourseEntry from './CourseEntry';
import ExpandableSectionHeading from './ExpandableSectionHeading';

interface CoursesProps {
  coursesData: CoursesData;
}

export default function Courses({ coursesData }: CoursesProps) {
  const {
    expanded: expandedInstitutions,
    toggle: toggleInstitution,
    expandAll,
    collapseAll,
  } = useExpandedSet();
  const [isExpandedAll, isSetExpandedAll] = useState(false);
  const pubTitle = 'Teaching & Course Design';

  const handleToggle = () => {
    const newIsExpandedAll = !isExpandedAll;
    isSetExpandedAll(newIsExpandedAll);
    if (newIsExpandedAll) {
      expandAll(Object.keys(coursesData));
    } else {
      collapseAll();
    }
  };
  return (
    <div className="pt-[60px]" id="teaching">
        <ExpandableSectionHeading
                    title={pubTitle}
                    isExpanded={isExpandedAll}
                    onToggle={() => handleToggle() }
                    ariaLabelExpand={`Expand ${pubTitle} courses`}
                    ariaLabelCollapse={`Collapse ${pubTitle} courses`}
                    headingLevel={1}
        />
        <section>
        {Object.entries(coursesData).map(([institution, courses]) => {
            // if the institution is in the dictionary, then it is expanded, otherwise it is collapsed:
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
    </div>
  );
}
