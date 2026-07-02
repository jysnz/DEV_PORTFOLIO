"use client";

import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { LinkedInIcon, GitHubIcon } from "@/assets/icons";
import { Stack } from "@/components/ui/Stack";
import { StackSketchCard } from "@/components/ui/StackSketchCard";
import type { SiteConfig, SocialLink } from "@/lib/types";

const stackImages = [
  { src: "/images/hero-portrait.png", sketchSrc: "/images/Sketch_Zephyr.png", alt: "Portrait" },
  { src: "/images/image1.jpg", sketchSrc: "/images/image1sketch.jpg", alt: "Image 1" },
  { src: "/images/image2.jpg", sketchSrc: "/images/image2sketch.jpg", alt: "Image 2" },
];

export interface HeroProps {
  siteConfig: SiteConfig;
  socialLinks: SocialLink[];
}

export function Hero({ siteConfig, socialLinks }: HeroProps) {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[90px] py-24 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-8">
          {/* Hero content */}
          <div className="flex flex-col gap-6 lg:gap-8 max-w-[544px]">
            <div className="flex flex-col gap-3 lg:gap-4">
              <h1 className="font-display text-[38px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[0.95] text-ink">
                {siteConfig.title}
              </h1>
              <p className="font-body font-normal text-sm md:text-base lg:text-lg leading-relaxed text-ink-muted">
                {siteConfig.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Button href="#contact">Contact Me</Button>
              {socialLinks.map((link) => (
                <IconButton key={link.icon} href={link.href} label={link.label}>
                  {link.icon === "linkedin" ? <LinkedInIcon /> : <GitHubIcon />}
                </IconButton>
              ))}
            </div>
          </div>

          {/* Hero image stack */}
          <div className="relative mx-auto lg:mx-0 shrink-0 w-[200px] h-[260px] sm:w-[220px] sm:h-[290px] lg:w-[280px] lg:h-[370px] xl:w-[320px] xl:h-[420px]">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={true}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              cards={stackImages.map((img, i) => (
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
      </div>
    </section>
  );
}
