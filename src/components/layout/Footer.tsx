export interface FooterProps {
  copyright?: string;
  className?: string;
}

export function Footer({ copyright, className }: FooterProps) {
  return (
    <p className={className ?? "text-ink-muted font-body font-medium text-base leading-relaxed"}>
      {copyright ?? "© 2026 Zephyr"}
    </p>
  );
}
