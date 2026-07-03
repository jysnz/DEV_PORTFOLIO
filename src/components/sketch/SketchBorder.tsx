"use client";

import type { RefObject } from "react";

export interface SketchBorderProps {
  svgRef: RefObject<SVGSVGElement | null>;
  emphasisSvgRef?: RefObject<SVGSVGElement | null>;
  hoverEmphasis?: boolean;
}

/**
 * Hand-drawn border overlay. Purely presentational — the consumer owns the
 * bordered element itself (calls `useRoughShape`, attaches `containerRef` to
 * its own root, and swaps its plain CSS border for `border-transparent` once
 * `ready` is true) and drops this inside as the last child so the rough.js
 * stroke paints over the content's background but under nothing (no extra
 * wrapping element, no ref-polymorphism).
 */
export function SketchBorder({ svgRef, emphasisSvgRef, hoverEmphasis = false }: SketchBorderProps) {
  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
      />
      {hoverEmphasis && emphasisSvgRef && (
        <svg
          ref={emphasisSvgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-40"
        />
      )}
    </>
  );
}
