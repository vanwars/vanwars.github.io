'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from './Chevron';

interface CitationData {
  authors?: string;
  venue?: string;
  prefix?: string;
  volume?: number | string;
  issue?: string;
  pages?: string;
  url?: string;
  doi?: string;
  year?: string;
  title?: string;
}

interface PublicationEntryProps {
  citation: CitationData;
  groupExpanded?: boolean;
}

function buildCitationHtmlAlternate(citation: CitationData) {
  const { authors, venue, prefix, volume, issue, pages, url, doi } = citation;
  const linkHref = url || (doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : undefined);
  const linkText = doi || "link";
  const venuePart = venue ? `${venue}` : '';
  const volumePart = volume ? ` ${volume}` : '';
  const issuePart = issue ? ` (${issue})` : '';
  const pagesPart = pages ? `, ${pages}` : '';
  const venueText = [prefix ? `${prefix} ` : '', venuePart, volumePart, issuePart, pagesPart]
    .filter((part) => part)
    .join('');
  return (
    <div className="mb-2 pr-4">
      {/* Authors and venue */}
      <div
        className="mt-1 gap-y-1 text-base grid grid-cols-[1fr_60px] gap-x-8 text-[0.9rem] leading-4"
        style={{ color: '#777' }}
      >
        <div className="flex flex-col gap-y-1">
          {authors && <div>{authors}</div>}
          {venueText && <div>{venueText}</div>}
          {linkHref && linkText && (
            <div>
              <a href={linkHref} target="_blank" rel="noopener noreferrer">
                {linkText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PublicationEntry({
  citation,
  groupExpanded,
}: PublicationEntryProps) {
  const [entryCollapsed, setEntryCollapsed] = useState(false);
  const [entryExpanded, setEntryExpanded] = useState(false);

  useEffect(() => {
    if (groupExpanded === undefined) return;
    if (groupExpanded) {
      setEntryExpanded(false);
    } else {
      setEntryCollapsed(false);
    }
  }, [groupExpanded]);

  const isExpanded =
    groupExpanded === false ? entryExpanded : !entryCollapsed;

  const handleToggle = () => {
    if (groupExpanded === false) {
      setEntryExpanded((e) => !e);
    } else {
      setEntryCollapsed((c) => !c);
    }
  };

  return (
    <section
      className={`transition-all duration-300 ease-in-out px-2 pt-0 mb-2 ${isExpanded ? 'pt-2' : ''}`}
    >
      <button
        onClick={handleToggle}
        className="text-left w-full transition-all duration-200 hover:text-redpurple hover:px-2 hover:-mx-2 grid grid-cols-[1fr_80px] items-start py-1 -my-1"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse publication details' : 'Expand publication details'}
      >
        <h3
          className={`text-base max-md:text-lg m-0 min-w-0 flex items-start gap-2 transition-all duration-300 ${
            isExpanded ? 'font-normal' : 'font-normal'
          }`}
        >
          <span
            className={`flex items-start transition-transform duration-300 shrink-0 mt-[2px] ${
              isExpanded ? 'rotate-0' : ''
            }`}
          >
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </span>
          <span className="pub-title">{citation.title}</span>
        </h3>
        <p
          className={`m-0 text-base max-md:text-lg text-right transition-all duration-300 ${isExpanded ? 'font-semibold' : 'font-normal'}`}
        >
          {citation.year}
        </p>
      </button>
      <div
        className={`ml-2 pl-4  overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        {buildCitationHtmlAlternate(citation)}
      </div>
    </section>
  );
}
