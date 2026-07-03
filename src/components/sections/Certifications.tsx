"use client";

import { useCallback, useState, useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { Carousel } from "@/components/ui/Carousel";
import { LinkButton } from "@/components/ui/LinkButton";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { useRoughShape } from "@/hooks/useRoughShape";
import type { Certification } from "@/lib/types";
import type { CarouselItem } from "@/components/ui/Carousel";

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

export interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(320);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCarouselWidth(520);
      else if (w >= 1024) setCarouselWidth(440);
      else if (w >= 768) setCarouselWidth(400);
      else if (w >= 640) setCarouselWidth(340);
      else setCarouselWidth(Math.min(w - 64, 320));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  if (certifications.length === 0) return null;

  const activeCert = certifications[activeIndex] ?? certifications[0];

  const carouselItems: CarouselItem[] = certifications.map((cert, i) => ({
    id: i + 1,
    title: cert.title,
    description: cert.issuer,
    image: cert.image_url || cert.credential_url,
  }));

  return (
    <Section id="certifications" divider ariaLabel="Certifications" className="pb-8 lg:pb-10">
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Title */}
        <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink text-center">
          Certifications
        </h2>

        {/* Side by side on desktop, stacked on mobile/tablet */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center justify-center">
          {/* Details pane */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none lg:w-[400px] xl:w-[440px] lg:h-[440px] shrink-0 order-2 lg:order-1">
            <SketchBox className="p-5 sm:p-6 lg:p-8 h-full">
              <div className="flex flex-col justify-center h-full gap-4 lg:gap-5">
                <div className="flex flex-col gap-2">
                  <span className="font-body font-semibold text-xs uppercase tracking-wider text-accent">
                    {activeCert.issuer}
                  </span>
                  <h3 className="font-body font-bold text-xl sm:text-2xl lg:text-3xl text-ink leading-snug">
                    {activeCert.title}
                  </h3>
                  <span className="font-body text-sm text-ink-muted">
                    Issued: {activeCert.date_issued}
                  </span>
                </div>

                {activeCert.description && (
                  <p className="font-body text-sm sm:text-base text-ink-muted leading-relaxed">
                    {activeCert.description}
                  </p>
                )}

                {activeCert.credential_url && (
                  <div className="mt-auto pt-3 lg:pt-4">
                    <LinkButton href={activeCert.credential_url} type="demo">
                      View Credential
                    </LinkButton>
                  </div>
                )}

                {/* Counter */}
                <span className="font-body text-xs text-ink-muted mt-1 lg:mt-2">
                  {activeIndex + 1} of {certifications.length}
                </span>
              </div>
            </SketchBox>
          </div>

          {/* Carousel pane - responsive width */}
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0 lg:max-w-none lg:w-auto flex items-center justify-center shrink-0 order-1 lg:order-2">
            <SketchBox className="p-3 sm:p-4 lg:p-6">
              <Carousel
                items={carouselItems}
                baseWidth={carouselWidth}
                autoplay={true}
                autoplayDelay={5000}
                pauseOnHover={true}
                loop={true}
                onActiveChange={handleActiveChange}
              />
            </SketchBox>
          </div>
        </div>
      </div>
    </Section>
  );
}
