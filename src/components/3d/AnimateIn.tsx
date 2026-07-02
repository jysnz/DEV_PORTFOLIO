"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  /** Add a blur that resolves as the element enters, for bolder reveals. */
  blur?: boolean;
  /** Transition duration in ms. */
  duration?: number;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  duration = 700,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    scale: "scale-95",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100 blur-0"
          : cn("opacity-0", directionStyles[direction], blur && "blur-[6px]"),
        className
      )}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
