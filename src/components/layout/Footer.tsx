import { siteConfig } from "@/lib/data";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <p className={className ?? "text-ink-muted font-body font-medium text-base leading-relaxed"}>
      {siteConfig.copyright}
    </p>
  );
}
