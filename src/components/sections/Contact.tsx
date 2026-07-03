import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { LinkedInIcon, GitHubIcon, TwitterIcon, InstagramIcon } from "@/assets/icons";
import type { SiteConfig, SocialLink } from "@/lib/types";

const iconMap = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
} as const;

export interface ContactProps {
  siteConfig: SiteConfig;
  socialLinks: SocialLink[];
}

export function Contact({ siteConfig, socialLinks }: ContactProps) {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(siteConfig.email)}`;

  return (
    <Section id="contact" divider ariaLabel="Contact">
      <div className="flex flex-col items-center text-center gap-8 lg:gap-10 max-w-2xl mx-auto">
        {/* Heading */}
        <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink">
          Get in touch
        </h2>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <p className="font-body font-medium text-lg lg:text-xl text-ink">
            Send me a message
          </p>
          <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
            Have questions, want to collaborate, or just want to say hello? Reach out and I&apos;ll get back to you.
          </p>
        </div>

        {/* Email */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-body font-medium text-base lg:text-lg text-ink underline underline-offset-4 decoration-accent/50 transition-all duration-150 hover:text-accent hover:decoration-accent"
        >
          {siteConfig.email}
        </a>

        {/* Send Message button - opens Gmail compose */}
        <Button href={gmailComposeUrl} target="_blank">
          Send a Message
        </Button>

        {/* Social icons */}
        <div className="flex items-center gap-6 pt-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={`${link.label} profile`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted transition-all duration-200 hover:text-accent hover:scale-110"
              >
                <Icon className="size-8" />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <Footer copyright={siteConfig.copyright} className="text-ink-muted font-body font-medium text-base leading-relaxed pt-8" />
      </div>
    </Section>
  );
}
