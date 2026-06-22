"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileDropzone from "./FileDropzone";

// One women-of-impact article in the WiB tab: shows its featured (article) image
// and lets the editor set a separate landing image + mark it as the hero.
export default function WibArticleRow({ article }) {
  const router = useRouter();
  const [landing, setLanding] = useState(article.landing_image || "");
  const [busy, setBusy] = useState(false);
  const [savedAt, setSavedAt] = useState(0);

  const call = async (body) => {
    setBusy(true);
    const res = await fetch("/api/admin/wib-covers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    if (res.ok) {
      setSavedAt(Date.now());
      router.refresh();
    } else {
      alert("Save failed");
    }
    return res.ok;
  };

  const onLandingChange = async (url) => {
    setLanding(url);
    if (url) await call({ post_id: article.uuid, landing_image: url });
    else await call({ action: "remove", post_id: article.uuid });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 px-4 py-4">
      {/* Featured (article) image */}
      <div className="flex items-center gap-3 md:w-72 shrink-0">
        {article.featured_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.featured_image} alt="" className="w-16 h-12 object-cover rounded bg-gray-100 shrink-0" />
        ) : (
          <div className="w-16 h-12 rounded bg-gray-100 shrink-0" />
        )}
        <div className="min-w-0">
          <div className="font-medium text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: article.title }} />
          <div className="text-[11px] text-gray-400 truncate">/article/{article.slug}</div>
        </div>
      </div>

      {/* Landing image (the curated portrait for the carousel + hero) */}
      <div className="md:w-64 shrink-0">
        <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Landing image</p>
        <FileDropzone value={landing} onChange={onLandingChange} accept="image/*" kind="image" />
      </div>

      {/* Hero control */}
      <div className="md:ml-auto flex items-center gap-3">
        {savedAt > 0 && !busy && <span className="text-xs text-green-600">Saved ✓</span>}
        {article.is_hero ? (
          <span className="text-[11px] px-2 py-1 rounded-full bg-green-100 text-green-700">Hero</span>
        ) : (
          <button
            type="button"
            disabled={busy || !landing}
            title={!landing ? "Add a landing image first" : "Make this the hero"}
            onClick={() => call({ action: "set-hero", post_id: article.uuid })}
            className="text-xs px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Set as hero
          </button>
        )}
      </div>
    </div>
  );
}
