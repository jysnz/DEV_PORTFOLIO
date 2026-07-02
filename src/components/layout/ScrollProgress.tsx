"use client";

import { useEffect, useRef } from "react";

/**
 * Thin reading-progress bar fixed above the navbar. Stays enabled under
 * prefers-reduced-motion: it is informational, not decorative, and only
 * moves in direct response to the user's own scrolling.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, #FFFFFF 0%, #C3B1FF 50%, #9b7fff 100%)",
        }}
      />
    </div>
  );
}
