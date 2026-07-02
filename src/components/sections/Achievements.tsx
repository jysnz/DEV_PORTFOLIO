import { Section } from "@/components/layout/Section";
import { AchievementCard } from "@/components/cards/AchievementCard";
import type { Achievement } from "@/lib/types";

export interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Section id="achievements" divider ariaLabel="Achievements">
      <div className="flex flex-col gap-10 lg:gap-12">
        {/* Title */}
        <div>
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink">
            Achievements
          </h2>
        </div>

        {/* Achievement grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </div>
      </div>
    </Section>
  );
}
