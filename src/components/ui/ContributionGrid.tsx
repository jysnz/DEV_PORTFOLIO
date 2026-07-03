import type { ContributionData, ContributionDay } from "@/lib/github";

export interface ContributionGridProps {
  data: ContributionData;
}

function getLevelClass(level: ContributionDay["contributionLevel"]): string {
  switch (level) {
    case "NONE":
      return "bg-line/10";
    case "FIRST_QUARTILE":
      return "bg-accent/25";
    case "SECOND_QUARTILE":
      return "bg-accent/50";
    case "THIRD_QUARTILE":
      return "bg-accent/75";
    case "FOURTH_QUARTILE":
      return "bg-accent";
    default:
      return "bg-line/10";
  }
}

export function ContributionGrid({ data }: ContributionGridProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-[28px] md:text-[36px] leading-none text-ink">
          GitHub Contributions
        </h3>
        <span className="font-body font-medium text-sm text-ink-muted">
          {data.totalContributions.toLocaleString()} in the last year
        </span>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-fit">
          {data.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] lg:w-[12px] lg:h-[12px] rounded-[1px] border border-line/20 ${getLevelClass(day.contributionLevel)}`}
                  title={`${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 justify-end">
        <span className="font-body text-xs text-ink-muted">Less</span>
        <div className="flex gap-[3px]">
          <div className="w-[10px] h-[10px] rounded-[1px] border border-line/20 bg-line/10" />
          <div className="w-[10px] h-[10px] rounded-[1px] border border-line/20 bg-accent/25" />
          <div className="w-[10px] h-[10px] rounded-[1px] border border-line/20 bg-accent/50" />
          <div className="w-[10px] h-[10px] rounded-[1px] border border-line/20 bg-accent/75" />
          <div className="w-[10px] h-[10px] rounded-[1px] border border-line/20 bg-accent" />
        </div>
        <span className="font-body text-xs text-ink-muted">More</span>
      </div>
    </div>
  );
}
