import { cn } from "@/lib/utils";

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
  const inputStyles =
    "w-full bg-bg-input rounded-sm px-4 py-3 text-lg text-text-primary font-body border border-transparent placeholder:text-text-secondary/40 transition-all duration-200 hover:border-border focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={name}
        className="text-text-secondary text-base font-medium font-body leading-relaxed"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
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
  );
}
