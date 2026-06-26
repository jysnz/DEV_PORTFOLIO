import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { LinkedInIcon, GitHubIcon } from "@/assets/icons";
import { siteConfig, socialLinks } from "@/lib/data";
import { ClientHeroScene } from "@/components/3d/ClientHeroScene";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[90px] pt-28 lg:pt-[140px] pb-16 lg:pb-20 overflow-hidden"
    >
      {/* 3D Background Scene */}
      <ClientHeroScene />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8">
        {/* Hero content */}
        <div className="flex flex-col gap-10 max-w-[544px]">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[48px] md:text-[72px] lg:text-[101px] leading-[0.9] text-text-primary">
              {siteConfig.title}
            </h1>
            <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-text-secondary">
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
        <div className="w-full max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[523px] mx-auto lg:mx-0 shrink-0">
          <Image
            src="/images/hero-portrait.png"
            alt="Portrait of Jayson Dela Cruz"
            width={523}
            height={695}
            priority
            className="w-full h-auto rounded-xl object-cover"
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 480px, 523px"
          />
        </div>
      </div>
    </section>
  );
}
