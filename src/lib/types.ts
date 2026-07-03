export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  tag?: string;
  image_url?: string;
  info: ProjectInfo[];
  links: ProjectLink[];
  repositories?: Repository[];
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

export interface ProjectInfo {
  topic: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type: "demo" | "github";
}

export interface Repository {
  label: string;
  href: string;
}

export interface ProjectTechItem {
  name: string;
  icon_url?: string | null;
}

export interface Project {
  title: string;
  description: string;
  tag?: string | null;
  image_url?: string | null;
  tech_stack?: ProjectTechItem[] | null;
  info: ProjectInfo[];
  links: ProjectLink[];
  repositories?: Repository[] | null;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
}

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "mobile" | "tools" | "database";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutDescription {
  headline: string;
  body: string;
  philosophy: string;
  highlights: AboutHighlight[];
}


export interface Recommendation {
  name: string;
  role: string;
  company?: string | null;
  avatar_url?: string | null;
  quote: string;
}

export interface Publication {
  title: string;
  authors: string;
  journal?: string | null;
  conference?: string | null;
  year: string;
  abstract?: string | null;
  doi?: string | null;
  url?: string | null;
  tags: string[];
}


export interface Certification {
  title: string;
  issuer: string;
  date_issued: string;
  credential_url?: string | null;
  description?: string | null;
  image_url?: string | null;
}
