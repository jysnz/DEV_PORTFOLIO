"use client";

import { useEffect, useRef, useCallback } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

/**
 * Renders a canvas-based pencil trail that follows the cursor,
 * creating fading graphite marks like a pencil sketching on paper.
 * Respects prefers-reduced-motion.
 * Stops rAF loop when idle to save resources.
 */
export function PencilTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isRunning = useRef(false);

  const MAX_POINTS = 30;
  const MAX_AGE = 1.0; // seconds before fully faded
  const MIN_DISTANCE = 4; // minimum px between trail points

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now() / 1000;

    // Remove expired points
    pointsRef.current = pointsRef.current.filter((p) => now - p.age < MAX_AGE);

    const active = pointsRef.current;

    // Stop loop when no points remain
    if (active.length === 0) {
      isRunning.current = false;
      return;
    }

    for (let i = 1; i < active.length; i++) {
      const p = active[i];
      const prev = active[i - 1];
      const life = 1 - (now - p.age) / MAX_AGE;

      if (life <= 0) continue;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(p.x, p.y);

      const alpha = life * 0.3;
      ctx.strokeStyle = `rgba(90, 80, 70, ${alpha})`;
      ctx.lineWidth = 1.5 * life + 0.5;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  const startLoop = useCallback(() => {
    if (!isRunning.current) {
      isRunning.current = true;
      animFrameRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMove = (e: MouseEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      const last = lastPosRef.current;

      if (last) {
        const dx = pos.x - last.x;
        const dy = pos.y - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MIN_DISTANCE) return;
      }

      lastPosRef.current = pos;

      pointsRef.current.push({
        x: pos.x,
        y: pos.y,
        age: performance.now() / 1000,
      });

      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current = pointsRef.current.slice(-MAX_POINTS);
      }

      startLoop();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw, startLoop]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
