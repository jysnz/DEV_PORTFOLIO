"use client";

import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/3d/AnimateIn";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { SplitText } from "@/components/ui/SplitText";
import type { Achievement } from "@/lib/types";

export interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Section id="achievements" ariaLabel="Achievements">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-3 max-w-[600px]">
          <h2
            aria-label="Achievements"
            className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none"
          >
            <SplitText text="Achievements" trigger="scroll" stagger={22} />
          </h2>
          <AnimateIn delay={200}>
            <p className="font-body font-normal text-sm lg:text-base leading-relaxed text-text-secondary">
              Milestones that define my journey in technology and robotics.
            </p>
          </AnimateIn>
        </div>

        {achievements.length === 0 && (
          <AnimateIn>
            <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl glass">
              <div className="flex items-center justify-center size-12 rounded-full bg-accent/10">
                <svg className="size-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 13.125 11h-2.25A3.375 3.375 0 0 0 7.5 14.25v4.5m6-6V6.75A2.25 2.25 0 0 0 11.25 4.5h-.5A2.25 2.25 0 0 0 8.5 6.75V9" />
                </svg>
              </div>
              <p className="font-body font-semibold text-base text-text-primary">
                Milestones coming soon
              </p>
              <p className="font-body text-sm text-text-secondary max-w-[360px]">
                This section is being updated with new achievements.
              </p>
            </div>
          </AnimateIn>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {achievements.map((achievement, i) => (
            <AnimateIn key={achievement.title} delay={i * 150} direction="up" blur duration={800}>
              <BorderGlow
                className="h-full group backdrop-blur-[12px]"
                innerClassName="flex flex-col gap-4 p-6 lg:p-8 h-full"
                backgroundColor="rgba(255, 255, 255, 0.03)"
                borderRadius={16}
                glowColor="258 60 85"
                colors={["#C3B1FF", "#9b7fff", "#7c3aed"]}
                glowIntensity={1.0}
                glowRadius={40}
                animated
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-accent/10 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="size-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 13.125 11h-2.25A3.375 3.375 0 0 0 7.5 14.25v4.5m6-6V6.75A2.25 2.25 0 0 0 11.25 4.5h-.5A2.25 2.25 0 0 0 8.5 6.75V9" />
                    </svg>
                  </div>
                  <span className="shrink-0 font-body font-semibold text-xs text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {achievement.year}
                  </span>
                </div>

                <h3 className="font-body font-semibold text-lg lg:text-xl leading-[1.3] text-text-primary">
                  {achievement.title}
                </h3>

                <p className="font-body font-normal text-sm leading-relaxed text-text-secondary flex-1">
                  {achievement.description}
                </p>

                {achievement.location && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                    <svg className="size-3.5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span className="font-body font-medium text-xs text-text-secondary/80">
                      {achievement.location}
                    </span>
                  </div>
                )}
              </BorderGlow>
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
