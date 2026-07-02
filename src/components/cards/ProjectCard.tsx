"use client";

import { cn } from "@/lib/utils";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { TiltCard } from "@/components/3d/TiltCard";
import { BorderGlow } from "@/components/ui/BorderGlow";
import type { Project } from "@/lib/types";

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <TiltCard tiltAmount={3} className="h-full">
      <BorderGlow
        className={cn("h-full backdrop-blur-[12px]", className)}
        innerClassName="flex flex-col gap-6 p-6 lg:p-8 h-full"
        backgroundColor="rgba(255, 255, 255, 0.03)"
        borderRadius={16}
        glowColor="258 60 85"
        colors={["#C3B1FF", "#9b7fff", "#7c3aed"]}
        glowIntensity={1.0}
        glowRadius={40}
        animated
      >
        {/* Header with tag */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-body font-semibold text-lg md:text-xl lg:text-2xl leading-[1.3] text-text-primary">
            {project.title}
          </h3>
          {project.tag && <ProjectTag>{project.tag}</ProjectTag>}
        </div>

        {/* Description */}
        <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary flex-1">
          {project.description}
        </p>

        {/* Project info */}
        <div className="flex flex-wrap gap-3">
          {project.info.map((item) => (
            <div
              key={item.topic}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
            >
              <span className="font-body font-medium text-xs text-text-secondary uppercase tracking-wide">
                {item.topic}:
              </span>
              <span className="font-body font-medium text-xs text-text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Links */}
        {(project.links.length > 0 || (project.repositories && project.repositories.length > 0)) && (
          <div className="flex flex-wrap items-start gap-2 pt-2 border-t border-white/[0.06] mt-auto">
            {project.links.map((link) => (
              <LinkButton key={link.label} href={link.href} type={link.type}>
                {link.label}
              </LinkButton>
            ))}
            {project.repositories?.map((repo) => (
              <LinkButton key={repo.label} href={repo.href} type="github">
                {repo.label}
              </LinkButton>
            ))}
          </div>
        )}
      </BorderGlow>
    </TiltCard>
  );
}
