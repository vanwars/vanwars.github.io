'use client';

import { useState, useEffect } from 'react';
import type { NewsCitation } from '@/lib/projects';
import { ChevronDown, ChevronRight } from './Chevron';

interface ProjectNewsEntryProps {
  title: string;
  items: NewsCitation[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function ProjectNewsEntry({ title, items, isExpanded: controlledIsExpanded, onToggle }: ProjectNewsEntryProps) {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);

  useEffect(() => {
    if (controlledIsExpanded !== undefined) {
      setInternalIsExpanded(controlledIsExpanded);
    }
  }, [controlledIsExpanded]);

  const isExpanded = internalIsExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    setInternalIsExpanded(!internalIsExpanded);
  };

  if (items.length === 0) return null;

  return (
    <section className={`transition-all duration-300 ease-in-out px-2 pt-0 ${isExpanded ? 'rounded-lg pb-4 mb-6' : ''}`}>
      <button
        onClick={handleToggle}
        className={`text-left w-full transition-all duration-200 hover:bg-blue/5 hover:text-redpurple hover:rounded-md hover:px-2 hover:-mx-2 flex items-center py-1 -my-1 ${isExpanded ? 'mt-2' : ''}`}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Collapse ${title}` : `Expand ${title}`}
      >
        <h3 className={`text-base max-md:text-lg m-0 inline-flex items-center transition-all duration-300 ${isExpanded ? 'font-semibold mb-2' : 'font-normal mb-0'}`}>
          <span className="mr-2 flex items-center transition-transform duration-300">
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </span>
          {title}
        </h3>
      </button>
      <div
        className={`ml-2 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <ul className="m-0 p-0 mb-[10px] pr-0 md:pr-32">
          {items.map((item, idx) => (
            <li key={idx} className="list-none mb-3 last:mb-0">
              <p className="m-0 text-[1rem] max-md:text-lg leading-[1.4em]">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                ) : (
                  item.title
                )}
              </p>
              {(item.source || item.date) && (
                <p className="m-0 text-sm text-[#777]">
                  {[item.source, item.date].filter(Boolean).join(' • ')}
                </p>
              )}
              {item.embedUrl && (
                <div className="relative w-full mt-2 pr-0 md:pr-32" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={item.embedUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={item.title}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
