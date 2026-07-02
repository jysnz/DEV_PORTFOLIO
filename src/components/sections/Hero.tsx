import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { LinkedInIcon, GitHubIcon } from "@/assets/icons";
import type { SocialLink } from "@/lib/types";

export interface HeroProps {
  siteConfig: {
    name: string;
    title: string;
    subtitle: string;
    hero_image_url: string | null;
  };
  socialLinks: SocialLink[];
}

export function Hero({ siteConfig, socialLinks }: HeroProps) {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative z-0 w-full min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={0.15} className="absolute inset-0">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
        </Parallax>
      </div>

      <GradualBlur
        position="bottom"
        height="5rem"
        strength={3}
        divCount={8}
        curve="bezier"
        target="parent"
        zIndex={5}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          <div className="flex flex-col justify-center gap-8 flex-1 min-w-0 max-w-[560px] lg:min-h-[60vh]">
            {siteConfig.hero_image_url && (
              <div
                className="hero-in lg:hidden flex items-center gap-3"
                style={{ animationDelay: "0ms" }}
              >
                <div className="relative size-16 shrink-0 rounded-full p-0.5 glass glow-accent">
                  <Image
                    src={siteConfig.hero_image_url}
                    alt={`Portrait of ${siteConfig.name}`}
                    width={64}
                    height={64}
                    priority
                    className="size-full rounded-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="hero-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-accent w-fit">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-body font-medium text-xs uppercase tracking-wider">
                  Available for work
                </span>
              </div>
              <h1
                aria-label={siteConfig.title}
                className="font-display text-[44px] md:text-[64px] lg:text-[88px] xl:text-[101px] leading-[0.9]"
              >
                <SplitText text={siteConfig.title} trigger="load" baseDelay={150} />
              </h1>
              <p
                className="hero-in font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary max-w-[480px]"
                style={{ animationDelay: "600ms" }}
              >
                {siteConfig.subtitle}
              </p>
            </div>

            <div
              className="hero-in flex items-center gap-3 flex-wrap"
              style={{ animationDelay: "750ms" }}
            >
              <Magnetic>
                <Button href="#contact">Contact Me</Button>
              </Magnetic>
              <Magnetic>
                <Button href="#projects" variant="secondary">
                  View Projects
                </Button>
              </Magnetic>
              {socialLinks.map((link) => (
                <Magnetic key={link.icon}>
                  <IconButton href={link.href} label={link.label}>
                    {link.icon === "linkedin" ? <LinkedInIcon /> : <GitHubIcon />}
                  </IconButton>
                </Magnetic>
              ))}
            </div>
          </div>

          {siteConfig.hero_image_url && (
            <Parallax
              speed={-0.08}
              className="hidden lg:block shrink-0 w-[320px] xl:w-[380px]"
            >
              <div className="hero-portrait-float relative p-2 rounded-2xl glass glow-accent">
                <Image
                  src={siteConfig.hero_image_url}
                  alt={`Portrait of ${siteConfig.name}`}
                  width={523}
                  height={695}
                  priority
                  className="w-full h-auto max-h-[55vh] rounded-xl object-cover"
                  sizes="(max-width: 1280px) 320px, 380px"
                />
                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-accent/50 rounded-tl-lg" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-accent/50 rounded-br-lg" />
              </div>
            </Parallax>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hero-in absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
        style={{ animationDelay: "1100ms" }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-secondary/50">
          Scroll
        </span>
        <span className="scroll-cue flex items-center justify-center size-8 rounded-full glass">
          <svg
            className="size-3.5 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </section>
  );
}
