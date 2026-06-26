interface IconProps {
  className?: string;
}

export function LinkedInIcon({ className = "size-[26px]" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5.5 3.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM1.25 6h4v14.5h-4V6Zm7.25 0h3.83v2h.05c.53-1 1.83-2.06 3.77-2.06 4.04 0 4.78 2.66 4.78 6.12v7.44h-4V12.8c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.88-2.77 3.82v7.82h-4V6h.74Z" />
    </svg>
  );
}

export function GitHubIcon({ className = "size-[26px]" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M13 1.625C6.71 1.625 1.625 6.71 1.625 13c0 5.03 3.26 9.29 7.78 10.8.57.1.78-.25.78-.55 0-.27-.01-.98-.02-1.93-3.16.69-3.83-1.53-3.83-1.53-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.53-.29-5.19-1.26-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.47 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.38-2.67 5.34-5.21 5.62.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.14 0 .31.21.66.79.55 4.51-1.51 7.77-5.77 7.77-10.8 0-6.29-5.09-11.375-11.375-11.375Z" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

export function TwitterIcon({ className = "size-8" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M28.77 8.51a10.56 10.56 0 0 1-3.04.83 5.3 5.3 0 0 0 2.33-2.93 10.6 10.6 0 0 1-3.36 1.29 5.29 5.29 0 0 0-9.01 4.82A15.02 15.02 0 0 1 4.8 7.28a5.29 5.29 0 0 0 1.64 7.06 5.26 5.26 0 0 1-2.4-.66v.07a5.29 5.29 0 0 0 4.24 5.18 5.3 5.3 0 0 1-2.39.09 5.3 5.3 0 0 0 4.94 3.67A10.61 10.61 0 0 1 4 25.09a14.97 14.97 0 0 0 8.1 2.37c9.72 0 15.04-8.05 15.04-15.03 0-.23 0-.45-.02-.68a10.73 10.73 0 0 0 2.63-2.74l.02-.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-8" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 9.38a6.62 6.62 0 1 0 0 13.25 6.62 6.62 0 0 0 0-13.25Zm0 10.92A4.3 4.3 0 1 1 16 12a4.3 4.3 0 0 1 0 8.3ZM23.88 9.11a1.55 1.55 0 1 1-3.09 0 1.55 1.55 0 0 1 3.1 0Z" />
      <path d="M27.94 7.54a5.55 5.55 0 0 0-3.48-3.48C22.8 3.5 20.56 3.5 16 3.5s-6.8 0-8.46.56a5.55 5.55 0 0 0-3.48 3.48C3.5 9.2 3.5 11.44 3.5 16s0 6.8.56 8.46a5.55 5.55 0 0 0 3.48 3.48c1.66.56 3.9.56 8.46.56s6.8 0 8.46-.56a5.55 5.55 0 0 0 3.48-3.48c.56-1.66.56-3.9.56-8.46s0-6.8-.56-8.46Zm-2.1 14.83a3.48 3.48 0 0 1-2.47 2.47c-1.41.44-4.74.34-6.37.34s-4.97.1-6.37-.34a3.48 3.48 0 0 1-2.47-2.47C7.72 20.97 7.82 17.63 7.82 16s-.1-4.97.34-6.37a3.48 3.48 0 0 1 2.47-2.47c1.4-.44 4.74-.34 6.37-.34s4.97-.1 6.37.34a3.48 3.48 0 0 1 2.47 2.47c.44 1.4.34 4.74.34 6.37s.1 4.97-.34 6.37Z" />
    </svg>
  );
}

export function MenuIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
