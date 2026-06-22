"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileDropzone from "./FileDropzone";

const input =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
const label = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1";

export default function WibFeatureEditor({ feature }) {
  const router = useRouter();
  const editing = !!feature?.id;

  const [articleUrl, setArticleUrl] = useState(feature?.article_url || "");
  const [cover, setCover] = useState(feature?.cover_image || "");
  const [title, setTitle] = useState(feature?.title || "");
  const [active, setActive] = useState(feature?.is_active || false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setError("");
    setSaved(false);
    if (!articleUrl.trim()) {
      setError("Enter the article link.");
      return;
    }
    setSaving(true);
    const payload = {
      article_url: articleUrl.trim(),
      cover_image: cover || null,
      title: title.trim() || null,
      is_active: active,
    };
    try {
      const res = await fetch(
        editing ? `/api/admin/wib-features/${feature.id}` : "/api/admin/wib-features",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSaving(false);
      setSaved(true);
      if (!editing && data?.id) router.replace(`/admin/wib/${data.id}`);
      else router.refresh();
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this feature permanently?")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/wib-features/${feature.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/wib");
    else {
      setError("Delete failed");
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-[#1D1F26]">
          {editing ? "Edit Women in Business Feature" : "Add Women in Business Feature"}
        </h1>
        <div className="flex items-center gap-2">
          {saved && !saving && <span className="text-sm text-green-600 mr-1">Saved ✓</span>}
          <a href="/admin/wib" className="px-4 py-2 rounded-md text-sm border border-gray-300 bg-white hover:bg-gray-50">
            Back
          </a>
          {editing && (
            <button onClick={remove} disabled={saving} className="px-4 py-2 rounded-md text-sm border border-red-200 text-red-600 bg-white hover:bg-red-50 disabled:opacity-60">
              Delete
            </button>
          )}
          <button onClick={save} disabled={saving} className="px-4 py-2 rounded-md text-sm bg-primary text-white font-medium hover:opacity-90 disabled:opacity-60">
            {saving ? "Saving…" : "Save Feature"}
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div>
          <label className={label}>Article link (click-through target)</label>
          <input
            className={input}
            placeholder="https://thesuccessdigest.org/article/<slug>"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
          />
        </div>

        <div>
          <label className={label}>Cover image (homepage feature + page hero)</label>
          <FileDropzone value={cover} onChange={setCover} accept="image/*" kind="image" />
        </div>

        <div>
          <label className={label}>Title (optional — shown over/under the image)</label>
          <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Set as the active feature (replaces the current one on the site)
        </label>
      </div>
    </div>
  );
}
