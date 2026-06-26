"use client";

import { cn } from "@/lib/utils";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { TiltCard } from "@/components/3d/TiltCard";
import type { Project } from "@/lib/types";

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <TiltCard tiltAmount={3}>
      <article
        className={cn(
          "flex flex-col gap-8 p-6 lg:p-10 bg-bg-card rounded-md border border-border/30",
          className
        )}
      >
        {/* Header with tag */}
        {project.tag && (
          <div>
            <ProjectTag>{project.tag}</ProjectTag>
          </div>
        )}

        {/* Title and description */}
        <div className="flex flex-col gap-3 lg:gap-4">
          <h3 className="font-body font-medium text-xl md:text-2xl lg:text-[32px] leading-[1.4] text-text-primary">
            {project.title}
          </h3>
          <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-text-secondary">
            {project.description}
          </p>
        </div>

        {/* Project info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-body font-semibold text-base leading-normal text-text-primary uppercase tracking-wide">
            Project Info
          </h4>
          <dl className="border-b border-border">
            {project.info.map((item) => (
              <div
                key={item.topic}
                className="flex items-center justify-between py-4 border-t border-border"
              >
                <dt className="font-body font-medium text-base leading-relaxed text-text-primary">
                  {item.topic}
                </dt>
                <dd className="font-body font-medium text-base leading-relaxed text-text-secondary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-start gap-6">
          {project.links.map((link) => (
            <LinkButton key={link.label} href={link.href} type={link.type}>
              {link.label}
            </LinkButton>
          ))}
          {project.repositories && project.repositories.length > 0 &&
            project.repositories.map((repo) => (
              <LinkButton key={repo.label} href={repo.href} type="github">
                {repo.label}
              </LinkButton>
            ))
          }
        </div>
      </article>
    </TiltCard>
  );
}
