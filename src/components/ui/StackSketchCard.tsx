"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface StackSketchCardProps {
  src: string;
  sketchSrc: string;
  alt: string;
}

/**
 * Shows the original image. Wherever the cursor moves, it instantly
 * reveals the sketch version. After the cursor passes, that area
 * smoothly fades back to the original over ~2.5 seconds.
 *
 * Performance: uses container-sized canvas with globalAlpha fade
 * (no per-pixel iteration), reuses a single offscreen canvas.
 */
export function StackSketchCard({ src, sketchSrc, alt }: StackSketchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const sketchImgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const hasMaskContent = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const BRUSH_SIZE = 35;
  // Fade rate: lower = slower fade. This is the alpha multiplier per frame.
  // 0.985 at 60fps ≈ 2.5 seconds to fully fade
  const FADE_RATE = 0.985;

  // Load both images
  useEffect(() => {
    let cancelled = false;

    const baseImg = new window.Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = src;

    const sketchImg = new window.Image();
    sketchImg.crossOrigin = "anonymous";
    sketchImg.src = sketchSrc;

    let count = 0;
    const onLoad = () => {
      count++;
      if (count === 2 && !cancelled) {
        baseImgRef.current = baseImg;
        sketchImgRef.current = sketchImg;
        setLoaded(true);
      }
    };

    baseImg.addEventListener("load", onLoad);
    sketchImg.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      baseImg.removeEventListener("load", onLoad);
      sketchImg.removeEventListener("load", onLoad);
    };
  }, [src, sketchSrc]);

  // Initialize canvases at container display size (not image natural size)
  const initCanvases = useCallback(() => {
    const container = containerRef.current;
    const displayCanvas = displayCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const baseImg = baseImgRef.current;
    if (!container || !displayCanvas || !maskCanvas || !baseImg) return;

    const rect = container.getBoundingClientRect();
    // Use 2x for retina sharpness, capped to avoid huge canvases
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (displayCanvas.width === w && displayCanvas.height === h) return;

    displayCanvas.width = w;
    displayCanvas.height = h;
    maskCanvas.width = w;
    maskCanvas.height = h;

    // Create reusable offscreen canvas
    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement("canvas");
    }
    offscreenRef.current.width = w;
    offscreenRef.current.height = h;

    // Draw initial base image
    const ctx = displayCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(baseImg, 0, 0, w, h);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    initCanvases();
  }, [loaded, initCanvases]);

  // Handle resize
  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => initCanvases());
    ro.observe(container);
    return () => ro.disconnect();
  }, [loaded, initCanvases]);

  // Paint mask on mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!container || !maskCanvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;
    const radius = BRUSH_SIZE * dpr;

    const ctx = maskCanvas.getContext("2d");
    if (!ctx) return;

    // Paint a solid white circle — instant reveal
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    hasMaskContent.current = true;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Render loop
  useEffect(() => {
    if (!loaded) return;

    const loop = () => {
      const displayCanvas = displayCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const offscreen = offscreenRef.current;
      const baseImg = baseImgRef.current;
      const sketchImg = sketchImgRef.current;

      if (!displayCanvas || !maskCanvas || !offscreen || !baseImg || !sketchImg) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const w = displayCanvas.width;
      const h = displayCanvas.height;

      // Fade the mask using globalAlpha composite trick (no per-pixel loop!)
      if (hasMaskContent.current) {
        const maskCtx = maskCanvas.getContext("2d");
        if (maskCtx) {
          // Draw existing mask at reduced opacity back onto itself
          maskCtx.globalCompositeOperation = "destination-in";
          maskCtx.globalAlpha = FADE_RATE;
          maskCtx.fillStyle = "#ffffff";
          maskCtx.fillRect(0, 0, w, h);
          maskCtx.globalAlpha = 1;
          maskCtx.globalCompositeOperation = "source-over";
        }

        // Composite: sketch masked, then base underneath
        const offCtx = offscreen.getContext("2d");
        if (offCtx) {
          // Draw sketch
          offCtx.globalCompositeOperation = "source-over";
          offCtx.globalAlpha = 1;
          offCtx.drawImage(sketchImg, 0, 0, w, h);
          // Clip sketch to mask
          offCtx.globalCompositeOperation = "destination-in";
          offCtx.drawImage(maskCanvas, 0, 0);
        }

        // Final composite onto display canvas
        const ctx = displayCanvas.getContext("2d");
        if (ctx) {
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(baseImg, 0, 0, w, h);
          ctx.drawImage(offscreen, 0, 0);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Fallback image before canvas loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ visibility: loaded ? "hidden" : "visible" }}
        draggable={false}
      />

      {/* Interactive display canvas */}
      <canvas
        ref={displayCanvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full ${loaded ? "" : "hidden"}`}
        style={{ borderRadius: "inherit" }}
      />

      {/* Hidden mask canvas */}
      <canvas ref={maskCanvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
