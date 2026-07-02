"use client";

import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

export interface IconButtonProps {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ href, label, children, className }: IconButtonProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLAnchorElement>({
    radius: 27,
    withEmphasis: true,
  });

  return (
    <a
      ref={containerRef}
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center justify-center size-[54px] rounded-full bg-paper-input text-ink-muted transition-colors duration-150 hover:bg-accent hover:text-accent-contrast focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        "border",
        ready ? "border-transparent" : "border-line",
        className
      )}
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <span className="relative">{children}</span>
    </a>
  );
}
