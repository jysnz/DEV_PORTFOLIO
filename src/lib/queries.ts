import { supabase } from "./supabase";
import type {
  SiteConfig,
  NavLink,
  SocialLink,
  Project,
  Achievement,
  TechStack,
} from "./types";

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("name, title, subtitle, email, copyright, hero_image_url")
    .single();

  if (error) throw new Error(`Failed to fetch site config: ${error.message}`);
  return data;
}

export async function getNavLinks(): Promise<NavLink[]> {
  const { data, error } = await supabase
    .from("nav_links")
    .select("label, href")
    .order("sort_order");

  if (error) throw new Error(`Failed to fetch nav links: ${error.message}`);
  return data;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from("social_links")
    .select("label, href, icon")
    .order("sort_order");

  if (error) throw new Error(`Failed to fetch social links: ${error.message}`);
  return data as SocialLink[];
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      title,
      description,
      tag,
      image_url,
      project_tech_stack(sort_order, tech_stack(name, icon_url)),
      project_info(topic, value, sort_order),
      project_links(label, href, type, sort_order),
      project_repositories(label, href, sort_order)
    `)
    .order("sort_order");

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);

  return data.map((project) => ({
    title: project.title,
    description: project.description,
    tag: project.tag,
    image_url: project.image_url,
    tech_stack: (project.project_tech_stack as unknown as { sort_order: number; tech_stack: { name: string; icon_url: string | null } }[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ tech_stack: ts }) => ({ name: ts.name, icon_url: ts.icon_url })),
    info: (project.project_info as { topic: string; value: string; sort_order: number }[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ topic, value }) => ({ topic, value })),
    links: (project.project_links as { label: string; href: string; type: string; sort_order: number }[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ label, href, type }) => ({ label, href, type: type as "demo" | "github" })),
    repositories: (project.project_repositories as { label: string; href: string; sort_order: number }[])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ label, href }) => ({ label, href })),
  }));
}

export async function getAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("title, description, year, location, latitude, longitude")
    .order("sort_order");

  if (error) throw new Error(`Failed to fetch achievements: ${error.message}`);
  return data;
}

export async function getTechStack(): Promise<TechStack[]> {
  const { data, error } = await supabase
    .from("tech_stack")
    .select("name, category, icon_url")
    .order("sort_order");

  if (error) throw new Error(`Failed to fetch tech stack: ${error.message}`);
  return data as TechStack[];
}
