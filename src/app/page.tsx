import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import {
  StreamableProjects,
  StreamableTechStack,
  StreamableAchievements,
  StreamableAbout,
  StreamableCertifications,
  StreamablePublications,
  StreamableRecommendations,
  StreamableContact,
} from "@/components/sections/Streamable";
import {
  ProjectsSkeleton,
  TechStackSkeleton,
  AchievementsSkeleton,
  AboutSkeleton,
  CertificationsSkeleton,
  PublicationsSkeleton,
  RecommendationsSkeleton,
  ContactSkeleton,
} from "@/components/skeletons/SectionSkeleton";
import { getSiteConfig, getNavLinks, getSocialLinks } from "@/lib/queries";

// ISR: revalidate every hour instead of force-dynamic
export const revalidate = 3600;

export default async function Home() {
  // Fetch only critical above-the-fold data eagerly (navbar + hero)
  const [siteConfig, navLinks, socialLinks] = await Promise.all([
    getSiteConfig(),
    getNavLinks(),
    getSocialLinks(),
  ]);

  return (
    <>
      <Navbar navLinks={navLinks} siteName={siteConfig.name} />
      <main id="main-content" className="relative z-10">
        <Hero siteConfig={siteConfig} socialLinks={socialLinks} />

        <Suspense fallback={<ProjectsSkeleton />}>
          <StreamableProjects />
        </Suspense>

        <Suspense fallback={<TechStackSkeleton />}>
          <StreamableTechStack />
        </Suspense>

        <Suspense fallback={<AchievementsSkeleton />}>
          <StreamableAchievements />
        </Suspense>

        <Suspense fallback={<AboutSkeleton />}>
          <StreamableAbout />
        </Suspense>

        <Suspense fallback={<CertificationsSkeleton />}>
          <StreamableCertifications />
        </Suspense>

        <Suspense fallback={<PublicationsSkeleton />}>
          <StreamablePublications />
        </Suspense>

        <Suspense fallback={<RecommendationsSkeleton />}>
          <StreamableRecommendations />
        </Suspense>

        <Suspense fallback={<ContactSkeleton />}>
          <StreamableContact />
        </Suspense>
      </main>
    </>
  );
}
