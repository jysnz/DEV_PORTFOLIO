"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRoughShape } from "@/hooks/useRoughShape";
import { SketchBorder } from "@/components/sketch/SketchBorder";
import { CrossHatchOverlay } from "@/components/sketch/CrossHatchOverlay";
import type { TechStack } from "@/lib/types";

export interface TechStackCarouselProps {
  items: TechStack[];
}

export function TechStackCarousel({ items }: TechStackCarouselProps) {
  const { containerRef, svgRef, emphasisSvgRef, ready } = useRoughShape<HTMLDivElement>({
    radius: 12,
    withEmphasis: true,
  });

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate items to create seamless infinite loop
  const duplicated = [...items, ...items];

  // Animation loop using requestAnimationFrame
  const speed = 0.5; // pixels per frame

  const animate = useCallback(() => {
    if (!trackRef.current) return;

    offsetRef.current -= speed;

    // Get half the track width (since items are duplicated)
    const halfWidth = trackRef.current.scrollWidth / 2;

    // Reset when we've scrolled through one full set
    if (Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current = 0;
    }

    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!paused) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(rafRef.current);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, animate]);

  const clearTimer = useCallback(() => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const pauseCarousel = useCallback(() => {
    clearTimer();
    setPaused(true);
  }, [clearTimer]);

  const resumeAfterDelay = useCallback((ms: number) => {
    clearTimer();
    resumeTimer.current = setTimeout(() => {
      setActiveIndex(null);
      setPaused(false);
    }, ms);
  }, [clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`group relative bg-paper-card rounded-md p-6 sm:p-8 lg:p-10 overflow-hidden ${ready ? "border-transparent" : "border border-line/30"}`}
      aria-label="Tech stack carousel"
    >
      <SketchBorder svgRef={svgRef} emphasisSvgRef={emphasisSvgRef} hoverEmphasis />
      <CrossHatchOverlay />

      {/* SVG filter for sketch/hand-drawn distortion */}
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <filter id="sketch-distort">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.04"
              numOctaves="3"
              seed="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-16 bg-gradient-to-r from-paper-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-16 bg-gradient-to-l from-paper-card to-transparent" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="relative flex w-max items-center gap-10 sm:gap-14 lg:gap-16"
        onMouseEnter={pauseCarousel}
        onMouseLeave={() => {
          setActiveIndex(null);
          setPaused(false);
        }}
        onTouchStart={pauseCarousel}
        onTouchEnd={() => resumeAfterDelay(3000)}
      >
        {duplicated.map((item, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={`${item.name}-${i}`}
              className="flex flex-col items-center justify-center gap-3 cursor-pointer"
              style={{
                transform: isActive ? "scale(1.25)" : "scale(1)",
                transition: "transform 0.3s ease-out",
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onTouchStart={(e) => {
                e.stopPropagation();
                pauseCarousel();
                setActiveIndex(i);
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                resumeAfterDelay(2000);
              }}
            >
              {item.icon_url ? (
                <img
                  src={item.icon_url}
                  alt={item.name}
                  className="size-12 sm:size-14 lg:size-16 object-contain"
                  style={{
                    filter: isActive
                      ? "none"
                      : "url(#sketch-distort) grayscale(1) contrast(1.3) brightness(0.85)",
                    opacity: isActive ? 1 : 0.7,
                    transition: "filter 0.3s ease, opacity 0.3s ease",
                  }}
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex size-12 sm:size-14 lg:size-16 items-center justify-center rounded-lg border-2 border-line/40 bg-paper-input"
                  style={{
                    filter: isActive
                      ? "none"
                      : "grayscale(1) contrast(1.3) brightness(0.85)",
                    opacity: isActive ? 1 : 0.7,
                    transition: "filter 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  <span className="font-body text-sm font-bold text-ink-muted uppercase leading-none text-center">
                    {item.name.slice(0, 3)}
                  </span>
                </div>
              )}
              <span
                className="font-body text-xs sm:text-sm font-medium whitespace-nowrap"
                style={{
                  color: isActive ? "var(--color-ink)" : "var(--color-ink-muted)",
                  transition: "color 0.2s ease",
                }}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
