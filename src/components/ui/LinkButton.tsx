import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, GitHubIcon } from "@/assets/icons";

export interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  type?: "demo" | "github";
  className?: string;
}

export function LinkButton({ href, children, type = "demo", className }: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex flex-col gap-1 items-start transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className
      )}
    >
      <span className="inline-flex items-center gap-1 text-accent font-body font-bold text-base uppercase leading-normal">
        {children}
        {type === "demo" ? (
          <ArrowUpRightIcon className="size-6 text-accent" />
        ) : (
          <GitHubIcon className="size-[26px] text-accent" />
        )}
      </span>
      <span className="block h-0.5 w-full bg-accent" />
    </a>
  );
}
