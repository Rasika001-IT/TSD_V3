"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Premium eased smooth scrolling on the public site. Skipped on /admin so the
// CMS keeps native scrolling (better for forms, sticky panels, modals).
//
// The Lenis instance is exposed on `window.__lenis` so other components (e.g.
// the Navbar "Subscribe" CTA) can drive programmatic scrolling — native
// `scrollIntoView` does nothing while Lenis owns the scroll.
export default function SmoothScroll() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const lenisRef = useRef(null);

  // Create one Lenis instance for the lifetime of the public site (re-created
  // only when crossing the public <-> /admin boundary).
  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, [isAdmin]);

  // Issue #5: every new route should open at the top. Lenis preserves its own
  // scroll offset across App Router navigations, so reset it on path change.
  useEffect(() => {
    if (isAdmin) return;
    // Don't fight in-page anchor navigation (e.g. /#newsletter).
    if (typeof window !== "undefined" && window.location.hash) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, isAdmin]);

  return null;
}
