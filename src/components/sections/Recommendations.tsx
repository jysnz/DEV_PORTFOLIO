"use client";

import { Section } from "@/components/layout/Section";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { useRoughShape } from "@/hooks/useRoughShape";
import type { Recommendation } from "@/lib/types";

function SketchBox({ children, className }: { children: React.ReactNode; className?: string }) {
  const { containerRef, svgRef, ready } = useRoughShape<HTMLDivElement>({
    shape: "rect",
    radius: 12,
    strokeWidth: 1.5,
    roughness: 1.5,
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${ready ? "border-transparent" : "border border-line/20"} rounded-md ${className ?? ""}`}
    >
      {children}
      <SketchBorder svgRef={svgRef} />
    </div>
  );
}

export interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <Section id="recommendations" divider ariaLabel="Recommendations">
      <div className="flex flex-col gap-10 lg:gap-12">
        {/* Title */}
        <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink text-center">
          Recommendations
        </h2>

        {/* Recommendation cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <SketchBox key={rec.name} className="p-6 lg:p-8">
              <div className="flex flex-col gap-4 h-full">
                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="font-body font-normal text-base leading-relaxed text-ink-muted italic">
                    &ldquo;{rec.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-3 pt-2 border-t border-line/20">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="font-body font-bold text-sm text-accent">
                      {rec.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body font-semibold text-sm text-ink">
                      {rec.name}
                    </span>
                    <span className="font-body text-xs text-ink-muted">
                      {rec.role}{rec.company ? `, ${rec.company}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            </SketchBox>
          ))}
        </div>
      </div>
    </Section>
  );
}
