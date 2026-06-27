"use client";

import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { AnimateIn } from "@/components/3d/AnimateIn";

export interface AboutProps {
  aboutDescription: {
    headline: string;
    body: string;
  };
}

export function About({ aboutDescription }: AboutProps) {
  return (
    <Section id="about" ariaLabel="About me">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <AnimateIn direction="left" className="lg:w-[40%] shrink-0">
          <h2 className="font-display text-[48px] md:text-[72px] lg:text-[101px] leading-[0.9] text-gradient">
            About me
          </h2>
        </AnimateIn>

        <AnimateIn direction="right" delay={200} className="lg:flex-1 min-w-0 flex flex-col gap-6">
          <div className="p-6 lg:p-8 rounded-2xl glass">
            <p className="font-body font-medium text-lg lg:text-2xl leading-[1.4] text-text-primary mb-4">
              {aboutDescription.headline}
            </p>
            <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
              {aboutDescription.body}
            </p>
          </div>
          <div>
            <LinkButton href="/about" type="demo">
              More about me
            </LinkButton>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}
