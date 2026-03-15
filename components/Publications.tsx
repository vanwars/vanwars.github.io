'use client';

import type { Publication } from '@/lib/publications';
import { useExpandedSet } from '@/hooks/useExpandedSet';
import ExpandableSectionHeading from './ExpandableSectionHeading';
import PublicationEntry from './PublicationEntry';

interface PublicationsProps {
  publications: Publication[];
  groupings: Record<string, string[]>;
}

export default function Publications({ publications, groupings }: PublicationsProps) {
  const [expandedGroups, toggleGroup] = useExpandedSet();

  return (
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
                    year={pub.year}
                    title={pub.title}
                    citationAlternate={{
                      authors: pub.authors,
                      venue: pub.venue,
                      prefix: pub.prefix,
                      volume: pub.volume,
                      issue: pub.issue,
                      pages: pub.pages,
                      url: pub.url,
                      doi: pub.doi,
                    }}
                    groupExpanded={isGroupExpanded}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
