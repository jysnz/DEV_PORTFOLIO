// This file now only exports static fallbacks used by client components
// that need data synchronously (like Navbar). The actual data is fetched
// from Supabase in Server Components via lib/queries.ts.

import type { NavLink, SocialLink } from "./types";

// Fallback values used during build/ISR when database is unavailable
export const siteConfigFallback = {
  name: "Zephyr",
  title: "hi, i am Jayson Dela Cruz.",
  subtitle:
    "A 4th-year information technology student. A Philippines representative in the Vex Robotics World Championship. An aspiring full-stack developer.",
  email: "delacruz.jayson.delafuente@gmail.com",
  copyright: "© 2026 Zephyr",
  hero_image_url: null,
};

export const navLinksFallback: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Achievements", href: "#achievements" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socialLinksFallback: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
];

export const aboutDescriptionFallback = {
  headline:
    "Developer, competitor, builder — I turn complex problems into elegant solutions.",
  body: "I'm a full-stack developer and 4th-year IT student at Quezon City University with a passion for building accessible, performant web applications. As a Philippine national representative at the VEX Robotics World Championship in Dallas, Texas, I bring the same precision and teamwork from competitive robotics into every line of code I write.",
  philosophy:
    "I believe great software starts with empathy — understanding what users actually need, then crafting experiences that feel effortless. Whether it's a responsive UI, a robust API, or an autonomous robot, the goal is always the same: solve real problems with clean, maintainable solutions.",
  highlights: [
    { label: "Focus", value: "Full-Stack Web & Mobile" },
    { label: "Experience", value: "VEX Worlds Representative" },
  ],
};
