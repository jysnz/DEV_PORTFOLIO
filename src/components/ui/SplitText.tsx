"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SplitTextProps {
  text: string;
  /**
   * "load": chars animate at first paint (SSR-safe, no JS gate).
   * "scroll": chars stay hidden until the wrapper scrolls into view.
   */
  trigger?: "load" | "scroll";
  /** Delay before the first character starts, in ms. */
  baseDelay?: number;
  /** Delay between consecutive characters, in ms. */
  stagger?: number;
  /** Apply the theme text gradient per word (background-clip breaks on transformed chars). */
  gradient?: boolean;
  className?: string;
}

/**
 * Splits text into per-character spans with a staggered reveal animation.
 * Words are kept in non-wrapping spans so line-breaking is unaffected.
 * The wrapper is aria-hidden; callers must put aria-label on the parent
 * heading so screen readers get the unsplit text.
 */
export function SplitText({
  text,
  trigger = "load",
  baseDelay = 0,
  stagger = 28,
  gradient = true,
  className,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger !== "scroll") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  const words = text.split(/\s+/).filter(Boolean);
  let charIndex = 0;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("inline-block", trigger === "scroll" && "split-scroll", className)}
    >
      {words.map((word, wi) => (
        <span key={wi}>
          <span className={cn("inline-block whitespace-nowrap", gradient && "text-gradient")}>
            {Array.from(word).map((char) => (
              <span
                key={charIndex}
                className="inline-block char-reveal"
                style={{ animationDelay: `${baseDelay + charIndex++ * stagger}ms` }}
              >
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
