'use client';

import { useState } from 'react';
import type { Publication } from '@/lib/publications';
import { useExpandedSet } from '@/hooks/useExpandedSet';
import ExpandableSectionHeading from './ExpandableSectionHeading';
import PublicationEntry from './PublicationEntry';

interface PublicationsProps {
  publications: Publication[];
  groupings: Record<string, string[]>;
}

export default function Publications({ publications, groupings }: PublicationsProps) {
    const {
        expanded: expandedGroups,
        toggle: toggleGroup,
        expandAll,
        collapseAll,
      } = useExpandedSet();
      const [isExpandedAll, isSetExpandedAll] = useState(false);
      const pubTitle = 'Scholarship';
    
      const handleToggle = () => {
        const newIsExpandedAll = !isExpandedAll;
        isSetExpandedAll(newIsExpandedAll);
        if (newIsExpandedAll) {
          expandAll(Object.keys(groupings));
        } else {
          collapseAll();
        }
      };
  return (
    <div className="pt-[60px]">
        <ExpandableSectionHeading
                    title={pubTitle}
                    isExpanded={isExpandedAll}
                    onToggle={() => handleToggle() }
                    ariaLabelExpand={`Expand ${pubTitle} courses`}
                    ariaLabelCollapse={`Collapse ${pubTitle} courses`}
                    headingLevel={1}
        />
    <section>
      {Object.entries(groupings).map(([groupName, types]) => {
        const pubs = publications
          .filter((pub) => types.includes(pub.type))
          .sort((a, b) => parseInt(b.year) - parseInt(a.year));
        const isGroupExpanded = expandedGroups.has(groupName);

        return (
          <div key={groupName} className="mb-10">
            <ExpandableSectionHeading
              title={groupName}
              isExpanded={isGroupExpanded}
              onToggle={() => toggleGroup(groupName)}
              ariaLabelExpand={`Expand ${groupName}`}
              ariaLabelCollapse={`Collapse ${groupName}`}
            />
            <ul className="m-0 p-0 mb-10">
              {pubs.map((pub) => (
                <li key={`${pub.year}-${pub.title}`} className="list-none">
                  <PublicationEntry
                    citation={{...pub}}
                    groupExpanded={isGroupExpanded}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
    </div>
  );
}
