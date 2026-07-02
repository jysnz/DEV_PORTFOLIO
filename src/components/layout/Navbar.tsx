"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { useActiveSection } from "@/lib/useActiveSection";
import { MenuIcon, CloseIcon } from "@/assets/icons";
import type { NavLink } from "@/lib/types";

export interface NavbarProps {
  navLinks: NavLink[];
  siteName: string;
  className?: string;
}

export function Navbar({ navLinks, siteName, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    [navLinks]
  );
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    // Delay enabling transitions so the initial state renders without animation
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        mounted ? "transition-all duration-500" : "",
        "glass-strong shadow-lg",
        scrolled ? "shadow-black/25" : "shadow-black/10",
        className
      )}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex items-center justify-between px-6 md:px-[60px] lg:px-[108px] max-w-[1440px] mx-auto",
          mounted ? "transition-[padding] duration-300" : "",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <a
          href="#home"
          className="font-display text-[32px] leading-normal text-gradient tracking-tight"
        >
          {siteName}
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-4 py-2 rounded-full font-body font-medium text-sm leading-relaxed transition-all duration-200",
                    isActive
                      ? "text-text-primary bg-white/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 -bottom-0.5 size-1 rounded-full bg-accent transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="lg:hidden text-text-secondary p-2.5 rounded-xl transition-all duration-200 hover:text-text-primary hover:bg-white/5 cursor-pointer"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <div
        inert={!isOpen}
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-strong mx-4 mb-4 rounded-2xl">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "block font-body font-medium text-base py-3 px-4 rounded-xl transition-all duration-200",
                      isActive
                        ? "text-text-primary bg-white/10"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
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
