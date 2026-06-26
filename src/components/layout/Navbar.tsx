"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/data";
import { MenuIcon, CloseIcon } from "@/assets/icons";

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
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-border/50"
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
          className="font-display text-[32px] leading-normal text-text-secondary tracking-tight transition-colors duration-150 hover:text-text-primary"
        >
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-text-secondary font-body font-medium text-base leading-relaxed transition-colors duration-150 hover:text-accent after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="lg:hidden text-text-secondary p-2 rounded-lg transition-colors duration-150 hover:text-text-primary hover:bg-bg-icon"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-bg-primary/95 backdrop-blur-md border-t border-border/50">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-text-secondary font-body font-medium text-lg py-3 px-4 rounded-lg transition-colors duration-150 hover:text-accent hover:bg-bg-icon/50"
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
