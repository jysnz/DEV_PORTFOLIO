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
        "group inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent font-body font-semibold text-sm transition-all duration-300 hover:bg-accent/10 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(195,177,255,0.1)]",
        className
      )}
    >
      {type === "github" ? (
        <GitHubIcon className="size-4" />
      ) : (
        <ArrowUpRightIcon className="size-4" />
      )}
      <span>{children}</span>
    </a>
  );
}
