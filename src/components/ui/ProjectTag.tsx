import { cn } from "@/lib/utils";

export interface ProjectTagProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectTag({ children, className }: ProjectTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 rounded-full bg-bg-tag text-text-primary font-body font-medium text-sm leading-normal",
        className
      )}
    >
      {children}
    </span>
  );
}
