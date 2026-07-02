"use client";

import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { AnimateIn } from "@/components/3d/AnimateIn";
import { SplitText } from "@/components/ui/SplitText";
import type { Project } from "@/lib/types";

export interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section id="projects" ariaLabel="Featured Projects">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-3 max-w-[600px]">
          <h2
            aria-label="Featured Projects"
            className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none"
          >
            <SplitText text="Featured Projects" trigger="scroll" stagger={22} />
          </h2>
          <AnimateIn delay={200}>
            <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
              Here are some of the selected projects that showcase my passion for
              software development.
            </p>
          </AnimateIn>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {projects.map((project, i) => (
              <AnimateIn key={project.title} delay={i * 100} direction="up" blur duration={800}>
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>
        ) : (
          <AnimateIn>
            <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl glass">
              <div className="flex items-center justify-center size-12 rounded-full bg-accent/10">
                <svg className="size-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-13.5 4.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <p className="font-body font-semibold text-base text-text-primary">
                Projects are on the way
              </p>
              <p className="font-body text-sm text-text-secondary max-w-[360px]">
                I&apos;m currently updating this section with new work. Check back soon.
              </p>
            </div>
          </AnimateIn>
        )}
      </div>
    </Section>
  );
}
