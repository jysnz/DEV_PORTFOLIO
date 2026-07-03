import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project } from "@/lib/types";

export interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section id="projects" divider ariaLabel="Featured Projects">
      <div className="flex flex-col gap-16 lg:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-[600px] items-center text-center mx-auto">
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink">
            Featured Projects
          </h2>
          <p className="font-body font-normal text-base lg:text-lg leading-normal text-ink-muted">
            Here are some of the selected projects that showcase my passion for
            software development.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
