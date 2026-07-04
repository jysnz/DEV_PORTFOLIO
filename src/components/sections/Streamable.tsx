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

function logStreamTiming(name: string, duration: number) {
  const status = duration > 500 ? "🔴" : duration > 200 ? "🟡" : "🟢";
  const bar = "█".repeat(Math.round(duration / 10));
  console.log(`│ ${status} ${name.padEnd(18)} ${duration.toFixed(1).padStart(8)}ms  ${bar}`);
}

export async function StreamableProjects() {
  const start = performance.now();
  const projects = await getProjects();
  logStreamTiming("projects", performance.now() - start);
  return <Projects projects={projects} />;
}

export async function StreamableTechStack() {
  const start = performance.now();
  const techStack = await getTechStack();
  logStreamTiming("techStack", performance.now() - start);
  return <TechStackSection techStack={techStack} />;
}

export async function StreamableAchievements() {
  const start = performance.now();
  const achievements = await getAchievements();
  logStreamTiming("achievements", performance.now() - start);
  return <Achievements achievements={achievements} />;
}

export async function StreamableAbout() {
  const start = performance.now();
  const contributions = await getGitHubContributions();
  logStreamTiming("contributions", performance.now() - start);
  return <About contributions={contributions} />;
}

export async function StreamableCertifications() {
  const start = performance.now();
  const certifications = await getCertifications();
  logStreamTiming("certifications", performance.now() - start);
  return <Certifications certifications={certifications} />;
}

export async function StreamablePublications() {
  const start = performance.now();
  const publications = await getPublications();
  logStreamTiming("publications", performance.now() - start);
  return <Publications publications={publications} />;
}

export async function StreamableRecommendations() {
  const start = performance.now();
  const recommendations = await getRecommendations();
  logStreamTiming("recommendations", performance.now() - start);
  return <Recommendations recommendations={recommendations} />;
}

export async function StreamableContact() {
  const start = performance.now();
  const [siteConfig, socialLinks] = await Promise.all([
    getSiteConfig(),
    getSocialLinks(),
  ]);
  logStreamTiming("contact", performance.now() - start);
  return <Contact siteConfig={siteConfig} socialLinks={socialLinks} />;
}
