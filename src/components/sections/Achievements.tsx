import { Section } from "@/components/layout/Section";
import { achievements } from "@/lib/data";

export function Achievements() {
  return (
    <Section id="achievements" divider ariaLabel="Achievements">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Title */}
        <div className="lg:w-[45%] shrink-0">
          <h2 className="font-display text-[40px] md:text-[56px] lg:text-[76px] leading-none text-text-primary">
            Achievements
          </h2>
        </div>

        {/* Achievement list */}
        <div className="lg:flex-1 min-w-0 flex flex-col gap-10">
          {achievements.map((achievement) => (
            <article
              key={achievement.title}
              className="flex flex-col gap-4 p-6 lg:p-8 rounded-md bg-bg-card border border-border/30 transition-all duration-200 hover:border-accent/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <h3 className="font-body font-medium text-lg lg:text-2xl leading-[1.3] text-text-primary">
                  {achievement.title}
                </h3>
                <span className="shrink-0 font-body font-medium text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {achievement.year}
                </span>
              </div>
              <p className="font-body font-normal text-base lg:text-lg leading-relaxed text-text-secondary">
                {achievement.description}
              </p>
              {achievement.location && (
                <p className="font-body font-medium text-sm text-text-secondary/70 flex items-center gap-1.5">
                  <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {achievement.location}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
