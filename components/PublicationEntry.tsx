'use client';

import { useState } from 'react';

interface PublicationEntryProps {
  year: string;
  title: string;
  citationHtml: string;
}

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

export default function PublicationEntry({
  year,
  title,
  citationHtml,
}: PublicationEntryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section
      className={`transition-all duration-300 ease-in-out px-2 pt-0 mb-4 ${isExpanded ? 'rounded-lg pb-4' : ''}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-left w-full transition-all duration-200 hover:bg-blue/5 hover:text-redpurple hover:rounded-md hover:px-2 hover:-mx-2 grid grid-cols-[1fr_80px] max-md:grid-cols-1 items-start py-1 -my-1"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse publication details' : 'Expand publication details'}
      >
        <h3
          className={`text-blue-600 text-base max-md:text-lg m-0 flex items-start gap-2 transition-all duration-300 ${
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
          <span className="pub-title">{title}</span>
        </h3>
        <p
          className={`m-0 text-base max-md:text-lg text-right transition-all duration-300 ${isExpanded ? 'font-semibold' : 'font-normal'}`}
        >
          {year}
        </p>
      </button>
      <div
        className={`ml-2 pl-4  overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <p
          className="text-[0.9rem] text-gray-700 line-height-[1.3rem]"
          dangerouslySetInnerHTML={{ __html: citationHtml }}
        />
      </div>
    </section>
  );
}
