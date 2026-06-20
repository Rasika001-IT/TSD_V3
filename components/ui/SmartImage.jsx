"use client";
import { useEffect, useRef, useState } from "react";

// Shows a grey shimmer skeleton until the image fully decodes, then fades it
// in — so partially-loaded (progressive) images never flash on screen.
// Pass sizing/rounding classes via `className` (applied to the wrapper); the
// image fills it with object-cover.
export default function SmartImage({ src, alt = "", className = "", imgClassName = "" }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  // If the image is already cached/complete before onLoad attaches (common with
  // SSR + fast CDN), onLoad never fires — detect it here so it isn't stuck grey.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <span className={`relative block overflow-hidden bg-gray-200 ${className}`}>
      {!loaded && <span className="absolute inset-0 animate-pulse bg-gray-200" />}
      {src && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </span>
  );
}
