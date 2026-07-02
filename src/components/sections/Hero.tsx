"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { LinkedInIcon, GitHubIcon } from "@/assets/icons";
import { siteConfig, socialLinks } from "@/lib/data";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { cn } from "@/lib/utils";

export function Hero() {
  const { containerRef, svgRef, ready } = useRoughShape<HTMLDivElement>({ radius: 16 });

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

          {/* Hero image */}
          <div
            ref={containerRef}
            className={cn(
              "relative w-fit mx-auto lg:mx-0 shrink-0 p-1.5 rounded-xl border",
              ready ? "border-transparent" : "border-line"
            )}
          >
            <SketchBorder svgRef={svgRef} />
            <Image
              src="/images/hero-portrait.png"
              alt="Portrait of Jayson Dela Cruz"
              width={523}
              height={695}
              priority
              className="pencil-photo relative w-auto h-auto max-h-[32vh] sm:max-h-[38vh] lg:max-h-[58vh] xl:max-h-[62vh] rounded-lg object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 480px, 523px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
