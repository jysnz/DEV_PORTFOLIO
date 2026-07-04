export function ProjectsSkeleton() {
  return (
    <section aria-label="Loading projects" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col gap-12">
        <div className="h-[76px] w-48 bg-bg-card/50 rounded-md animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-[600px] aspect-square bg-bg-card rounded-md animate-pulse" />
            <div className="flex-1 flex flex-col gap-4">
              <div className="h-8 w-3/4 bg-bg-card/50 rounded-md animate-pulse" />
              <div className="h-4 w-full bg-bg-card/30 rounded-md animate-pulse" />
              <div className="h-4 w-5/6 bg-bg-card/30 rounded-md animate-pulse" />
              <div className="h-4 w-2/3 bg-bg-card/30 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechStackSkeleton() {
  return (
    <section aria-label="Loading tech stack" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col gap-8">
        <div className="h-[76px] w-48 bg-bg-card/50 rounded-md animate-pulse" />
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-[54px] w-32 bg-bg-card/30 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AchievementsSkeleton() {
  return (
    <section aria-label="Loading achievements" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col gap-8">
        <div className="h-[76px] w-48 bg-bg-card/50 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-bg-card rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <section aria-label="Loading about" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="h-[76px] w-32 bg-bg-card/50 rounded-md animate-pulse" />
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-6 w-full bg-bg-card/30 rounded-md animate-pulse" />
          <div className="h-6 w-5/6 bg-bg-card/30 rounded-md animate-pulse" />
          <div className="h-6 w-3/4 bg-bg-card/30 rounded-md animate-pulse" />
          <div className="h-40 w-full bg-bg-card/20 rounded-md animate-pulse mt-4" />
        </div>
      </div>
    </section>
  );
}

export function CertificationsSkeleton() {
  return (
    <section aria-label="Loading certifications" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col gap-8">
        <div className="h-[76px] w-56 bg-bg-card/50 rounded-md animate-pulse" />
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[300px] h-48 bg-bg-card rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PublicationsSkeleton() {
  return (
    <section aria-label="Loading publications" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col gap-8">
        <div className="h-[76px] w-52 bg-bg-card/50 rounded-md animate-pulse" />
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-3 p-6 bg-bg-card/20 rounded-md">
            <div className="h-6 w-3/4 bg-bg-card/40 rounded-md animate-pulse" />
            <div className="h-4 w-1/2 bg-bg-card/30 rounded-md animate-pulse" />
            <div className="h-4 w-full bg-bg-card/20 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function RecommendationsSkeleton() {
  return (
    <section aria-label="Loading recommendations" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col gap-8">
        <div className="h-[76px] w-64 bg-bg-card/50 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4 p-6 bg-bg-card/20 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-bg-card/40 animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-24 bg-bg-card/40 rounded-md animate-pulse" />
                  <div className="h-3 w-32 bg-bg-card/30 rounded-md animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-full bg-bg-card/20 rounded-md animate-pulse" />
              <div className="h-4 w-5/6 bg-bg-card/20 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section aria-label="Loading contact" className="w-full max-w-[1440px] mx-auto px-6 md:px-[60px] lg:px-[108px] py-20">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4">
          <div className="h-[76px] w-40 bg-bg-card/50 rounded-md animate-pulse" />
          <div className="h-4 w-48 bg-bg-card/30 rounded-md animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-bg-card/30 rounded-sm animate-pulse" />
          ))}
          <div className="h-32 w-full bg-bg-card/30 rounded-sm animate-pulse" />
          <div className="h-[54px] w-36 bg-bg-card/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
