"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/data";
import { MenuIcon, CloseIcon } from "@/assets/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-paper-bg/95 backdrop-blur-md border-b border-line/50"
          : "bg-transparent",
        className
      )}
    >
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 md:px-[60px] py-6 max-w-[1440px] mx-auto"
      >
        <a
          href="#home"
          className="font-display text-[32px] leading-normal text-ink-muted tracking-tight transition-colors duration-150 hover:text-ink"
        >
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-ink-muted font-body font-medium text-base leading-relaxed transition-colors duration-150 hover:text-ink"
              >
                {link.label}
                {/* Sketch underline animation */}
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[6px] overflow-visible"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,3 C5,1 10,5 15,3 C20,1 25,5 30,3 C35,1 40,5 45,3 C50,1 55,5 60,3 C65,1 70,5 75,3 C80,1 85,5 90,3 C95,1 100,3 100,3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength="100"
                    className="text-accent stroke-current [stroke-dasharray:100] [stroke-dashoffset:100] transition-[stroke-dashoffset] duration-[400ms] ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="lg:hidden text-ink-muted p-2 rounded-lg transition-colors duration-150 hover:text-ink hover:bg-paper-input"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-paper-bg/95 backdrop-blur-md border-t border-line/50">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-ink-muted font-body font-medium text-lg py-3 px-4 rounded-lg transition-colors duration-150 hover:text-accent hover:bg-paper-input/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
