"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section currently crosses the middle band of the viewport.
 * At the very bottom of the page the last section is forced active, so short
 * final sections (e.g. Contact) still highlight.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const pickActive = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }
      let best: IntersectionObserverEntry | null = null;
      for (const entry of visible.values()) {
        if (!best || entry.boundingClientRect.top < best.boundingClientRect.top) {
          best = entry;
        }
      }
      if (best) setActive(best.target.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        }
        pickActive();
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", pickActive, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
    };
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
