"use client";

import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { useRoughShape } from "@/hooks/useRoughShape";
import type { Publication } from "@/lib/types";

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

export interface PublicationsProps {
  publications: Publication[];
}

export function Publications({ publications }: PublicationsProps) {
  if (publications.length === 0) return null;

  return (
    <Section id="publications" divider ariaLabel="Research Publications">
      <div className="flex flex-col gap-10 lg:gap-12">
        {/* Title */}
        <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink text-center">
          Research Publications
        </h2>

        {/* Publication cards */}
        <div className="flex flex-col gap-6">
          {publications.map((pub) => (
            <SketchBox key={pub.title} className="p-6 lg:p-8">
              <article className="flex flex-col gap-3">
                {/* Title + Year */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h3 className="font-body font-semibold text-lg lg:text-xl text-ink leading-snug flex-1">
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors duration-150"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  <span className="font-body font-medium text-sm text-ink-muted shrink-0">
                    {pub.year}
                  </span>
                </div>

                {/* Authors */}
                <p className="font-body text-sm text-ink-muted">
                  {pub.authors}
                </p>

                {/* Venue */}
                {(pub.journal || pub.conference) && (
                  <p className="font-body text-sm text-accent italic">
                    {pub.journal || pub.conference}
                  </p>
                )}

                {/* Abstract */}
                {pub.abstract && (
                  <p className="font-body text-sm text-ink-muted leading-relaxed mt-1">
                    {pub.abstract}
                  </p>
                )}

                {/* Tags + DOI */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs font-medium px-2 py-0.5 rounded-full border border-line/30 text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {pub.doi && (
                    <a
                      href={pub.doi.trim().startsWith("http") ? pub.doi.trim() : `https://doi.org/${pub.doi.trim()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs font-medium text-accent hover:underline ml-auto"
                    >
                      DOI ↗
                    </a>
                  )}
                </div>

                {/* Links */}
                {pub.url && (
                  <div className="mt-3">
                    <LinkButton href={pub.url} type="demo">
                      View Paper
                    </LinkButton>
                  </div>
                )}
              </article>
            </SketchBox>
          ))}
        </div>
      </div>
    </Section>
  );
}
