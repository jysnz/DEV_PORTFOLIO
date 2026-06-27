export interface Project {
  title: string;
  description: string;
  tag?: string;
  image_url?: string;
  info: ProjectInfo[];
  links: ProjectLink[];
  repositories?: Repository[];
}

export interface Repository {
  label: string;
  href: string;
}

export interface ProjectInfo {
  topic: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type: "demo" | "github";
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  location?: string;
}

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "mobile" | "tools" | "database";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "twitter" | "instagram";
}
