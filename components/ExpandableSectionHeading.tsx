'use client';

interface ExpandableSectionHeadingProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  ariaLabelExpand?: string;
  ariaLabelCollapse?: string;
}

export default function ExpandableSectionHeading({
  title,
  isExpanded,
  onToggle,
  ariaLabelExpand = `Expand ${title}`,
  ariaLabelCollapse = `Collapse ${title}`,
}: ExpandableSectionHeadingProps) {
  return (
    <div className="flex gap-x-2 items-center mb-1">
      <h2 className="heading2-expandable">{title}</h2>
      <button
        onClick={onToggle}
        className="p-2 text-redpurple-darkest hover:bg-blue/10 rounded-full w-9 h-9 transition-all duration-200 flex items-center justify-center"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? ariaLabelCollapse : ariaLabelExpand}
      >
        <span className="relative inline-flex flex-col items-center justify-center h-4 w-4">
          <i
            className={`fa-solid text-[0.7rem] leading-none font-redpurple transition-transform duration-300 ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}
          />
          <i
            className={`fa-solid text-[0.7rem] leading-none font-redpurple -mt-0.5 transition-transform duration-300 ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}
          />
        </span>
      </button>
    </div>
  );
}
