"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  quality?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/default-image.jpg",
  placeholder,
  blurDataURL,
  quality = 80,
  priority = false,
  loading = "lazy"
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [useNextImage, setUseNextImage] = useState(true);

  // Check if URL is valid and safe for Next.js Image
  const isValidForNextImage = (url: string): boolean => {
    if (!url) return false;

    // Local images (relative paths) are always safe
    if (url.startsWith("/") || url.startsWith("./")) return true;

    try {
      const urlObj = new URL(url);
      // Only allow HTTPS for external images
      if (urlObj.protocol !== "https:") return false;

      // Add your configured domains here
      const allowedDomains = [
        "your-domain.com",
        "cdn.example.com"
        // Add more as needed
      ];

      return allowedDomains.some(domain => urlObj.hostname.includes(domain));
    } catch {
      return false;
    }
  };

  useEffect(
    () => {
      const canUseNextImage = isValidForNextImage(imgSrc);
      setUseNextImage(canUseNextImage);

      if (!canUseNextImage && imgSrc !== fallbackSrc) {
        console.warn(`Image URL not configured for Next.js Image: ${imgSrc}. Using fallback.`);
      }
    },
    [imgSrc, fallbackSrc]
  );

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setUseNextImage(isValidForNextImage(fallbackSrc));
    }
  };

  // Try to use Next.js Image for better optimization
  if (useNextImage) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        priority={priority}
        onError={handleError}
      />
    );
  }

  // Fallback to regular img tag for external/unconfigured URLs
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      onError={handleError}
      style={{ objectFit: "cover" }}
    />
  );
}
