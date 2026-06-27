"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { MenuIcon, CloseIcon } from "@/assets/icons";
import type { NavLink } from "@/lib/types";

export interface NavbarProps {
  navLinks: NavLink[];
  siteName: string;
  className?: string;
}

export function Navbar({ navLinks, siteName, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set initial scroll state immediately without transition
    setScrolled(window.scrollY > 20);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Delay enabling transitions so the initial state renders without animation
    const timer = setTimeout(() => setMounted(true), 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

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
        "fixed top-0 left-0 right-0 z-50",
        mounted ? "transition-all duration-500" : "",
        "glass-strong shadow-lg shadow-black/10",
        className
      )}
    >
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 md:px-[60px] py-5 max-w-[1440px] mx-auto"
      >
        <a
          href="#home"
          className="font-display text-[32px] leading-normal text-gradient tracking-tight"
        >
          {siteName}
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 rounded-full text-text-secondary font-body font-medium text-sm leading-relaxed transition-all duration-200 hover:text-text-primary hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="lg:hidden text-text-secondary p-2.5 rounded-xl transition-all duration-200 hover:text-text-primary hover:bg-white/5"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-strong mx-4 mb-4 rounded-2xl">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-text-secondary font-body font-medium text-base py-3 px-4 rounded-xl transition-all duration-200 hover:text-text-primary hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GradualBlur
        position="bottom"
        height="2.5rem"
        strength={2}
        divCount={6}
        curve="ease-out"
        target="page"
        zIndex={40}
      />
    </header>
  );
}
