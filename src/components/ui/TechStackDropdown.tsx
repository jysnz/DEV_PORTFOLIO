"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import type { ProjectTechItem } from "@/lib/types";

export interface TechStackDropdownProps {
  techStack: ProjectTechItem[];
  className?: string;
}

export function TechStackDropdown({ techStack, className }: TechStackDropdownProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLDivElement>({
    radius: 8,
    withEmphasis: false,
  });

  return (
    <div className={cn("relative group/techstack inline-block", className)}>
      {/* Trigger */}
      <button
        type="button"
        className="inline-flex flex-col gap-1 items-start focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        aria-haspopup="true"
      >
        <span className="inline-flex items-center gap-1 text-accent font-body font-bold text-base uppercase leading-normal">
          Tech Stack
          <svg
            className="size-5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0 4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25"
            />
          </svg>
        </span>
        <svg
          className="w-full h-2 text-accent"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M1,4 Q10,1 20,4 T40,4 T60,4 T80,4 T99,4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            pathLength={100}
            className="sketch-underline-path"
          />
        </svg>
      </button>

      {/* Dropdown - appears to the right */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-[220px] max-w-[280px] opacity-0 invisible translate-x-1 transition-all duration-200 group-hover/techstack:opacity-100 group-hover/techstack:visible group-hover/techstack:translate-x-0">
        <div
          ref={containerRef}
          className={cn(
            "relative flex flex-wrap gap-2 p-4 bg-paper-card rounded-md border",
            ready ? "border-transparent" : "border-line/30"
          )}
        >
          <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} />

          {techStack.map((tech) => (
            <span
              key={tech.name}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body font-medium text-ink-muted border border-line rounded-full transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {tech.icon_url ? (
                <Image
                  src={tech.icon_url}
                  alt={tech.name}
                  width={14}
                  height={14}
                  className="size-3.5 shrink-0"
                  unoptimized
                />
              ) : (
                <svg
                  className="size-3.5 shrink-0 text-ink-muted/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              )}
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
