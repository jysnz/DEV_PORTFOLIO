"use client";

import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { Stack } from "@/components/ui/Stack";
import { StackSketchCard } from "@/components/ui/StackSketchCard";
import { aboutDescription } from "@/lib/data";

const aboutImages = [
  { src: "/images/hero-portrait.png", sketchSrc: "/images/Sketch_Zephyr.png", alt: "Portrait" },
  { src: "/images/image1.jpg", sketchSrc: "/images/image1sketch.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", sketchSrc: "/images/image2sketch.jpg", alt: "Image 2" },
];

export function About() {
  return (
    <Section id="about" divider ariaLabel="About me">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Title and Image */}
        <div className="lg:w-[45%] shrink-0 flex flex-col gap-8">
          <h2 className="font-display text-[48px] md:text-[72px] lg:text-[101px] leading-[0.9] text-ink">
            About me
          </h2>

          {/* Image stack similar to hero */}
          <div className="relative mx-auto lg:mx-0 w-[200px] h-[260px] sm:w-[240px] sm:h-[310px] lg:w-[280px] lg:h-[370px]">
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
        </div>

        {/* Content */}
        <div className="lg:flex-1 min-w-0 flex flex-col gap-6">
          <p className="font-body font-medium text-xl md:text-2xl lg:text-[32px] leading-[1.4] text-ink">
            {aboutDescription.headline}
          </p>
          <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
            {aboutDescription.body}
          </p>
          <div className="mt-2">
            <LinkButton href="/about" type="demo">
              More about me
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
