"use client";

import { useMemo, useEffect, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import { cn } from "@/lib/utils";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

export interface LocationGlobeProps {
  location: string;
  latitude: number;
  longitude: number;
  className?: string;
}

export function LocationGlobe({ location, latitude, longitude, className }: LocationGlobeProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLDivElement>({
    radius: 12,
    withEmphasis: false,
  });

  const [landData, setLandData] = useState<FeatureCollection<Polygon | MultiPolygon> | null>(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
      .then((res) => res.json())
      .then((topology: Topology<{ land: GeometryCollection }>) => {
        const land = feature(topology, topology.objects.land) as unknown as FeatureCollection<Polygon | MultiPolygon>;
        setLandData(land);
      })
      .catch(() => {});
  }, []);

  const size = 150;
  const cx = size / 2;
  const cy = size / 2;
  const r = 65;

  const { landPath, graticule, markerXY } = useMemo(() => {
    const projection = geoOrthographic()
      .translate([cx, cy])
      .scale(r)
      .rotate([-longitude, -latitude, 0])
      .clipAngle(90);

    const pathGenerator = geoPath(projection);

    // Land outlines
    const landPath = landData ? pathGenerator(landData) : null;

    // Graticule (grid lines)
    const graticuleFn = geoGraticule().step([30, 30]);
    const graticule = pathGenerator(graticuleFn()) || "";

    // Marker position
    const markerXY = projection([longitude, latitude]);

    return { landPath, graticule, markerXY };
  }, [landData, latitude, longitude, cx, cy, r]);

  return (
    <div className={cn("relative group/location inline-flex items-center gap-1.5", className)}>
      {/* Location trigger */}
      <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      <span className="font-body font-medium text-sm text-ink-muted/70 cursor-pointer transition-colors duration-150 group-hover/location:text-accent">
        {location}
      </span>

      {/* Globe popup - appears to the right */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 invisible translate-x-1 transition-all duration-200 group-hover/location:opacity-100 group-hover/location:visible group-hover/location:translate-x-0">
        <div
          ref={containerRef}
          className={cn(
            "relative flex flex-col items-center gap-2 p-3 bg-paper-card rounded-md border",
            ready ? "border-transparent" : "border-line/30"
          )}
        >
          <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} />

          {/* Globe SVG */}
          <svg
            className="relative size-[150px]"
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            aria-hidden="true"
          >
            {/* Globe outline */}
            <circle
              cx={cx} cy={cy} r={r}
              stroke="currentColor" strokeWidth="1.5"
              className="text-ink-muted/60"
            />

            {/* Graticule grid */}
            {graticule && (
              <path
                d={graticule}
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="2 2"
                className="text-ink-muted/20"
              />
            )}

            {/* Land outlines */}
            {landPath && (
              <path
                d={landPath}
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}

            {/* Marker pin */}
            {markerXY && (
              <g>
                {/* Ripple */}
                <circle
                  cx={markerXY[0]} cy={markerXY[1]}
                  r="10"
                  stroke="currentColor" strokeWidth="0.75"
                  strokeDasharray="2 2"
                  className="text-accent/50"
                />
                <circle
                  cx={markerXY[0]} cy={markerXY[1]}
                  r="6"
                  stroke="currentColor" strokeWidth="0.75"
                  className="text-accent/70"
                />
                {/* Center dot */}
                <circle
                  cx={markerXY[0]} cy={markerXY[1]}
                  r="3"
                  stroke="currentColor" strokeWidth="1.5"
                  className="text-accent"
                />
                <circle
                  cx={markerXY[0]} cy={markerXY[1]}
                  r="1"
                  fill="currentColor"
                  className="text-accent"
                />
              </g>
            )}
          </svg>

          {/* Location label */}
          <p className="relative font-body font-medium text-xs text-center text-ink leading-tight max-w-[140px]">
            📍 {location}
          </p>
        </div>
      </div>
    </div>
  );
}
