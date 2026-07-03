"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
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
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="contact" divider ariaLabel="Contact">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-10">
        {/* Left: info */}
        <div className="flex flex-col justify-between lg:flex-1 lg:min-w-0 gap-16">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink">
                Let&apos;s connect
              </h2>
              <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-ink-muted">
                Say hello at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink underline underline-offset-4 decoration-accent/50 transition-all duration-150 hover:text-accent hover:decoration-accent"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-6">
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
          </div>

          <Footer copyright={siteConfig.copyright} className="hidden lg:block text-ink-muted font-body font-medium text-base leading-relaxed" />
        </div>

        {/* Right: form */}
        <div className="lg:flex-1 lg:min-w-0">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="size-16 rounded-full bg-accent/20 flex items-center justify-center">
                <svg className="size-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body font-medium text-xl text-ink">
                Message sent!
              </p>
              <p className="font-body text-ink-muted">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-6"
            >
              <FormInput label="Name" name="name" placeholder="John Doe" required />
              <FormInput label="Email" name="email" type="email" placeholder="john@example.com" required />
              <FormInput label="Subject" name="subject" placeholder="Project inquiry" required />
              <FormInput label="Message" name="message" type="textarea" placeholder="Tell me about your project..." required />
              <div className="mt-4">
                <Button type="submit" variant="submit">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Mobile/tablet footer - shown at bottom */}
      <Footer copyright={siteConfig.copyright} className="lg:hidden text-ink-muted font-body font-medium text-base leading-relaxed text-center pt-12" />
    </Section>
  );
}
