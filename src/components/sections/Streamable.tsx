import { Projects } from "@/components/sections/Projects";
import { TechStackSection } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Publications } from "@/components/sections/Publications";
import { Recommendations } from "@/components/sections/Recommendations";
import { Contact } from "@/components/sections/Contact";
import {
  getSiteConfig,
  getSocialLinks,
  getProjects,
  getAchievements,
  getTechStack,
  getRecommendations,
  getPublications,
  getCertifications,
} from "@/lib/queries";
import { getGitHubContributions } from "@/lib/github";

export async function StreamableProjects() {
  const projects = await getProjects();
  return <Projects projects={projects} />;
}

export async function StreamableTechStack() {
  const techStack = await getTechStack();
  return <TechStackSection techStack={techStack} />;
}

export async function StreamableAchievements() {
  const achievements = await getAchievements();
  return <Achievements achievements={achievements} />;
}

export async function StreamableAbout() {
  const contributions = await getGitHubContributions();
  return <About contributions={contributions} />;
}

export async function StreamableCertifications() {
  const certifications = await getCertifications();
  return <Certifications certifications={certifications} />;
}

export async function StreamablePublications() {
  const publications = await getPublications();
  return <Publications publications={publications} />;
}

export async function StreamableRecommendations() {
  const recommendations = await getRecommendations();
  return <Recommendations recommendations={recommendations} />;
}

export async function StreamableContact() {
  const [siteConfig, socialLinks] = await Promise.all([
    getSiteConfig(),
    getSocialLinks(),
  ]);
  return <Contact siteConfig={siteConfig} socialLinks={socialLinks} />;
}
