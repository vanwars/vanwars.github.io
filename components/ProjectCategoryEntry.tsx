'use client';

import { useState, useEffect } from 'react';
import type { NamedLink } from '@/lib/projects';
import { ChevronDown, ChevronRight } from './Chevron';

interface ProjectCategoryEntryProps {
  title: string;
  items: NamedLink[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function ProjectCategoryEntry({ title, items, isExpanded: controlledIsExpanded, onToggle }: ProjectCategoryEntryProps) {
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
        <ul className="list-disc pl-5 mb-[10px] pr-0 md:pr-32">
          {items.map((item, idx) => (
            <li key={idx} className="text-[1rem] max-md:text-lg leading-[1.4em]">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
