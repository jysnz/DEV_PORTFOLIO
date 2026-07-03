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
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-accent text-accent font-body font-medium text-xs uppercase tracking-wider",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
