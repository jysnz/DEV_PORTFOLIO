"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

export interface DescriptionExpandableProps {
  description: string;
  className?: string;
}

export function DescriptionExpandable({ description, className }: DescriptionExpandableProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { containerRef, svgRef, emphasisSvgRef, ready, redraw } = useRoughShape<HTMLDivElement>({
    radius: 8,
    withEmphasis: true,
  });

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  // Close dropdown when clicking outside (for mobile tap-to-open)
  useEffect(() => {
    if (!isOpen) return;

    // Redraw sketch border when pane becomes visible (ResizeObserver won't
    // fire because visibility:hidden preserves layout dimensions)
    redraw();

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, redraw]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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
        <div ref={dropdownRef} className="relative group/desc inline-block self-start">
          {/* Trigger */}
          <button
            type="button"
            className="inline-flex flex-col gap-1 items-start focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={handleToggle}
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

          {/* Dropdown - appears to the right on desktop, below on mobile */}
          <div
            className={cn(
              "z-50 transition-all duration-200",
              // Mobile: position below the button
              "absolute left-0 top-full mt-2 w-[260px] lg:left-full lg:top-1/2 lg:-translate-y-1/2 lg:mt-0 lg:ml-3",
              // Desktop: hover shows it (existing behavior)
              "lg:opacity-0 lg:invisible lg:translate-x-1 lg:group-hover/desc:opacity-100 lg:group-hover/desc:visible lg:group-hover/desc:translate-x-0",
              // Mobile: controlled by state
              isOpen
                ? "opacity-100 visible translate-y-0 lg:translate-y-0"
                : "opacity-0 invisible translate-y-1 lg:translate-y-0"
            )}
          >
            <div
              ref={containerRef}
              className={cn(
                "relative p-4 bg-paper-card rounded-md border",
                ready ? "border-transparent" : "border-line/30"
              )}
            >
              <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
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
