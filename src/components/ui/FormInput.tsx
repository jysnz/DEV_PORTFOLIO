"use client";

import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";

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
  const { containerRef, svgRef, ready } = useRoughShape<HTMLDivElement>({ radius: 8 });

  const inputStyles =
    "block w-full bg-paper-input rounded-sm px-4 py-3 text-lg text-ink font-body border border-transparent placeholder:text-ink-muted/40 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent/50";

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
        className={cn("relative rounded-sm border", ready ? "border-transparent" : "border-line")}
      >
        <SketchBorder svgRef={svgRef} />
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            rows={5}
            className={cn(inputStyles, "resize-none")}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={inputStyles}
          />
        )}
      </div>
    </div>
  );
}
