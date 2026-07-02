"use client";

import { cn } from "@/lib/utils";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { CrossHatchOverlay } from "@/components/sketch/CrossHatchOverlay";
import type { Achievement } from "@/lib/types";

export interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLElement>({
    radius: 12,
    withEmphasis: true,
  });

  return (
    <article
      ref={containerRef}
      className={cn(
        "group relative flex flex-col gap-4 p-6 lg:p-8 rounded-md bg-paper-card border",
        ready ? "border-transparent" : "border-line/30"
      )}
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <CrossHatchOverlay />

      <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <h3 className="font-body font-medium text-lg lg:text-2xl leading-[1.3] text-ink">
          {achievement.title}
        </h3>
        <ProjectTag className="shrink-0 text-accent">{achievement.year}</ProjectTag>
      </div>
      <p className="relative font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
        {achievement.description}
      </p>
      {achievement.location && (
        <p className="relative font-body font-medium text-sm text-ink-muted/70 flex items-center gap-1.5">
          <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {achievement.location}
        </p>
      )}
    </article>
  );
}
