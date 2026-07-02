"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/assets/icons";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

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
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLAnchorElement | HTMLButtonElement>({
    radius: 27,
    withEmphasis: true,
  });

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center h-[54px] rounded-full bg-accent text-accent-contrast font-body font-bold text-base uppercase transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    "border",
    ready ? "border-transparent" : "border-line"
  );

  const variantStyles = {
    primary: "pl-6 pr-1.5 gap-3",
    submit: "px-10",
  };

  const content = (
    <>
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <span className="relative">{children}</span>
      {variant === "primary" && (
        <span className="relative flex items-center justify-center size-[42px] rounded-full bg-accent-contrast/15">
          <ArrowUpRightIcon className="size-5 text-accent-contrast" />
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
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {content}
    </button>
  );
}
