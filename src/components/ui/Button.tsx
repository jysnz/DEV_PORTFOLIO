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
    "inline-flex items-center justify-center h-[54px] rounded-full bg-accent text-text-dark font-body font-bold text-base uppercase transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]";

  const variantStyles = {
    primary: "pl-6 pr-1.5 gap-3",
    submit: "px-10",
  };

  const content = (
    <>
      <span>{children}</span>
      {variant === "primary" && (
        <span className="flex items-center justify-center size-[42px] rounded-full bg-text-dark/15">
          <ArrowUpRightIcon className="size-5 text-text-dark" />
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
