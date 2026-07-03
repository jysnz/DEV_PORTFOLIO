"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";

export interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  className,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLDivElement>({
    radius: 8,
    withEmphasis: true,
    roughness: 1.5,
    emphasisStrokeWidth: 3,
  });

  const inputStyles =
    "w-full glass rounded-xl px-4 py-3.5 text-base text-text-primary font-body placeholder:text-text-secondary/40 transition-all duration-300 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(195,177,255,0.1)] focus:outline-none hover:border-white/15";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={name}
        className="text-text-secondary text-sm font-medium font-body leading-relaxed"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <div
        ref={containerRef}
        className={cn(
          "relative rounded-sm border",
          ready ? "border-transparent" : "border-line"
        )}
      >
        {/* Base sketch border - always visible */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
        />

        {/* Emphasis sketch border - visible on focus */}
        <svg
          ref={emphasisSvgRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 w-full h-full overflow-visible transition-opacity duration-200",
            focused ? "opacity-70" : "opacity-0"
          )}
        />

        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            rows={5}
            className={cn(inputStyles, "resize-none")}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={inputStyles}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}
      </div>
    </div>
  );
}
