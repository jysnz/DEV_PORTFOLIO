import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section id="projects" divider ariaLabel="Featured Projects">
      <div className="flex flex-col gap-16 lg:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-[600px]">
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-text-primary">
            Featured Projects
          </h2>
          <p className="font-body font-normal text-base lg:text-lg leading-normal text-text-secondary">
            Here are some of the selected projects that showcase my passion for
            software development.
          </p>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-10 lg:gap-16">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
