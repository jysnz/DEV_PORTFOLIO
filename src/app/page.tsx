import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStackSection } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";

// Always fetch fresh data from Supabase on every request
export const dynamic = "force-dynamic";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Publications } from "@/components/sections/Publications";
import { Recommendations } from "@/components/sections/Recommendations";
import { Contact } from "@/components/sections/Contact";
import {
  getSiteConfig,
  getNavLinks,
  getSocialLinks,
  getProjects,
  getAchievements,
  getTechStack,
  getRecommendations,
  getPublications,
  getCertifications,
} from "@/lib/queries";
import { getGitHubContributions } from "@/lib/github";

async function timedQuery<T>(name: string, fn: () => Promise<T>): Promise<{ name: string; data: T; duration: number }> {
  const start = performance.now();
  const data = await fn();
  const duration = performance.now() - start;
  return { name, data, duration };
}

export default async function Home() {
  const totalStart = performance.now();

  const results = await Promise.all([
    timedQuery("siteConfig", getSiteConfig),
    timedQuery("navLinks", getNavLinks),
    timedQuery("socialLinks", getSocialLinks),
    timedQuery("projects", getProjects),
    timedQuery("achievements", getAchievements),
    timedQuery("techStack", getTechStack),
    timedQuery("contributions", getGitHubContributions),
    timedQuery("recommendations", getRecommendations),
    timedQuery("publications", getPublications),
    timedQuery("certifications", getCertifications),
  ]);

  const totalDuration = performance.now() - totalStart;

  // Console analytics
  console.log("\n┌─────────────────────────────────────────────────────┐");
  console.log("│           📊 DATA LOADING ANALYTICS                 │");
  console.log("├─────────────────────────────────────────────────────┤");
  [...results]
    .sort((a, b) => b.duration - a.duration)
    .forEach(({ name, duration }) => {
      const bar = "█".repeat(Math.round(duration / 10));
      const status = duration > 500 ? "🔴" : duration > 200 ? "🟡" : "🟢";
      console.log(`│ ${status} ${name.padEnd(18)} ${duration.toFixed(1).padStart(8)}ms  ${bar}`);
    });
  console.log("├─────────────────────────────────────────────────────┤");
  console.log(`│ ⏱️  Total (parallel):     ${totalDuration.toFixed(1).padStart(8)}ms              │`);
  console.log(`│ 📦 Queries executed:      ${results.length.toString().padStart(8)}               │`);
  const slowest = [...results].sort((a, b) => b.duration - a.duration)[0];
  console.log(`│ 🐌 Slowest:              ${slowest.name.padEnd(18)} ${slowest.duration.toFixed(1)}ms  │`);
  console.log("└─────────────────────────────────────────────────────┘\n");

  const [siteConfig, navLinks, socialLinks, projects, achievements, techStack, contributions, recommendations, publications, certifications] =
    results.map((r) => r.data) as [
      Awaited<ReturnType<typeof getSiteConfig>>,
      Awaited<ReturnType<typeof getNavLinks>>,
      Awaited<ReturnType<typeof getSocialLinks>>,
      Awaited<ReturnType<typeof getProjects>>,
      Awaited<ReturnType<typeof getAchievements>>,
      Awaited<ReturnType<typeof getTechStack>>,
      Awaited<ReturnType<typeof getGitHubContributions>>,
      Awaited<ReturnType<typeof getRecommendations>>,
      Awaited<ReturnType<typeof getPublications>>,
      Awaited<ReturnType<typeof getCertifications>>,
    ];

  return (
    <>
      <Navbar navLinks={navLinks} siteName={siteConfig.name} />
      <main id="main-content" className="relative z-10">
        <Hero siteConfig={siteConfig} socialLinks={socialLinks} />
        <Projects projects={projects} />
        <TechStackSection techStack={techStack} />
        <Achievements achievements={achievements} />
        <About contributions={contributions} />
        <Certifications certifications={certifications} />
        <Publications publications={publications} />
        <Recommendations recommendations={recommendations} />
        <Contact siteConfig={siteConfig} socialLinks={socialLinks} />
      </main>
    </>
  );
}
