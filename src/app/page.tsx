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

// Cache indefinitely — invalidated on-demand via /api/revalidate when data changes
export const revalidate = false;

export default async function Home() {
  // Fetch only critical above-the-fold data eagerly (navbar + hero)
  const criticalStart = performance.now();
  const [siteConfig, navLinks, socialLinks] = await Promise.all([
    getSiteConfig(),
    getNavLinks(),
    getSocialLinks(),
  ]);
  const criticalDuration = performance.now() - criticalStart;

  console.log("\n┌─────────────────────────────────────────────────────┐");
  console.log("│       📊 CRITICAL PATH (above-the-fold)             │");
  console.log("├─────────────────────────────────────────────────────┤");
  const status = criticalDuration > 500 ? "🔴" : criticalDuration > 200 ? "🟡" : "🟢";
  console.log(`│ ${status} navbar + hero data:  ${criticalDuration.toFixed(1).padStart(8)}ms              │`);
  console.log("└─────────────────────────────────────────────────────┘\n");

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
