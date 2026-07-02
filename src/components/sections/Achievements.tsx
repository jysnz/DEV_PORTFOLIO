import { Section } from "@/components/layout/Section";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { achievements } from "@/lib/data";

export function Achievements() {
  return (
    <Section id="achievements" divider ariaLabel="Achievements">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Title */}
        <div className="lg:w-[45%] shrink-0">
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-ink">
            Achievements
          </h2>
        </div>

        {/* Achievement list */}
        <div className="lg:flex-1 min-w-0 flex flex-col gap-10">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </div>
      </div>
    </Section>
  );
}
