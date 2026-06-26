import type { Project, NavLink, SocialLink, Achievement } from "./types";

export const siteConfig = {
  name: "Zephyr",
  title: "hi, i am Jayson Dela Cruz.",
  subtitle:
    "A 4th-year information technology student. A Philippines representative in the Vex Robotics World Championship. An aspiring full-stack developer.",
  email: "delacruz.jayson.delafuente@gmail.com",
  copyright: "© 2026 Zephyr",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
];

export const projects: Project[] = [
  {
    title: "AI-SKINWISE - A Mobile App Skin Disease Detection System with Smart App",
    description:
      "A skin disease detection system built using Flutter, Dart and Python. It lets you to scan your skin for potential skin disease using phone camera. After scanning, it lets you connect to nearest clinics and make a check up for the detected skin disease in both onsite and online (Google Meet). It also let you browse through clinics' products and services.",
    tag: "Conceptual Work",
    info: [
      { topic: "Year", value: "2024 - Present" },
      { topic: "Role", value: "Full-Stack Developer" },
    ],
    links: [],
    repositories: [
      { label: "Mobile App (User side)", href: "https://github.com/jysnz/AI-SKINWISE-V2" },
      { label: "Mobile App (Derma Side)", href: "https://github.com/jysnz/AI-SKINWISE-V2-DERMA" },
      { label: "Backend", href: "https://github.com/jysnz/AI-SKINWISE-V2-SERVER" },
    ],
  },
  {
    title: "QCU Robotics Society Website",
    description:
      "A website for Quezon City Robotics Website that displays all the tournaments, awards, members and the video footage of the matches",
    info: [
      { topic: "Year", value: "2025" },
      { topic: "Role", value: "Full-Stack Developer" },
    ],
    links: [],
    repositories: [
      { label: "Website", href: "https://github.com/jysnz/QCU-ROBOTICS-WEBSITE" },
    ],
  },
  {
    title: "QCU Robotics Website Content Management System",
    description:
      "A content management system for QCU Robotics Website that lets you manage the QCU Robotics Society",
    info: [
      { topic: "Year", value: "2025" },
      { topic: "Role", value: "Full Stack Developer" },
    ],
    links: [],
    repositories: [
      { label: "Website", href: "https://github.com/jysnz/QCUROBOTICS_WEBSITE_CMS" },
    ],
  },
  {
    title: "QCU Robotics Match Management System",
    description:
      "A QCU Robotics Match Management System that lets you generate matches for mock tournaments and scrimmages",
    info: [
      { topic: "Year", value: "2025" },
      { topic: "Role", value: "Full Stack Developer" },
    ],
    links: [],
    repositories: [
      { label: "Website", href: "https://github.com/jysnz/QCUROBOTICS_MATCH_MANAGEMENT" },
    ],
  },
  {
    title: "QCU Robotics Match Real Time Display",
    description:
      "A QCU Robotics Match Real Time Display that lets you see real time all the events in a tournament",
    info: [
      { topic: "Year", value: "2025" },
      { topic: "Role", value: "Full Stack Developer" },
    ],
    links: [],
    repositories: [
      { label: "Website", href: "https://github.com/jysnz/qcurobotics_match_management_display" },
    ],
  },
  {
    title: "QCUR Apex",
    description:
      "A QCU Robotics Evaluation system that lets you manage trainees and track their performances",
    info: [
      { topic: "Year", value: "2025" },
      { topic: "Role", value: "Full Stack Developer" },
    ],
    links: [],
    repositories: [
      { label: "Mobile App", href: "https://github.com/jysnz/qcurobotics_match_management_display" },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: "Philippine Representative — VEX Robotics World Championship",
    description:
      "Represented the Philippines in the VEX Robotics World Championship, competing against teams from around the globe in designing, building, and programming autonomous and driver-controlled robots.",
    year: "2026",
    location: "St. Louis, Missouri, USA",
  },
  {
    title: "1st Runner-Up — VEX Robotics National Championship",
    description:
      "Secured 1st runner-up at the VEX Robotics National Championship in the Philippines, demonstrating excellence in robotics engineering, strategic teamwork, and competitive programming.",
    year: "2026",
    location: "Philippines",
  },
];

export const aboutDescription = {
  headline:
    "I am a full stack developer. A 4th Year Information Technology Student at Quezon City University. And a national player for VEX Robotics World Championship",
  body: "I am a full-stack developer and 4th-year Information Technology student at Quezon City University. As a Philippine representative in the VEX Robotics World Championship held in St. Louis, Missouri, I bring discipline, teamwork, and sharp problem-solving to every project I build. I focus on creating accessible, user-centered applications using modern technologies like React, Next.js, Flutter, and Python. When I'm not coding, you'll find me tinkering with robots, exploring new frameworks, or competing in tech competitions. Always learning, always building.",
};
