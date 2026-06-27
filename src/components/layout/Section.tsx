import { cn } from "@/lib/utils";

export interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  ariaLabel?: string;
}

export function Section({ id, children, className, divider = false, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-16 lg:py-24",
        divider && "border-t border-white/[0.06]",
        className
      )}
    >
      {children}
    </section>
  );
}
