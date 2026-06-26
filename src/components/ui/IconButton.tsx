import { cn } from "@/lib/utils";

export interface IconButtonProps {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ href, label, children, className }: IconButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center size-[54px] rounded-full bg-bg-icon text-text-secondary transition-colors duration-150 hover:bg-accent hover:text-text-dark focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className
      )}
    >
      {children}
    </a>
  );
}
