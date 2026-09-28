'use client';

import { useState } from 'react';
import type { Project } from '@/lib/projects';
import { useExpandedSet } from '@/hooks/useExpandedSet';
import ProjectCategoryEntry from './ProjectCategoryEntry';
import ProjectNewsEntry from './ProjectNewsEntry';
import ProjectVideoEntry from './ProjectVideoEntry';
import ExpandableSectionHeading from './ExpandableSectionHeading';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const {
    expanded: expandedProjects,
    toggle: toggleProject,
    expandAll,
    collapseAll,
  } = useExpandedSet();
  const [isExpandedAll, isSetExpandedAll] = useState(false);
  const sectionTitle = 'Current Projects';

  const handleToggle = () => {
    const newIsExpandedAll = !isExpandedAll;
    isSetExpandedAll(newIsExpandedAll);
    if (newIsExpandedAll) {
      expandAll(projects.map((project) => project.id));
    } else {
      collapseAll();
    }
  };

  return (
    <div className="pt-[60px]" id="projects">
      <ExpandableSectionHeading
        title={sectionTitle}
        isExpanded={isExpandedAll}
        onToggle={() => handleToggle()}
        ariaLabelExpand={`Expand ${sectionTitle}`}
        ariaLabelCollapse={`Collapse ${sectionTitle}`}
        headingLevel={1}
      />
      <section>
        {projects.map((project) => {
          const isProjectExpanded = expandedProjects.has(project.id);
          return (
            <div key={project.id} className="mb-8">
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <ExpandableSectionHeading
                  title={project.title}
                  isExpanded={isProjectExpanded}
                  onToggle={() => toggleProject(project.id)}
                  ariaLabelExpand={`Expand ${project.title}`}
                  ariaLabelCollapse={`Collapse ${project.title}`}
                  // titleColorClassName="heading2-expandable-dark-blue"
                />
                <p className="m-0 text-base text-[#777] whitespace-nowrap max-md:hidden">{project.years}</p>
              </div>
              <p className="text-[1rem] max-md:text-lg leading-[1.4em] mb-2 pr-0 md:pr-32">{project.description}</p>
              <ProjectVideoEntry
                title="Video"
                video={project.video}
                isExpanded={isProjectExpanded}
              />
              <ProjectCategoryEntry
                title="Funding"
                items={project.funding ?? []}
                isExpanded={isProjectExpanded}
              />
              <ProjectCategoryEntry
                title="Papers"
                items={project.papers ?? []}
                isExpanded={isProjectExpanded}
              />
              <ProjectNewsEntry
                title={project.newsLabel ?? 'Articles'}
                items={project.news ?? []}
                isExpanded={isProjectExpanded}
              />
              <ProjectCategoryEntry
                title={project.partnersLabel ?? 'Partners & Collaborators'}
                items={project.partners ?? []}
                isExpanded={isProjectExpanded}
              />
              <ProjectCategoryEntry
                title={project.projectsLabel ?? 'Projects'}
                items={project.projects ?? []}
                isExpanded={isProjectExpanded}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}
