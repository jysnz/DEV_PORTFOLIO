"use client";

import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("@/components/3d/ParticlesBackground").then((mod) => mod.ParticlesBackground),
  { ssr: false }
);

export function ClientParticles() {
  return <ParticlesBackground />;
}
