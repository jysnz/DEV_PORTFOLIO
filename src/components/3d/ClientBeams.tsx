"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

const Beams = dynamic(
  () => import("@/components/3d/Beams").then((mod) => mod.Beams),
  { ssr: false }
);

export function ClientBeams() {
  const reducedMotion = usePrefersReducedMotion();

  // Purely decorative full-page WebGL animation: skip it entirely when the
  // user has asked the OS for reduced motion instead of just slowing it down.
  if (reducedMotion) return null;

  return (
    <Beams
      beamWidth={2}
      beamHeight={15}
      beamNumber={12}
      lightColor="#C3B1FF"
      speed={2}
      noiseIntensity={1.75}
      scale={0.2}
      rotation={0}
    />
  );
}
