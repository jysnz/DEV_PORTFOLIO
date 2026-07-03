"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export interface SketchRevealProps {
  /** Source of the original image */
  baseSrc: string;
  /** Source of the sketch overlay image */
  sketchSrc: string;
  /** Alt text */
  alt: string;
  /** Brush size in pixels */
  brushSize?: number;
  /** How fast the sketch fades back to original (seconds) */
  fadeTime?: number;
  /** Additional class names applied to the wrapping container */
  className?: string;
  /** Class names applied to the fallback img element (for sizing) */
  canvasClassName?: string;
}

/**
 * Reveals the sketch image wherever the cursor moves, then smoothly
 * fades it back to the original image after the cursor moves away.
 * Uses a canvas mask that decays over time for a smooth transition.
 */
export function SketchReveal({
  baseSrc,
  sketchSrc,
  alt,
  brushSize = 45,
  fadeTime = 1.2,
  className,
  canvasClassName,
}: SketchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const sketchImgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  // Load both images
  useEffect(() => {
    let cancelled = false;

    const baseImg = new window.Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = baseSrc;

    const sketchImg = new window.Image();
    sketchImg.crossOrigin = "anonymous";
    sketchImg.src = sketchSrc;

    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 2 && !cancelled) {
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
  }, [baseSrc, sketchSrc]);

  // Initialize canvases once loaded
  useEffect(() => {
    if (!loaded) return;

    const container = containerRef.current;
    const displayCanvas = displayCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const baseImg = baseImgRef.current;
    if (!container || !displayCanvas || !maskCanvas || !baseImg) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    displayCanvas.width = w;
    displayCanvas.height = h;
    maskCanvas.width = w;
    maskCanvas.height = h;

    // Draw initial base image
    const ctx = displayCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(baseImg, 0, 0, w, h);
    }
  }, [loaded]);

  // Paint on mask wherever cursor goes
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = containerRef.current;
      const maskCanvas = maskCanvasRef.current;
      if (!container || !maskCanvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      const radius = brushSize * dpr;

      const ctx = maskCanvas.getContext("2d");
      if (!ctx) return;

      // Paint soft brush on mask (white = reveal sketch)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    },
    [brushSize]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Animation loop: fade mask and composite
  useEffect(() => {
    if (!loaded) return;

    // Decay rate: how much alpha to subtract per second
    // Full white (255) should reach 0 in fadeTime seconds
    const decayPerSecond = 255 / fadeTime;

    const loop = (timestamp: number) => {
      const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = timestamp;

      const displayCanvas = displayCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const baseImg = baseImgRef.current;
      const sketchImg = sketchImgRef.current;
      if (!displayCanvas || !maskCanvas || !baseImg || !sketchImg) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const w = maskCanvas.width;
      const h = maskCanvas.height;

      // Fade the mask — reduce all pixel alpha values over time
      const maskCtx = maskCanvas.getContext("2d");
      if (maskCtx && dt > 0) {
        const imageData = maskCtx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const decay = decayPerSecond * dt;

        for (let i = 0; i < data.length; i += 4) {
          // Fade R, G, B channels (we use white for mask)
          if (data[i] > 0) {
            data[i] = Math.max(0, data[i] - decay);     // R
            data[i + 1] = Math.max(0, data[i + 1] - decay); // G
            data[i + 2] = Math.max(0, data[i + 2] - decay); // B
            data[i + 3] = Math.max(0, data[i + 3] - decay); // A
          }
        }
        maskCtx.putImageData(imageData, 0, 0);
      }

      // Composite: base + masked sketch on top
      const ctx = displayCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(baseImg, 0, 0, w, h);

        // Draw sketch masked by the mask canvas
        // Use offscreen compositing
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = w;
        tempCanvas.height = h;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(sketchImg, 0, 0, w, h);
          tempCtx.globalCompositeOperation = "destination-in";
          tempCtx.drawImage(maskCanvas, 0, 0);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, fadeTime]);

  // Handle resize
  useEffect(() => {
    if (!loaded) return;

    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const displayCanvas = displayCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const baseImg = baseImgRef.current;
      if (!displayCanvas || !maskCanvas || !baseImg) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);

      displayCanvas.width = w;
      displayCanvas.height = h;
      maskCanvas.width = w;
      maskCanvas.height = h;

      const ctx = displayCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(baseImg, 0, 0, w, h);
      }
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [loaded]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      {/* Fallback accessible image (hidden once canvas loads) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={baseSrc}
        alt={alt}
        className={canvasClassName}
        style={{ visibility: loaded ? "hidden" : "visible" }}
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
