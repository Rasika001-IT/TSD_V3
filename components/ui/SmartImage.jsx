"use client";
import { useState } from "react";

// Shows a grey shimmer skeleton until the image fully decodes, then fades it
// in — so partially-loaded (progressive) images never flash on screen.
// Pass sizing/rounding classes via `className` (applied to the wrapper); the
// image fills it with object-cover.
export default function SmartImage({ src, alt = "", className = "", imgClassName = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`relative block overflow-hidden bg-gray-200 ${className}`}>
      {!loaded && <span className="absolute inset-0 animate-pulse bg-gray-200" />}
      {src && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </span>
  );
}
