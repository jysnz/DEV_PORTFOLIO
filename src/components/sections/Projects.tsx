"use client";

import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { AnimateIn } from "@/components/3d/AnimateIn";
import type { Project } from "@/lib/types";

export interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section id="projects" ariaLabel="Featured Projects">
      <div className="flex flex-col gap-12 lg:gap-16">
        <AnimateIn>
          <div className="flex flex-col gap-3 max-w-[600px]">
            <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-gradient">
              Featured Projects
            </h2>
            <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
              Here are some of the selected projects that showcase my passion for
              software development.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 100} direction="up">
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
