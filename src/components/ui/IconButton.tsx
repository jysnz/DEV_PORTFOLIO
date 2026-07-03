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
        "flex items-center justify-center size-[52px] rounded-full glass text-text-secondary transition-all duration-300 hover:text-accent hover:border-accent/30 hover:shadow-[0_0_20px_rgba(195,177,255,0.15)] hover:scale-105",
        className
      )}
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <span className="relative">{children}</span>
    </a>
  );
}
