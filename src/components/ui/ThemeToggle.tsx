"use client";

import { cn } from "@/lib/utils";
import { SunIcon, MoonIcon } from "@/assets/icons";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={cn(
        "flex items-center justify-center size-10 rounded-full text-ink-muted transition-colors duration-150 hover:text-accent hover:bg-paper-input cursor-pointer",
        className
      )}
    >
      <SunIcon className="hidden dark:block size-5" />
      <MoonIcon className="block dark:hidden size-5" />
    </button>
  );
}
