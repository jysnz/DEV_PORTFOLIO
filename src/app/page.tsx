import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ClientBeams } from "@/components/3d/ClientBeams";
import {
  getSiteConfig,
  getNavLinks,
  getSocialLinks,
  getProjects,
  getAchievements,
  getTechStack,
} from "@/lib/queries";
import {
  siteConfigFallback,
  navLinksFallback,
  socialLinksFallback,
  aboutDescriptionFallback,
} from "@/lib/data";

export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  const [siteConfig, navLinks, socialLinks, projects, achievements, techStack] =
    await Promise.all([
      getSiteConfig().catch(() => siteConfigFallback),
      getNavLinks().catch(() => navLinksFallback),
      getSocialLinks().catch(() => socialLinksFallback),
      getProjects().catch(() => []),
      getAchievements().catch(() => []),
      getTechStack().catch(() => []),
    ]);

  return (
    <>
      <ClientBeams />
      <Navbar navLinks={navLinks} siteName={siteConfig.name} />
      <main id="main-content" className="relative">
        <Hero
          siteConfig={siteConfig}
          socialLinks={socialLinks}
        />
        <Projects projects={projects} />
        <TechStack techStack={techStack} />
        <Achievements achievements={achievements} />
        <About aboutDescription={aboutDescriptionFallback} />
        <Contact siteConfig={siteConfig} />
      </main>
    </>
  );
}
