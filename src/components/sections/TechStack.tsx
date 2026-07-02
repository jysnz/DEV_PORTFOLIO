"use client";

import { useState } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiFlutter, SiPython, SiNodedotjs, SiFirebase,
  SiPostgresql, SiSupabase, SiGit, SiDocker,
  SiJavascript, SiHtml5, SiCss, SiPrisma,
  SiMongodb, SiRedis, SiGraphql, SiFigma,
  SiSwift, SiKotlin, SiRust, SiGo,
  SiVuedotjs, SiAngular, SiSvelte, SiAstro,
  SiVercel, SiGithub, SiLinux, SiExpress,
  SiFastapi, SiDjango, SiFlask, SiDart,
  SiMysql, SiSqlite, SiGooglecloud,
  SiCplusplus, SiC, SiOpenjdk, SiPhp,
  SiLaravel, SiSpring, SiNuxt, SiRemix,
  SiStripe, SiThreedotjs, SiWebpack, SiVite,
  SiJest, SiVitest, SiStorybook, SiElectron,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/3d/AnimateIn";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { SplitText } from "@/components/ui/SplitText";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { cn } from "@/lib/utils";
import type { TechItem } from "@/lib/types";

const techIconMap: Record<string, IconType> = {
  "react": SiReact,
  "next.js": SiNextdotjs,
  "nextjs": SiNextdotjs,
  "typescript": SiTypescript,
  "tailwind": SiTailwindcss,
  "tailwind css": SiTailwindcss,
  "flutter": SiFlutter,
  "python": SiPython,
  "node.js": SiNodedotjs,
  "nodejs": SiNodedotjs,
  "firebase": SiFirebase,
  "postgresql": SiPostgresql,
  "postgres": SiPostgresql,
  "supabase": SiSupabase,
  "git": SiGit,
  "docker": SiDocker,
  "javascript": SiJavascript,
  "js": SiJavascript,
  "html": SiHtml5,
  "html5": SiHtml5,
  "css": SiCss,
  "css3": SiCss,
  "prisma": SiPrisma,
  "mongodb": SiMongodb,
  "redis": SiRedis,
  "graphql": SiGraphql,
  "figma": SiFigma,
  "swift": SiSwift,
  "kotlin": SiKotlin,
  "rust": SiRust,
  "go": SiGo,
  "golang": SiGo,
  "vue": SiVuedotjs,
  "vue.js": SiVuedotjs,
  "angular": SiAngular,
  "svelte": SiSvelte,
  "astro": SiAstro,
  "vercel": SiVercel,
  "github": SiGithub,
  "linux": SiLinux,
  "express": SiExpress,
  "express.js": SiExpress,
  "fastapi": SiFastapi,
  "django": SiDjango,
  "flask": SiFlask,
  "dart": SiDart,
  "mysql": SiMysql,
  "sqlite": SiSqlite,
  "gcp": SiGooglecloud,
  "google cloud": SiGooglecloud,
  "c++": SiCplusplus,
  "c": SiC,
  "java": SiOpenjdk,
  "php": SiPhp,
  "laravel": SiLaravel,
  "spring": SiSpring,
  "nuxt": SiNuxt,
  "nuxt.js": SiNuxt,
  "remix": SiRemix,
  "stripe": SiStripe,
  "three.js": SiThreedotjs,
  "threejs": SiThreedotjs,
  "webpack": SiWebpack,
  "vite": SiVite,
  "jest": SiJest,
  "vitest": SiVitest,
  "storybook": SiStorybook,
  "electron": SiElectron,
};

const categoryMeta: Record<
  string,
  { color: string; glow: string; icon: React.ReactNode }
> = {
  frontend: {
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.12)",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 11L2 8l3.5-3M10.5 5L14 8l-3.5 3M9 4l-2 8" />
      </svg>
    ),
  },
  backend: {
    color: "#68A063",
    glow: "rgba(104,160,99,0.12)",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth={1.5}>
        <rect x="1.5" y="2" width="13" height="4.5" rx="1" />
        <rect x="1.5" y="9.5" width="13" height="4.5" rx="1" />
        <circle cx="12.5" cy="4.25" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="12.5" cy="11.75" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  mobile: {
    color: "#0175C2",
    glow: "rgba(1,117,194,0.12)",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="1" width="8" height="14" rx="1.5" />
        <circle cx="8" cy="12.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  database: {
    color: "#FF6C37",
    glow: "rgba(255,108,55,0.12)",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth={1.5}>
        <ellipse cx="8" cy="4" rx="5.5" ry="2" />
        <path strokeLinecap="round" d="M2.5 4v3.5c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2V4" />
        <path strokeLinecap="round" d="M2.5 7.5V11c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2V7.5" />
      </svg>
    ),
  },
  tools: {
    color: "#C3B1FF",
    glow: "rgba(195,177,255,0.12)",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 00-3 3c0 .4.04.78.12 1.15L2.5 12.5l1 1L10.85 6.88A3 3 0 1012 2z" />
      </svg>
    ),
  },
};

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

function TechCard({ tech }: { tech: TechItem }) {
  const meta = categoryMeta[tech.category];
  const Icon = techIconMap[tech.name.toLowerCase()];
  return (
    <div className="group relative flex items-center gap-3 p-3.5 rounded-xl glass transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:shadow-lg hover:shadow-black/20 cursor-default overflow-hidden h-full">
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{ backgroundColor: meta.color, opacity: 0.7 }}
      />
      <div
        className="flex items-center justify-center size-9 rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
      >
        {Icon ? <Icon className="size-[18px]" /> : meta.icon}
      </div>
      <span className="font-body font-medium text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300 leading-tight">
        {tech.name}
      </span>
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 10% 50%, ${meta.glow}, transparent 70%)`,
        }}
      />
    </div>
  );
}

function TechLogoItem({ tech }: { tech: TechItem }) {
  const Icon = techIconMap[tech.name.toLowerCase()];
  const meta = categoryMeta[tech.category];
  return (
    <div
      className="group flex flex-col items-center gap-2"
      style={{ width: "80px", flexShrink: 0 }}
    >
      <div
        className="flex items-center justify-center size-12 transition-all duration-300 group-hover:scale-110"
        style={{ color: meta.color, fontSize: "2rem" }}
      >
        {Icon ? <Icon /> : (
          <span className="font-body font-bold text-sm text-center leading-tight">
            {tech.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="font-body font-medium text-[11px] text-text-secondary/60 group-hover:text-text-secondary transition-colors duration-300 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

export function TechStack({ techStack }: TechStackProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filtered =
    activeCategory === "all"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  const getCategoryCount = (key: string) =>
    key === "all"
      ? techStack.length
      : techStack.filter((t) => t.category === key).length;

  const grouped = (
    categories.filter((c) => c.key !== "all") as Array<{
      key: Exclude<CategoryKey, "all">;
      label: string;
    }>
  )
    .map((c) => ({
      ...c,
      items: techStack.filter((t) => t.category === c.key),
    }))
    .filter((g) => g.items.length > 0);

  const logoItems = techStack.map((tech) => ({
    node: <TechLogoItem tech={tech} />,
    title: tech.name,
  }));

  return (
    <Section id="tech-stack" ariaLabel="Tech Stack">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-3 max-w-[600px]">
            <h2
              aria-label="Tech Stack"
              className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none"
            >
              <SplitText text="Tech Stack" trigger="scroll" stagger={22} />
            </h2>
            <AnimateIn delay={200}>
              <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
                Technologies and tools I use to bring ideas to life.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn delay={100}>
            <BorderGlow
              backgroundColor="#0a0118"
              borderRadius={16}
              glowColor="258 60 85"
              colors={["#C3B1FF", "#9b7fff", "#7c3aed"]}
              glowIntensity={1.0}
              glowRadius={40}
              innerClassName="py-6 rounded-2xl"
            >
              <LogoLoop
                logos={logoItems}
                speed={55}
                direction="left"
                logoHeight={80}
                gap={40}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="#0a0118"
                ariaLabel="Tech stack logos"
              />
            </BorderGlow>
          </AnimateIn>
        </div>

        {techStack.length === 0 && (
          <AnimateIn>
            <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl glass">
              <div className="flex items-center justify-center size-12 rounded-full bg-accent/10">
                <svg className="size-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 00-3 3c0 .4.04.78.12 1.15L2.5 12.5l1 1L10.85 6.88A3 3 0 1012 2z" />
                </svg>
              </div>
              <p className="font-body font-semibold text-base text-text-primary">
                Tech stack coming soon
              </p>
              <p className="font-body text-sm text-text-secondary max-w-[360px]">
                This section is being updated with the tools and technologies I use.
              </p>
            </div>
          </AnimateIn>
        )}

        <AnimateIn delay={200} className={techStack.length === 0 ? "hidden" : undefined}>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = getCategoryCount(cat.key);
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-body font-medium text-sm transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-accent text-text-dark shadow-[0_0_20px_rgba(195,177,255,0.3)]"
                      : "glass text-text-secondary hover:text-text-primary hover:border-white/15"
                  )}
                >
                  {cat.key !== "all" && (
                    <span
                      className="flex items-center justify-center"
                      style={!isActive ? { color: categoryMeta[cat.key].color } : undefined}
                    >
                      {categoryMeta[cat.key].icon}
                    </span>
                  )}
                  {cat.label}
                  <span
                    className={cn(
                      "text-xs font-normal tabular-nums px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center",
                      isActive
                        ? "bg-black/20 text-text-dark/70"
                        : "bg-white/[0.07] text-text-secondary/70"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimateIn>

        {activeCategory === "all" ? (
          <div className="flex flex-col gap-12">
            {grouped.map((group, gi) => {
              const meta = categoryMeta[group.key];
              return (
                <AnimateIn key={group.key} delay={gi * 80}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center size-5 rounded-md"
                        style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                      >
                        {meta.icon}
                      </div>
                      <span className="font-body font-semibold text-xs uppercase tracking-widest text-text-secondary/60">
                        {group.label}
                      </span>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="font-body text-xs text-text-secondary/40">
                        {group.items.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {group.items.map((tech, i) => (
                        <AnimateIn
                          key={tech.name}
                          delay={gi * 40 + i * 40}
                          direction="scale"
                          className="h-full"
                        >
                          <TechCard tech={tech} />
                        </AnimateIn>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((tech, i) => (
              <AnimateIn key={tech.name} delay={i * 50} direction="scale" className="h-full">
                <TechCard tech={tech} />
              </AnimateIn>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
