"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BlurImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function BlurImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes,
  className,
  containerClassName,
  priority = false,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton pulse animation — visible until image loads */}
      <div
        className={cn(
          "absolute inset-0 bg-bg-card transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 skeleton-pulse" />
      </div>

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
