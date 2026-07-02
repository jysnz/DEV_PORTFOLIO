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
        "group inline-flex flex-col gap-1 items-start focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
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
      <svg
        className="w-full h-2 text-accent"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M1,4 Q10,1 20,4 T40,4 T60,4 T80,4 T99,4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          pathLength={100}
          className="sketch-underline-path"
        />
      </svg>
    </a>
  );
}
