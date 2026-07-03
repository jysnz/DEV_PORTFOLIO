"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

export interface DescriptionExpandableProps {
  description: string;
  className?: string;
}

export function DescriptionExpandable({ description, className }: DescriptionExpandableProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLDivElement>({
    radius: 8,
    withEmphasis: false,
  });

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Truncated text */}
      <p
        ref={textRef}
        className="font-body font-normal text-sm lg:text-base leading-relaxed text-ink-muted line-clamp-3"
      >
        {description}
      </p>

      {/* "Read More" trigger with dropdown - same pattern as GithubLinksDropdown */}
      {isTruncated && (
        <div className="relative group/desc inline-block self-start">
          {/* Trigger */}
          <button
            type="button"
            className="inline-flex flex-col gap-1 items-start focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-haspopup="true"
          >
            <span className="inline-flex items-center gap-1 text-accent font-body font-bold text-sm uppercase leading-normal">
              Read More
              <svg
                className="size-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
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
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 w-[260px] opacity-0 invisible translate-x-1 transition-all duration-200 group-hover/desc:opacity-100 group-hover/desc:visible group-hover/desc:translate-x-0">
            <div
              ref={containerRef}
              className={cn(
                "relative p-4 bg-paper-card rounded-md border",
                ready ? "border-transparent" : "border-line/30"
              )}
            >
              <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} />
              <p className="relative font-body font-normal text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
