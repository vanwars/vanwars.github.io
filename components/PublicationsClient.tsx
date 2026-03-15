'use client';

import { useState } from 'react';
import PublicationEntry from './PublicationEntry';

interface Publication {
  authors?: string;
  date: string;
  year: string;
  title: string;
  venue?: string;
  prefix?: string;
  volume?: number | string;
  issue?: string;
  pages?: string;
  type: string;
  url?: string;
  doi?: string;
  location?: string;
  chairs?: string;
  symposium_title?: string;
  editors?: string;
  book?: string;
}

interface PublicationsClientProps {
  publications: Publication[];
  groupings: Record<string, string[]>;
}

export default function PublicationsClient({ publications, groupings }: PublicationsClientProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupName)) next.delete(groupName);
      else next.add(groupName);
      return next;
    });
  };

  return (
    <section>
      {Object.entries(groupings).map(([groupName, types]) => {
        const pubs = publications
          .filter((pub) => types.includes(pub.type))
          .sort((a, b) => parseInt(b.year) - parseInt(a.year));
        const isGroupExpanded = expandedGroups.has(groupName);

        return (
          <div key={groupName} className="mb-10">
            <div className="flex gap-x-2 items-center mb-1">
              <h2 className="heading2-expandable">{groupName}</h2>
              <button
                onClick={() => toggleGroup(groupName)}
                className="p-2 text-redpurple-darkest hover:bg-blue/10 rounded-full w-9 h-9 transition-all duration-200 flex items-center justify-center"
                aria-expanded={isGroupExpanded}
                aria-label={isGroupExpanded ? `Collapse ${groupName}` : `Expand ${groupName}`}
              >
                <span className="relative inline-flex flex-col items-center justify-center h-4 w-4">
                  <i
                    className={`fa-solid text-[0.7rem] leading-none font-redpurple transition-transform duration-300 ${isGroupExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}
                  />
                  <i
                    className={`fa-solid text-[0.7rem] leading-none font-redpurple -mt-0.5 transition-transform duration-300 ${isGroupExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                  />
                </span>
              </button>
            </div>
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
