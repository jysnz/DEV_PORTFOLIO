import { supabase } from "./supabase";
import type { Project, NavLink, SocialLink, Achievement, TechItem } from "./types";

export interface SiteConfig {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  copyright: string;
  hero_image_url: string | null;
}

export interface AboutDescription {
  headline: string;
  body: string;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getNavLinks(): Promise<NavLink[]> {
  const { data, error } = await supabase
    .from("nav_links")
    .select("label, href")
    .order("sort_order");

  if (error) throw error;
  return data;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from("social_links")
    .select("label, href, icon")
    .order("sort_order");

  if (error) throw error;
  return data as SocialLink[];
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      tag,
      image_url,
      project_info (topic, value, sort_order),
      project_links (label, href, type, sort_order),
      project_repositories (label, href, sort_order)
    `)
    .order("sort_order");

  if (error) throw error;

  return (data ?? []).map((p) => ({
    title: p.title,
    description: p.description,
    tag: p.tag ?? undefined,
    image_url: p.image_url ?? undefined,
    info: (p.project_info ?? [])
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map((i: { topic: string; value: string }) => ({ topic: i.topic, value: i.value })),
    links: (p.project_links ?? [])
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map((l: { label: string; href: string; type: string }) => ({
        label: l.label,
        href: l.href,
        type: l.type as "demo" | "github",
      })),
    repositories: (p.project_repositories ?? [])
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map((r: { label: string; href: string }) => ({ label: r.label, href: r.href })),
  }));
}

export async function getAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("title, description, year, location")
    .order("sort_order");

  if (error) throw error;
  return (data ?? []).map((a) => ({
    ...a,
    location: a.location ?? undefined,
  }));
}

export async function getTechStack(): Promise<TechItem[]> {
  const { data, error } = await supabase
    .from("tech_stack")
    .select("name, category")
    .order("sort_order");

  if (error) throw error;
  return data as TechItem[];
}
