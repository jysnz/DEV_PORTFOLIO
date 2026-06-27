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
