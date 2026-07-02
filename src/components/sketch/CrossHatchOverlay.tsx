import { cn } from "@/lib/utils";

export interface CrossHatchOverlayProps {
  className?: string;
}

/** Fades in a cross-hatch shading pattern on hover of an ancestor with the `group` class. */
export function CrossHatchOverlay({ className }: CrossHatchOverlayProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-[0.03] mix-blend-multiply dark:mix-blend-screen",
        className
      )}
    >
      <rect width="100%" height="100%" fill="url(#crosshatch)" />
    </svg>
  );
}
