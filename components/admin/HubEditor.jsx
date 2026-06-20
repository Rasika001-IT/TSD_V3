"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const input = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

export default function HubEditor({ hub, categories }) {
  const router = useRouter();
  const [intro, setIntro] = useState(hub.intro_copy || "");
  const [header, setHeader] = useState(hub.header_image || "");
  const [catIds, setCatIds] = useState(categories.filter((c) => c.hub_id === hub.id).map((c) => c.id));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const toggle = (id) => setCatIds(catIds.includes(id) ? catIds.filter((x) => x !== id) : [...catIds, id]);

  const uploadHeader = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setHeader(data.url);
    e.target.value = "";
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const res = await fetch(`/api/admin/hubs/${hub.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intro_copy: intro, header_image: header, category_ids: catIds }),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("Saved.");
      router.refresh();
    } else {
      setMsg("Save failed.");
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-heading text-2xl mb-1">Edit Hub — {hub.name}</h1>
      <p className="text-sm text-gray-500 mb-6">/hubs/{hub.slug}</p>

      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Intro copy</label>
      <textarea className={`${input} mb-4`} rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} />

      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Header image</label>
      {header && <img src={header} alt="" className="w-full h-32 object-cover rounded mb-2" />}
      <input type="file" accept="image/*" onChange={uploadHeader} className="text-sm mb-6 block" />

      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Categories in this hub</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 mb-6">
        {categories.map((c) => (
          <label key={c.id} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={catIds.includes(c.id)} onChange={() => toggle(c.id)} />
            {c.name}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving} className="bg-primary text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60">
          {saving ? "Saving…" : "Save Hub"}
        </button>
        {msg && <span className="text-sm text-gray-600">{msg}</span>}
      </div>
    </div>
  );
}
