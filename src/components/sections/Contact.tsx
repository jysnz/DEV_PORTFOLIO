"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { Footer } from "@/components/layout/Footer";
import { AnimateIn } from "@/components/3d/AnimateIn";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { LinkedInIcon, GitHubIcon, TwitterIcon, InstagramIcon } from "@/assets/icons";

export interface ContactProps {
  siteConfig: {
    email: string;
    copyright: string;
  };
}

export function Contact({ siteConfig }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  return (
    <Section id="contact" ariaLabel="Contact">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-3 max-w-[600px]">
          <h2
            aria-label="Let's connect"
            className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none"
          >
            <SplitText text="Let's connect" trigger="scroll" stagger={22} />
          </h2>
          <AnimateIn delay={200}>
            <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
              Have a project in mind or want to collaborate? Send me a message.
            </p>
          </AnimateIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[40%] shrink-0">
            <AnimateIn>
              <div className="p-6 rounded-2xl glass-accent">
                <p className="font-body font-normal text-sm leading-relaxed text-text-secondary mb-2">
                  Say hello at
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-body font-semibold text-base text-accent transition-all duration-200 hover:text-text-primary break-all"
                >
                  {siteConfig.email}
                </a>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <div className="flex items-center gap-3">
                {[
                  { href: "https://linkedin.com", label: "LinkedIn profile", Icon: LinkedInIcon },
                  { href: "https://github.com", label: "GitHub profile", Icon: GitHubIcon },
                  { href: "https://twitter.com", label: "Twitter profile", Icon: TwitterIcon },
                  { href: "https://instagram.com", label: "Instagram profile", Icon: InstagramIcon },
                ].map(({ href, label, Icon }) => (
                  <Magnetic key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center size-11 rounded-xl glass text-text-secondary transition-all duration-300 hover:text-accent hover:border-accent/30 hover:scale-110"
                    >
                      <Icon className="size-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={200}>
              <Footer copyright={siteConfig.copyright} />
            </AnimateIn>
          </div>

          <div className="lg:flex-1 min-w-0">
            {status === "submitted" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center gap-4 py-16 text-center rounded-2xl glass-accent"
              >
                <div className="size-14 rounded-full bg-accent/20 flex items-center justify-center glow-accent">
                  <svg className="size-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body font-semibold text-lg text-text-primary">
                  Message sent!
                </p>
                <p className="font-body text-sm text-text-secondary">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus("submitting");
                  window.setTimeout(() => setStatus("submitted"), 600);
                }}
                className="flex flex-col gap-6 p-6 lg:p-8 rounded-2xl glass"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput label="Name" name="name" placeholder="John Doe" required />
                  <FormInput label="Email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <FormInput label="Subject" name="subject" placeholder="Project inquiry" required />
                <FormInput label="Message" name="message" type="textarea" placeholder="Tell me about your project..." required />
                <div className="pt-2">
                  <Magnetic>
                    <Button type="submit" variant="submit" disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </Button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
