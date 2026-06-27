import { cn } from "@/lib/utils";

export interface ProjectTagProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectTag({ children, className }: ProjectTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-accent text-accent font-body font-medium text-xs uppercase tracking-wider",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
