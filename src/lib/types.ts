export interface Project {
  title: string;
  description: string;
  tag?: string;
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

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "twitter" | "instagram";
}
