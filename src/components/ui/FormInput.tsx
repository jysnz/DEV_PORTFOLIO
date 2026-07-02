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
    "relative block w-full bg-paper-input rounded-sm px-4 py-3 text-lg text-ink font-body border-none placeholder:text-ink-muted/40 outline-none ring-0 focus:outline-none focus:ring-0";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={name}
        className="text-ink-muted text-base font-medium font-body leading-relaxed"
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
