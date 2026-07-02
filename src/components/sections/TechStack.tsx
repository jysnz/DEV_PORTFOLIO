import { Section } from "@/components/layout/Section";
import { TechStackCarousel } from "@/components/ui/TechStackCarousel";
import type { TechStack } from "@/lib/types";

export interface TechStackSectionProps {
  techStack: TechStack[];
}

export function TechStackSection({ techStack }: TechStackSectionProps) {
  return (
    <Section id="tech-stack" divider ariaLabel="Tech Stack">
      <div className="flex flex-col gap-12 lg:gap-16">
        {/* Header - centered */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink">
            Tech Stack
          </h2>
          <p className="font-body font-normal text-base lg:text-lg leading-normal text-ink-muted max-w-md">
            Technologies and tools I work with daily to build modern applications.
          </p>
        </div>

        {/* Carousel - respects section padding */}
        <TechStackCarousel items={techStack} />
      </div>
    </Section>
  );
}
