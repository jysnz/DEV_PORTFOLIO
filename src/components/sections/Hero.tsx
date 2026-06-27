import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { GradualBlur } from "@/components/ui/GradualBlur";
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
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[90px] pt-32 lg:pt-40 pb-16">
        <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-12">
          <div className="flex flex-col justify-center gap-7 flex-1 min-w-0 max-w-[560px] lg:min-h-[60vh]">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-accent w-fit">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-body font-medium text-xs uppercase tracking-wider">
                  Available for work
                </span>
              </div>
              <h1 className="font-display text-[44px] md:text-[64px] lg:text-[88px] xl:text-[101px] leading-[0.9] text-gradient">
                {siteConfig.title}
              </h1>
              <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary max-w-[480px]">
                {siteConfig.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Button href="#contact">Contact Me</Button>
              {socialLinks.map((link) => (
                <IconButton key={link.icon} href={link.href} label={link.label}>
                  {link.icon === "linkedin" ? <LinkedInIcon /> : <GitHubIcon />}
                </IconButton>
              ))}
            </div>
          </div>

          {siteConfig.hero_image_url && (
            <div className="hidden lg:block shrink-0 w-[320px] xl:w-[380px]">
              <div className="relative p-2 rounded-2xl glass glow-accent">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
