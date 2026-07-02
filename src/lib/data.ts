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
    "I am a full stack developer. A 4th Year Information Technology Student at Quezon City University. And a national player for VEX Robotics World Championship",
  body: "I am a full-stack developer and 4th-year Information Technology student at Quezon City University. As a Philippine representative in the VEX Robotics World Championship held in St. Louis, Missouri, I bring discipline, teamwork, and sharp problem-solving to every project I build. I focus on creating accessible, user-centered applications using modern technologies like React, Next.js, Flutter, and Python. When I'm not coding, you'll find me tinkering with robots, exploring new frameworks, or competing in tech competitions. Always learning, always building.",
};
