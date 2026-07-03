"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/assets/icons";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "submit" | "secondary";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "group relative overflow-hidden btn-shine inline-flex items-center justify-center h-[52px] rounded-full font-body font-bold text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none";

  const variantStyles = {
    primary:
      "bg-accent text-text-dark pl-6 pr-1.5 gap-3 hover:shadow-[0_0_30px_rgba(195,177,255,0.4)] hover:scale-[1.03] active:scale-[0.98]",
    submit:
      "bg-accent text-text-dark px-8 hover:shadow-[0_0_30px_rgba(195,177,255,0.4)] hover:scale-[1.03] active:scale-[0.98]",
    secondary:
      "glass text-text-primary px-8 hover:border-accent/40 hover:text-accent hover:scale-[1.03] active:scale-[0.98]",
  };

  const content = (
    <>
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <span className="relative">{children}</span>
      {variant === "primary" && (
        <span className="flex items-center justify-center size-[38px] rounded-full bg-text-dark/15 transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRightIcon className="size-4 text-text-dark" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={containerRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={containerRef as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {content}
    </button>
  );
}
