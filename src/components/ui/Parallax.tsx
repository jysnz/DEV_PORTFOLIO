"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

export interface ParallaxProps {
  children: React.ReactNode;
  /**
   * Scroll-to-translation factor. Negative moves against scroll direction.
   * Offset is clamped to ±60px either way.
   */
  speed?: number;
  className?: string;
}

const MAX_OFFSET = 60;

/**
 * Vertical parallax driven by a rAF-throttled scroll listener. Element
 * geometry is cached on mount/resize, so scrolling never forces layout.
 */
export function Parallax({ children, speed = 0.1, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let centerY = 0;
    let frame = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      // Center in document coordinates, excluding our own current offset
      const currentOffset =
        new DOMMatrixReadOnly(getComputedStyle(el).transform).m42 || 0;
      centerY = rect.top + window.scrollY + rect.height / 2 - currentOffset;
    };

    const update = () => {
      frame = 0;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const raw = (viewportCenter - centerY) * speed;
      const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, raw));
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      el.style.transform = "";
    };
  }, [speed, reducedMotion]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
