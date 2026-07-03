"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/useMediaQuery";

export interface MagneticProps {
  children: React.ReactNode;
  /** Fraction of the pointer's offset from center applied as translation. */
  strength?: number;
  /** Maximum translation in px. */
  maxOffset?: number;
  className?: string;
}

const RESET_TRANSITION = "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";

/**
 * Pulls its child toward the pointer while hovered, springing back on leave.
 * Plain passthrough on touch devices and under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.3,
  maxOffset = 10,
  className,
}: MagneticProps) {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const innerRef = useRef<HTMLSpanElement>(null);

  if (!finePointer || reducedMotion) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  const clamp = (value: number) =>
    Math.max(-maxOffset, Math.min(maxOffset, value));

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const inner = innerRef.current;
    if (!inner) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left - rect.width / 2) * strength);
    const y = clamp((e.clientY - rect.top - rect.height / 2) * strength);
    inner.style.transition = "none";
    inner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transition = RESET_TRANSITION;
    inner.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      className={cn("inline-block", className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <span ref={innerRef} className="inline-block">
        {children}
      </span>
    </span>
  );
}
