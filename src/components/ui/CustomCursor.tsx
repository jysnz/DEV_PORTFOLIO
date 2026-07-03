"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/useMediaQuery";
import "./CustomCursor.css";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]';
const TEXT_FIELD_SELECTOR = "input, textarea, select, label";

/**
 * Accent dot + trailing ring cursor. Mounts only on hover-capable fine
 * pointers without reduced motion; renders null everywhere else so touch
 * devices keep native behavior. Per-frame movement goes through refs and a
 * single rAF loop — no React state updates on pointermove.
 */
export function CustomCursor() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    let frame = 0;

    const tick = () => {
      trail.x += (target.x - trail.x) * 0.18;
      trail.y += (target.y - trail.y) * 0.18;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      root.classList.remove("is-hidden");
    };

    const onPointerOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      root.classList.toggle("is-text", !!el?.closest(TEXT_FIELD_SELECTOR));
      root.classList.toggle("is-hover", !!el?.closest(INTERACTIVE_SELECTOR));
    };

    const onLeave = () => root.classList.add("is-hidden");
    const onEnter = () => root.classList.remove("is-hidden");

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="custom-cursor is-hidden">
      <span ref={dotRef} className="custom-cursor__pos">
        <span className="custom-cursor__dot" />
      </span>
      <span ref={ringRef} className="custom-cursor__pos">
        <span className="custom-cursor__ring" />
      </span>
    </div>
  );
}
