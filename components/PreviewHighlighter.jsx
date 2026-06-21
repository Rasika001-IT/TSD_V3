"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// When a public page is opened with ?ph=<article-slug> (used by the admin
// "Where this post appears" preview iframes), find every card on the page that
// links to that article, ring it, badge the first one, and scroll to it — so an
// editor literally sees their post highlighted in the real page layout. Inert
// when the param is absent, so it has no effect on normal browsing.
export default function PreviewHighlighter() {
  const params = useSearchParams();
  const ph = params.get("ph");

  useEffect(() => {
    if (!ph) return;
    const selector = `a[href*="/article/${ph}"]`;
    let tries = 0;
    let done = false;

    const apply = () => {
      const links = Array.from(document.querySelectorAll(selector)).filter((l) => {
        // Match the exact slug, not a prefix of a longer one.
        const href = l.getAttribute("href") || "";
        const path = href.split("?")[0].replace(/\/$/, "");
        return path.endsWith(`/article/${ph}`);
      });
      if (!links.length) return false;

      const seen = new Set();
      links.forEach((l, i) => {
        const card = l.closest("article") || l;
        if (seen.has(card)) return;
        seen.add(card);
        card.style.outline = "3px solid #C89632";
        card.style.outlineOffset = "4px";
        card.style.borderRadius = "8px";
        card.style.scrollMarginTop = "140px";
        if (seen.size === 1) {
          if (getComputedStyle(card).position === "static") card.style.position = "relative";
          const badge = document.createElement("div");
          badge.textContent = "THIS POST";
          badge.style.cssText =
            "position:absolute;top:-12px;left:8px;z-index:60;background:#C89632;color:#fff;" +
            "font:600 10px/1 Inter,system-ui,sans-serif;padding:5px 9px;border-radius:9999px;" +
            "letter-spacing:.06em;box-shadow:0 2px 6px rgba(0,0,0,.2);pointer-events:none;";
          card.appendChild(badge);
        }
      });

      const first = links[0];
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(first, { offset: -160 });
      } else {
        first.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return true;
    };

    const iv = setInterval(() => {
      tries += 1;
      if (done) return;
      if (apply() || tries > 40) {
        done = true;
        clearInterval(iv);
      }
    }, 150);
    return () => clearInterval(iv);
  }, [ph]);

  return null;
}
