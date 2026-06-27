"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/3d/AnimateIn";
import { cn } from "@/lib/utils";
import type { TechItem } from "@/lib/types";

const TechOrbs = dynamic(
  () => import("@/components/3d/TechOrbs").then((mod) => mod.TechOrbs),
  { ssr: false }
);

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

export interface TechStackProps {
  techStack: TechItem[];
}

export function TechStack({ techStack }: TechStackProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filtered =
    activeCategory === "all"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <Section id="tech-stack" ariaLabel="Tech Stack">
      <div className="flex flex-col gap-12 lg:gap-16">
        <AnimateIn>
          <div className="flex flex-col gap-3 max-w-[600px]">
            <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-gradient">
              Tech Stack
            </h2>
            <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={100} direction="scale">
          <div className="rounded-2xl glass overflow-hidden">
            <TechOrbs />
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "px-4 py-2 rounded-full font-body font-medium text-sm transition-all duration-300",
                  activeCategory === cat.key
                    ? "bg-accent text-text-dark shadow-[0_0_20px_rgba(195,177,255,0.3)]"
                    : "glass text-text-secondary hover:text-text-primary hover:border-white/15"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((tech, i) => (
            <AnimateIn key={tech.name} delay={i * 50} direction="scale">
              <div className="group flex items-center justify-center p-4 rounded-xl glass transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(195,177,255,0.08)] hover:scale-105 cursor-default">
                <span className="font-body font-semibold text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
