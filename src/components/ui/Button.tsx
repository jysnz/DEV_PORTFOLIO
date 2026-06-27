import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/assets/icons";

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "submit";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center h-[52px] rounded-full font-body font-bold text-sm uppercase tracking-wide transition-all duration-300";

  const variantStyles = {
    primary:
      "bg-accent text-text-dark pl-6 pr-1.5 gap-3 hover:shadow-[0_0_30px_rgba(195,177,255,0.4)] hover:scale-[1.03] active:scale-[0.98]",
    submit:
      "bg-accent text-text-dark px-8 hover:shadow-[0_0_30px_rgba(195,177,255,0.4)] hover:scale-[1.03] active:scale-[0.98]",
  };

  const content = (
    <>
      <span>{children}</span>
      {variant === "primary" && (
        <span className="flex items-center justify-center size-[38px] rounded-full bg-text-dark/15 transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRightIcon className="size-4 text-text-dark" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(baseStyles, variantStyles[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {content}
    </button>
  );
}
