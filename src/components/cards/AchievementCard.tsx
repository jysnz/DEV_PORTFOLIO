"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { LocationGlobe } from "@/components/ui/LocationGlobe";
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
        "group relative flex flex-col gap-5 p-5 lg:p-6 rounded-md bg-paper-card border h-full",
        ready ? "border-transparent" : "border-line/30"
      )}
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <CrossHatchOverlay />

      {/* Image placeholder */}
      <div className="relative shrink-0 w-full h-[160px] rounded-md overflow-hidden bg-bg-card">
        {achievement.image_url ? (
          <Image
            src={achievement.image_url}
            alt={achievement.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="size-10 text-ink-muted/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.75 3.75 0 0 0 12.75 10.5h-1.5A3.75 3.75 0 0 0 7.5 14.25v4.5m9 0H7.5m4.5-12a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body font-medium text-base lg:text-lg leading-[1.3] text-ink">
            {achievement.title}
          </h3>
          <ProjectTag className="shrink-0 text-accent">{achievement.year}</ProjectTag>
        </div>
        <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-ink-muted">
          {achievement.description}
        </p>
        {achievement.location && achievement.latitude != null && achievement.longitude != null && (
          <div className="mt-auto">
            <LocationGlobe
              location={achievement.location}
              latitude={achievement.latitude}
              longitude={achievement.longitude}
            />
          </div>
        )}
        {achievement.location && (achievement.latitude == null || achievement.longitude == null) && (
          <p className="font-body font-medium text-sm text-ink-muted/70 flex items-center gap-1.5 mt-auto">
            <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {achievement.location}
          </p>
        )}
      </div>
    </article>
  );
}
