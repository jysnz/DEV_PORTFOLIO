"use client";

import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

export interface ProjectTagProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectTag({ children, className }: ProjectTagProps) {
  const { containerRef, svgRef, ready } = useRoughShape<HTMLSpanElement>({ radius: 999 });

  return (
    <span
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center px-4 py-2 rounded-full border font-body font-medium text-sm leading-normal text-ink",
        ready ? "border-transparent" : "border-line",
        className
      )}
    >
      <SketchBorder svgRef={svgRef} />
      <span className="relative">{children}</span>
    </span>
  );
}
