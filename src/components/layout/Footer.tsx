export interface FooterProps {
  copyright: string;
  className?: string;
}

export function Footer({ copyright, className }: FooterProps) {
  return (
    <p className={className ?? "text-text-secondary/60 font-body font-medium text-xs tracking-wide"}>
      {copyright}
    </p>
  );
}
