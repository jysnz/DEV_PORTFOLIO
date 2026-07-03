"use client";

import { useRoughShape } from "@/hooks/useRoughShape";

/** A single hand-drawn horizontal wobble line, used in place of a plain border-top divider. */
export function SketchDivider() {
  const { containerRef, svgRef } = useRoughShape<HTMLDivElement>({ shape: "line" });

  return (
    <div ref={containerRef} className="relative h-3 w-full" aria-hidden="true">
      <svg ref={svgRef} className="absolute inset-0 w-full h-full overflow-visible" />
    </div>
  );
}
