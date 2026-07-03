"use client";

import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { ContributionGrid } from "@/components/ui/ContributionGrid";
import { Stack } from "@/components/ui/Stack";
import { StackSketchCard } from "@/components/ui/StackSketchCard";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { useRoughShape } from "@/hooks/useRoughShape";
import { aboutDescription } from "@/lib/data";
import type { ContributionData } from "@/lib/github";

const aboutImages = [
  { src: "/images/hero-portrait.png", sketchSrc: "/images/Sketch_Zephyr.png", alt: "Portrait" },
  { src: "/images/image1.jpg", sketchSrc: "/images/image1sketch.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", sketchSrc: "/images/image2sketch.jpg", alt: "Image 2" },
];

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

export interface AboutProps {
  contributions?: ContributionData | null;
}

export function About({ contributions }: AboutProps) {
  const { containerRef: imageRef, svgRef: imageSvgRef, ready: imageReady } = useRoughShape<HTMLDivElement>({
    shape: "rect",
    radius: 16,
    strokeWidth: 2,
    roughness: 1.8,
  });

  return (
    <Section id="about" divider ariaLabel="About me">
      <div className="flex flex-col gap-12 lg:gap-16">
        {/* Title */}
        <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink text-center">
          About me
        </h2>

        {/* Main content: image stack + description in sketch box */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start">
          {/* Image stack with sketch border */}
          <div
            ref={imageRef}
            className={`relative mx-auto lg:mx-0 shrink-0 w-[200px] h-[260px] sm:w-[240px] sm:h-[310px] lg:w-[280px] lg:h-[370px] p-3 ${imageReady ? "border-transparent" : "border border-line/20"} rounded-lg`}
          >
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                autoplay={true}
                autoplayDelay={5000}
                pauseOnHover={true}
                cards={aboutImages.map((img, i) => (
                  <StackSketchCard
                    key={i}
                    src={img.src}
                    sketchSrc={img.sketchSrc}
                    alt={img.alt}
                  />
                ))}
              />
            </div>
            <SketchBorder svgRef={imageSvgRef} />
          </div>

          {/* Description + highlights */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <SketchBox className="p-6 lg:p-8">
              <div className="flex flex-col gap-4">
                <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
                  {aboutDescription.body}
                </p>
                <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
                  {aboutDescription.philosophy}
                </p>
              </div>
            </SketchBox>

            {/* Small sketch boxes for Focus and Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutDescription.highlights.map((highlight) => (
                <SketchBox key={highlight.label} className="p-4 lg:p-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-body font-semibold text-xs uppercase tracking-wider text-accent">
                      {highlight.label}
                    </span>
                    <span className="font-body font-medium text-base text-ink leading-snug">
                      {highlight.value}
                    </span>
                  </div>
                </SketchBox>
              ))}
            </div>

            <div className="mt-2">
              <LinkButton href="/about" type="demo">
                More about me
              </LinkButton>
            </div>
          </div>
        </div>

        {/* GitHub Contribution Grid */}
        {contributions && (
          <SketchBox className="p-5 lg:p-6">
            <ContributionGrid data={contributions} />
          </SketchBox>
        )}
      </div>
    </Section>
  );
}
