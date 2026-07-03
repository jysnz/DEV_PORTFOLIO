"use client";

import { useLayoutEffect } from "react";

export function ThemeInit() {
  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      const isDark = t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } catch {
      // ignore
    }
  }, []);

  return null;
}
