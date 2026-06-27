"use client";

import dynamic from "next/dynamic";

const Beams = dynamic(
  () => import("@/components/3d/Beams").then((mod) => mod.Beams),
  { ssr: false }
);

export function ClientBeams() {
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
