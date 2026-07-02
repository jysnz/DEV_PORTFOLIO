"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import rough from "roughjs";
import { roundedRectPath, horizontalLinePath } from "@/components/sketch/roughPath";

export interface UseRoughShapeOptions {
  shape?: "rect" | "line";
  radius?: number;
  strokeWidth?: number;
  roughness?: number;
  emphasisStrokeWidth?: number;
  withEmphasis?: boolean;
}

/**
 * Draws a stable, hand-drawn rough.js outline into an absolutely-positioned
 * SVG overlay. Generated once per mount with a fixed seed (so it doesn't
 * jitter on unrelated re-renders) and redrawn only on actual container
 * resize, debounced.
 */
export function useRoughShape<T extends HTMLElement = HTMLElement>({
  shape = "rect",
  radius = 12,
  strokeWidth = 1.5,
  roughness = 1.5,
  emphasisStrokeWidth = 2.75,
  withEmphasis = false,
}: UseRoughShapeOptions = {}) {
  const containerRef = useRef<T | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const emphasisSvgRef = useRef<SVGSVGElement | null>(null);
  const seedRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const draw = useCallback(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg || seedRef.current === null) return;
    const seed = seedRef.current;

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const d = shape === "line" ? horizontalLinePath(width, height) : roundedRectPath(width, height, radius);

    svg.innerHTML = "";
    const rc = rough.svg(svg);
    svg.appendChild(
      rc.path(d, {
        roughness,
        strokeWidth,
        stroke: "var(--line-color)",
        seed,
      })
    );

    const emphasisSvg = emphasisSvgRef.current;
    if (withEmphasis && emphasisSvg) {
      emphasisSvg.innerHTML = "";
      const rcEmphasis = rough.svg(emphasisSvg);
      emphasisSvg.appendChild(
        rcEmphasis.path(d, {
          roughness: roughness * 1.2,
          strokeWidth: emphasisStrokeWidth,
          stroke: "var(--line-color)",
          seed: seed + 1,
        })
      );
    }

    setReady(true);
  }, [shape, radius, strokeWidth, roughness, emphasisStrokeWidth, withEmphasis]);

  useEffect(() => {
    if (seedRef.current === null) {
      seedRef.current = Math.floor(Math.random() * 2 ** 31);
    }
    draw();
    const container = containerRef.current;
    if (!container) return;

    let timeout: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(draw, 150);
    });
    observer.observe(container);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [draw]);

  return { containerRef, svgRef, emphasisSvgRef, ready };
}
