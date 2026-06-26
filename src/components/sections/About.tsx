import { Section } from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { aboutDescription } from "@/lib/data";

export function About() {
  return (
    <Section id="about" divider ariaLabel="About me">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Title */}
        <div className="lg:w-[45%] shrink-0">
          <h2 className="font-display text-[48px] md:text-[72px] lg:text-[101px] leading-[0.9] text-text-primary">
            About me
          </h2>
        </div>

        {/* Content */}
        <div className="lg:flex-1 min-w-0 flex flex-col gap-6">
          <p className="font-body font-medium text-xl md:text-2xl lg:text-[32px] leading-[1.4] text-text-primary">
            {aboutDescription.headline}
          </p>
          <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-text-secondary">
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
