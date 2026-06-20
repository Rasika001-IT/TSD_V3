"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "./TiptapEditor";
import RankingEntriesEditor from "./RankingEntriesEditor";
import SocialCascadeEditor from "./SocialCascadeEditor";
import DeletePostButton from "./DeletePostButton";
import NewsletterButton from "./NewsletterButton";

const POST_TYPES = ["news", "blog", "ranking", "report", "feature"];
const REPORT_TYPES = ["industry_report", "tsd_insights", "market_pulse", "whitepaper", "annual_outlook"];
const FORMATS = {
  news: ["breaking", "standard", "brief", "analysis", "explainer"],
  blog: ["explainer", "how_to", "listicle", "deep_dive", "opinion", "interview", "case_study"],
  ranking: ["standard"],
  report: ["standard"],
  feature: ["standard"],
};
const VISIBILITY = ["public", "members_only", "unlisted"];
const PROMOTION = ["none", "featured", "hero", "editors_pick", "breaking"];
const REGIONS = ["", "us", "uk", "global", "apac", "emea", "latam"];

const Field = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{label}</label>
    {children}
  </div>
);
const input = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

export default function PostEditor({ taxonomy, post }) {
  const router = useRouter();
  const editing = !!post?.id;

  const [form, setForm] = useState({
    title: post?.title || "",
    subtitle: post?.subtitle || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    post_type: post?.post_type || "news",
    format: post?.format || "",
    visibility: post?.visibility || "public",
    promotion: post?.promotion || "none",
    featured_image: post?.featured_image || "",
    author_id: post?.author_id || "",
    series_id: post?.series_id || "",
    published_at: post?.published_at ? post.published_at.slice(0, 10) : "",
    scheduled_at: post?.scheduled_at ? post.scheduled_at.slice(0, 16) : "",
    seo_title: post?.seo_title || "",
    meta_description: post?.meta_description || "",
    primary_keyword: post?.primary_keyword || "",
    secondary_keywords: (post?.secondary_keywords || []).join(", "),
    entity_tags: (post?.entity_tags || []).join(", "),
    industry_tag: post?.industry_tag || "",
    region: post?.region || "",
    // Reports
    report_type: post?.report_type || "",
    is_gated: post?.is_gated || false,
    page_count: post?.page_count || "",
    pdf_url: post?.pdf_url || "",
    send_to_newsletter: post?.send_to_newsletter || false,
  });
  const [categoryIds, setCategoryIds] = useState(post?.category_ids || []);
  const [tagIds, setTagIds] = useState(post?.tag_ids || []);
  const [rankingEntries, setRankingEntries] = useState(post?.ranking_entries || []);
  const [social, setSocial] = useState(post?.social_promotions || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (arr, setArr, id) =>
    setArr(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const uploadFeatured = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) set("featured_image", data.url);
    e.target.value = "";
  };

  const uploadPdf = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) set("pdf_url", data.url);
    e.target.value = "";
  };

  const csv = (s) => s.split(",").map((x) => x.trim()).filter(Boolean);

  const save = async (status) => {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      status,
      secondary_keywords: csv(form.secondary_keywords),
      entity_tags: csv(form.entity_tags),
      author_id: form.author_id || null,
      series_id: form.series_id || null,
      format: form.format || null,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
      category_ids: categoryIds,
      tag_ids: tagIds,
      // Reports only carry meaning for report type, but harmless to always send
      report_type: form.post_type === "report" ? form.report_type || null : null,
      is_gated: form.post_type === "report" ? form.is_gated : false,
      page_count: form.post_type === "report" ? form.page_count || null : null,
      pdf_url: form.post_type === "report" ? form.pdf_url || null : null,
      // Only send ranking_entries for rankings (so other types aren't wiped)
      ...(form.post_type === "ranking" ? { ranking_entries: rankingEntries } : {}),
      social_promotions: social,
      send_to_newsletter: form.send_to_newsletter,
    };
    try {
      const res = await fetch(editing ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  const formats = FORMATS[form.post_type] || ["standard"];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-[#1D1F26]">{editing ? "Edit Post" : "Add New Post"}</h1>
        <div className="flex items-center gap-2">
          {editing && (
            <DeletePostButton
              id={post.id}
              redirect
              className="px-4 py-2 rounded-md text-sm border border-red-200 text-red-600 bg-white hover:bg-red-50 disabled:opacity-60"
            />
          )}
          {editing && form.send_to_newsletter && <NewsletterButton id={post.id} />}
          <button onClick={() => save("draft")} disabled={saving} className="px-4 py-2 rounded-md text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60">Save Draft</button>
          <button onClick={() => save("published")} disabled={saving} className="px-4 py-2 rounded-md text-sm bg-primary text-white font-medium hover:opacity-90 disabled:opacity-60">{saving ? "Saving…" : "Publish"}</button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* MAIN */}
        <div>
          <input className={`${input} text-2xl font-heading mb-3`} placeholder="Post title" value={form.title} onChange={(e) => set("title", e.target.value)} />
          <input className={`${input} mb-4`} placeholder="Subtitle / dek (optional)" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          <TiptapEditor value={form.content} onChange={(html) => set("content", html)} />
          <Field label="Excerpt">
            <textarea className={input} rows={3} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary used on cards + meta fallback" />
          </Field>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="font-heading text-lg mb-4">SEO &amp; Keywords</h3>
            <Field label="SEO Title (≤60)"><input maxLength={60} className={input} value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} /></Field>
            <Field label="Meta Description (≤160)"><input maxLength={160} className={input} value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} /></Field>
            <Field label="Primary Keyword"><input className={input} value={form.primary_keyword} onChange={(e) => set("primary_keyword", e.target.value)} /></Field>
            <Field label="Secondary Keywords (comma-separated)"><input className={input} value={form.secondary_keywords} onChange={(e) => set("secondary_keywords", e.target.value)} /></Field>
            <Field label="Entity Tags (comma-separated)"><input className={input} value={form.entity_tags} onChange={(e) => set("entity_tags", e.target.value)} /></Field>
          </div>

          {form.post_type === "ranking" && (
            <RankingEntriesEditor entries={rankingEntries} onChange={setRankingEntries} />
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Field label="Post Type">
              <select className={input} value={form.post_type} onChange={(e) => { set("post_type", e.target.value); set("format", ""); }}>
                {POST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Format">
              <select className={input} value={form.format} onChange={(e) => set("format", e.target.value)}>
                <option value="">—</option>
                {formats.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Visibility">
              <select className={input} value={form.visibility} onChange={(e) => set("visibility", e.target.value)}>
                {VISIBILITY.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Promotion">
              <select className={input} value={form.promotion} onChange={(e) => set("promotion", e.target.value)}>
                {PROMOTION.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Publish Date">
              <input type="date" className={input} value={form.published_at} onChange={(e) => set("published_at", e.target.value)} />
            </Field>
            <Field label="Schedule (optional)">
              <input type="datetime-local" className={input} value={form.scheduled_at} onChange={(e) => set("scheduled_at", e.target.value)} />
            </Field>
          </div>

          {form.post_type === "report" && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-heading text-sm mb-3">Report</h3>
              <Field label="Report Type">
                <select className={input} value={form.report_type} onChange={(e) => set("report_type", e.target.value)}>
                  <option value="">—</option>
                  {REPORT_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="PDF">
                {form.pdf_url && (
                  <a href={form.pdf_url} target="_blank" rel="noreferrer" className="block text-xs text-primary underline mb-2 truncate">{form.pdf_url}</a>
                )}
                <input type="file" accept="application/pdf" onChange={uploadPdf} className="text-sm" />
              </Field>
              <Field label="Page Count">
                <input type="number" className={input} value={form.page_count} onChange={(e) => set("page_count", e.target.value)} />
              </Field>
              <label className="flex items-center gap-2 text-sm mt-1">
                <input type="checkbox" checked={form.is_gated} onChange={(e) => set("is_gated", e.target.checked)} />
                Gated (require lead capture to download)
              </label>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Field label="Featured Image">
              {form.featured_image && <img src={form.featured_image} alt="" className="w-full h-32 object-cover rounded mb-2" />}
              <input type="file" accept="image/*" onChange={uploadFeatured} className="text-sm" />
            </Field>
            <Field label="Author">
              <select className={input} value={form.author_id} onChange={(e) => set("author_id", e.target.value)}>
                <option value="">—</option>
                {taxonomy.authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </Field>
            <Field label="Series">
              <select className={input} value={form.series_id} onChange={(e) => set("series_id", e.target.value)}>
                <option value="">—</option>
                {taxonomy.series.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="Region">
              <select className={input} value={form.region} onChange={(e) => set("region", e.target.value)}>
                {REGIONS.map((r) => <option key={r} value={r}>{r || "—"}</option>)}
              </select>
            </Field>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Field label="Categories">
              <div className="max-h-40 overflow-y-auto space-y-1">
                {taxonomy.categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={categoryIds.includes(c.id)} onChange={() => toggle(categoryIds, setCategoryIds, c.id)} />
                    {c.name}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <Field label="Tags">
              <div className="max-h-40 overflow-y-auto space-y-1">
                {taxonomy.tags.map((t) => (
                  <label key={t.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={tagIds.includes(t.id)} onChange={() => toggle(tagIds, setTagIds, t.id)} />
                    {t.name}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.send_to_newsletter} onChange={(e) => set("send_to_newsletter", e.target.checked)} />
              Send to newsletter on publish
            </label>
          </div>

          <SocialCascadeEditor items={social} onChange={setSocial} />
        </div>
      </div>
    </div>
  );
}
