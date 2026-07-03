import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStackSection } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";

// ISR: cache for 1 hour, on-demand revalidation via /api/revalidate
export const revalidate = 3600;
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

export default async function Home() {
  const [siteConfig, navLinks, socialLinks, projects, achievements, techStack, contributions, recommendations, publications, certifications] =
    await Promise.all([
      getSiteConfig(),
      getNavLinks(),
      getSocialLinks(),
      getProjects(),
      getAchievements(),
      getTechStack(),
      getGitHubContributions(),
      getRecommendations(),
      getPublications(),
      getCertifications(),
    ]);

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
