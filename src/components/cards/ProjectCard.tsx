"use client";

import { cn } from "@/lib/utils";
import { BlurImage } from "@/components/ui/BlurImage";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { LinkButton } from "@/components/ui/LinkButton";
import { GithubLinksDropdown } from "@/components/ui/GithubLinksDropdown";
import { TechStackDropdown } from "@/components/ui/TechStackDropdown";
import { DescriptionExpandable } from "@/components/ui/DescriptionExpandable";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { CrossHatchOverlay } from "@/components/sketch/CrossHatchOverlay";
import type { Project } from "@/lib/types";

export interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({ project, priority = false, className }: ProjectCardProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLElement>({
    radius: 12,
    withEmphasis: true,
  });

  return (
    <article
      ref={containerRef}
      className={cn(
        "group relative flex flex-col gap-6 p-5 lg:p-6 bg-paper-card rounded-md border h-full",
        ready ? "border-transparent" : "border-line/30",
        className
      )}
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <CrossHatchOverlay />

      {/* Project image placeholder */}
      <div className="relative shrink-0 w-full h-[180px] lg:h-[200px] rounded-md overflow-hidden bg-bg-card">
        {project.image_url ? (
          <BlurImage
            src={project.image_url}
            alt={project.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            containerClassName="w-full h-full"
            priority={priority}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="size-12 text-ink-muted/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 0 3Z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-4 flex-1 min-w-0">
        {/* Header with tag */}
        {project.tag && (
          <div>
            <ProjectTag>{project.tag}</ProjectTag>
          </div>
        )}

        {/* Title and description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-body font-medium text-lg lg:text-xl leading-[1.4] text-ink">
            {project.title}
          </h3>
          <DescriptionExpandable description={project.description} />
        </div>

        {/* Project info */}
        <div className="flex flex-col gap-2">
          <dl className="border-b border-line">
            {project.info.map((item) => (
              <div
                key={item.topic}
                className="flex items-center justify-between py-2.5 border-t border-line"
              >
                <dt className="font-body font-medium text-sm leading-relaxed text-ink">
                  {item.topic}
                </dt>
                <dd className="font-body font-medium text-sm leading-relaxed text-ink-muted">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-start gap-4 mt-auto">
          {project.tech_stack && project.tech_stack.length > 0 && (
            <TechStackDropdown techStack={project.tech_stack} />
          )}
          {project.links.map((link) => (
            <LinkButton key={link.label} href={link.href} type={link.type}>
              {link.label}
            </LinkButton>
          ))}
          {project.repositories && project.repositories.length === 1 && (
            <LinkButton href={project.repositories[0].href} type="github">
              {project.repositories[0].label}
            </LinkButton>
          )}
          {project.repositories && project.repositories.length > 1 && (
            <GithubLinksDropdown repositories={project.repositories} />
          )}
        </div>
      </div>
    </article>
  );
}
