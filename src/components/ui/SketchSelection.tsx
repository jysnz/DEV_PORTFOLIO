"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Draws a sketchy/hand-drawn highlight around any selected text.
 * Renders wobbly SVG rectangles over the selection ranges,
 * giving a "circled with pencil" look.
 * Updates on scroll and selection change.
 */
export function SketchSelection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rects, setRects] = useState<SelectionRect[]>([]);
  const rafRef = useRef<number>(0);

  const updateSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setRects([]);
      return;
    }

    const range = selection.getRangeAt(0);
    const domRects = range.getClientRects();
    const newRects: SelectionRect[] = [];

    for (let i = 0; i < domRects.length; i++) {
      const r = domRects[i];
      if (r.width < 4 || r.height < 4) continue;
      // Use clientX/Y directly (viewport-relative) since SVG is position:fixed
      newRects.push({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
      });
    }

    setRects(newRects);
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateSelection);
    };

    document.addEventListener("selectionchange", handleUpdate);
    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });

    return () => {
      document.removeEventListener("selectionchange", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateSelection]);

  // Generate a wobbly path for a rectangle (hand-drawn look)
  const getWobblyRect = useCallback(
    (x: number, y: number, w: number, h: number, seed: number) => {
      const wobble = 1.5;
      const rng = (i: number) => Math.sin(seed * 9301 + i * 4973) * wobble;

      const p1 = `${x + rng(0)},${y + rng(1)}`;
      const p2 = `${x + w * 0.3 + rng(2)},${y - wobble + rng(3)}`;
      const p3 = `${x + w * 0.7 + rng(4)},${y + wobble + rng(5)}`;
      const p4 = `${x + w + rng(6)},${y + rng(7)}`;
      const p5 = `${x + w + wobble + rng(8)},${y + h * 0.5 + rng(9)}`;
      const p6 = `${x + w + rng(10)},${y + h + rng(11)}`;
      const p7 = `${x + w * 0.7 + rng(12)},${y + h + wobble + rng(13)}`;
      const p8 = `${x + w * 0.3 + rng(14)},${y + h - wobble + rng(15)}`;
      const p9 = `${x + rng(16)},${y + h + rng(17)}`;
      const p10 = `${x - wobble + rng(18)},${y + h * 0.5 + rng(19)}`;

      return `M ${p1} C ${p2} ${p3} ${p4} C ${p5} ${p5} ${p6} C ${p7} ${p8} ${p9} C ${p10} ${p10} ${p1} Z`;
    },
    []
  );

  if (rects.length === 0) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] w-full h-full"
    >
      {rects.map((rect, i) => (
        <path
          key={`${rect.x}-${rect.y}-${rect.width}-${i}`}
          d={getWobblyRect(
            rect.x - 3,
            rect.y - 2,
            rect.width + 6,
            rect.height + 4,
            i + Math.round(rect.x)
          )}
          fill="none"
          stroke="var(--accent-pencil)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}
