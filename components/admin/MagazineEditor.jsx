"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileDropzone from "./FileDropzone";

const input =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
const label = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1";

// Accepts a full URL, a /article/<slug> path, or a bare slug.
const slugFromUrl = (url) => {
  if (!url) return "";
  try {
    const path = url.includes("://") ? new URL(url).pathname : url;
    const parts = path.split("/").filter(Boolean);
    const i = parts.indexOf("article");
    return (i >= 0 ? parts[i + 1] : parts[parts.length - 1]) || "";
  } catch {
    return "";
  }
};

export default function MagazineEditor({ magazine }) {
  const router = useRouter();
  const editing = !!magazine?.id;
  const embedded = magazine?.post || null;

  const [fliphtml5, setFliphtml5] = useState(magazine?.fliphtml5_url || "");
  const [editionTitle, setEditionTitle] = useState(magazine?.edition_title || "");
  const [cover, setCover] = useState(magazine?.cover_image || "");
  const [postUrl, setPostUrl] = useState(embedded?.slug ? `/article/${embedded.slug}` : "");
  const [post, setPost] = useState(
    embedded
      ? {
          uuid: magazine.post_id,
          title: embedded.title,
          excerpt: embedded.excerpt,
          image: embedded.featured_image,
          slug: embedded.slug,
        }
      : null,
  );
  const [looking, setLooking] = useState(false);
  const [lookupErr, setLookupErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const lookupPost = async () => {
    const slug = slugFromUrl(postUrl);
    setLookupErr("");
    if (!slug) {
      setPost(null);
      return;
    }
    setLooking(true);
    try {
      const res = await fetch(`/api/posts/slug/${slug}`);
      if (!res.ok) {
        setPost(null);
        setLookupErr("No published post found for that link.");
        return;
      }
      setPost(await res.json()); // formatPost: { uuid, title, excerpt, image, slug }
    } catch {
      setLookupErr("Couldn’t look that up — check the link.");
    } finally {
      setLooking(false);
    }
  };

  const save = async (status) => {
    setError("");
    setSaved(false);
    if (!fliphtml5.trim()) {
      setError("Enter the FlipHTML5 link.");
      return;
    }
    setSaving(true);
    const payload = {
      fliphtml5_url: fliphtml5.trim(),
      post_id: post?.uuid || null,
      cover_image: cover || null,
      edition_title: editionTitle.trim() || null,
      status,
    };
    try {
      const res = await fetch(
        editing ? `/api/admin/magazines/${magazine.id}` : "/api/admin/magazines",
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
      if (!editing && data?.id) router.replace(`/admin/magazines/${data.id}`);
      else router.refresh();
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this magazine permanently?")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/magazines/${magazine.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/magazines");
    else {
      setError("Delete failed");
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-[#1D1F26]">
          {editing ? "Edit Magazine" : "Add Magazine"}
        </h1>
        <div className="flex items-center gap-2">
          {saved && !saving && <span className="text-sm text-green-600 mr-1">Saved ✓</span>}
          <a href="/admin/magazines" className="px-4 py-2 rounded-md text-sm border border-gray-300 bg-white hover:bg-gray-50">
            Back
          </a>
          {editing && (
            <button onClick={remove} disabled={saving} className="px-4 py-2 rounded-md text-sm border border-red-200 text-red-600 bg-white hover:bg-red-50 disabled:opacity-60">
              Delete
            </button>
          )}
          <button onClick={() => save("draft")} disabled={saving} className="px-4 py-2 rounded-md text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60">
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button onClick={() => save("published")} disabled={saving} className="px-4 py-2 rounded-md text-sm bg-primary text-white font-medium hover:opacity-90 disabled:opacity-60">
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div>
          <label className={label}>FlipHTML5 link</label>
          <input
            className={input}
            placeholder="https://online.fliphtml5.com/…"
            value={fliphtml5}
            onChange={(e) => setFliphtml5(e.target.value)}
          />
        </div>

        <div>
          <label className={label}>Linked TSD post (feature article)</label>
          <div className="flex gap-2">
            <input
              className={input}
              placeholder="https://thesuccessdigest.org/article/<slug>"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              onBlur={lookupPost}
            />
            <button
              type="button"
              onClick={lookupPost}
              disabled={looking}
              className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white hover:bg-gray-50 whitespace-nowrap disabled:opacity-60"
            >
              {looking ? "…" : "Fetch"}
            </button>
          </div>
          {lookupErr && <p className="text-xs text-red-600 mt-1">{lookupErr}</p>}

          {post && (
            <div className="mt-3 flex gap-3 items-start border border-gray-200 rounded-lg p-3 bg-gray-50">
              {post.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image} alt="" className="w-28 h-16 object-cover rounded shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-primary mb-0.5">
                  Auto-attached cover story
                </p>
                <p className="font-heading text-sm leading-snug" dangerouslySetInnerHTML={{ __html: post.title || "" }} />
                <p className="text-xs text-gray-500 line-clamp-2 mt-1" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className={label}>Cover image (magazine card / grid / header)</label>
          <FileDropzone value={cover} onChange={setCover} accept="image/*" kind="image" />
        </div>

        <div>
          <label className={label}>Edition title (optional — defaults to the post title)</label>
          <input
            className={input}
            placeholder="e.g. The New Era of Global Changemaker Leaders 2026"
            value={editionTitle}
            onChange={(e) => setEditionTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
