import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStackSection } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import {
  getSiteConfig,
  getNavLinks,
  getSocialLinks,
  getProjects,
  getAchievements,
  getTechStack,
} from "@/lib/queries";

export default async function Home() {
  const [siteConfig, navLinks, socialLinks, projects, achievements, techStack] =
    await Promise.all([
      getSiteConfig(),
      getNavLinks(),
      getSocialLinks(),
      getProjects(),
      getAchievements(),
      getTechStack(),
    ]);

  return (
    <>
      <Navbar navLinks={navLinks} siteName={siteConfig.name} />
      <main id="main-content" className="relative z-10">
        <Hero siteConfig={siteConfig} socialLinks={socialLinks} />
        <Projects projects={projects} />
        <TechStackSection techStack={techStack} />
        <Achievements achievements={achievements} />
        <About />
        <Contact siteConfig={siteConfig} socialLinks={socialLinks} />
      </main>
    </>
  );
}
