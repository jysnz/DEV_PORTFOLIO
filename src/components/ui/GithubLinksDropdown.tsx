"use client";

import { cn } from "@/lib/utils";
import { GitHubIcon } from "@/assets/icons";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import type { Repository } from "@/lib/types";

export interface GithubLinksDropdownProps {
  repositories: Repository[];
  className?: string;
}

export function GithubLinksDropdown({ repositories, className }: GithubLinksDropdownProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLDivElement>({
    radius: 8,
    withEmphasis: false,
  });

  return (
    <div className={cn("relative group/dropdown inline-block", className)}>
      {/* Trigger */}
      <button
        type="button"
        className="inline-flex flex-col gap-1 items-start focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        aria-haspopup="true"
      >
        <span className="inline-flex items-center gap-1 text-accent font-body font-bold text-base uppercase leading-normal">
          Github Links
          <GitHubIcon className="size-[26px] text-accent" />
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
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-[180px] opacity-0 invisible translate-x-1 transition-all duration-200 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-x-0">
        <div
          ref={containerRef}
          className={cn(
            "relative flex flex-col gap-1 p-3 bg-paper-card rounded-md border",
            ready ? "border-transparent" : "border-line/30"
          )}
        >
          <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} />

          {repositories.map((repo) => (
            <a
              key={repo.label}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-3 py-2 rounded-sm text-ink-muted font-body font-medium text-sm hover:text-accent hover:bg-bg-card transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <GitHubIcon className="size-4 shrink-0" />
              {repo.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
