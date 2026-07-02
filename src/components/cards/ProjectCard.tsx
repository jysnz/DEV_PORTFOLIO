"use client";

import { cn } from "@/lib/utils";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { CrossHatchOverlay } from "@/components/sketch/CrossHatchOverlay";
import type { Project } from "@/lib/types";

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLElement>({
    radius: 12,
    withEmphasis: true,
  });

  return (
    <article
      ref={containerRef}
      className={cn(
        "group relative flex flex-col gap-8 p-6 lg:p-10 bg-paper-card rounded-md border",
        ready ? "border-transparent" : "border-line/30",
        className
      )}
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <CrossHatchOverlay />

      {/* Header with tag */}
      {project.tag && (
        <div className="relative">
          <ProjectTag>{project.tag}</ProjectTag>
        </div>
      )}

      {/* Title and description */}
      <div className="relative flex flex-col gap-3 lg:gap-4">
        <h3 className="font-body font-medium text-xl md:text-2xl lg:text-[32px] leading-[1.4] text-ink">
          {project.title}
        </h3>
        <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
          {project.description}
        </p>
      </div>

      {/* Project info */}
      <div className="relative flex flex-col gap-4">
        <h4 className="font-accent text-lg leading-normal text-ink uppercase tracking-wide">
          Project Info
        </h4>
        <dl className="border-b border-line">
          {project.info.map((item) => (
            <div
              key={item.topic}
              className="flex items-center justify-between py-4 border-t border-line"
            >
              <dt className="font-body font-medium text-base leading-relaxed text-ink">
                {item.topic}
              </dt>
              <dd className="font-body font-medium text-base leading-relaxed text-ink-muted">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Links */}
      <div className="relative flex flex-wrap items-start gap-6">
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
  );
}
