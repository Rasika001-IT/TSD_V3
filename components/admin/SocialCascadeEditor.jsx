"use client";

const CHANNELS = ["linkedin", "instagram", "twitter"];
const input =
  "border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

export default function SocialCascadeEditor({ items, onChange }) {
  const set = (i, k, v) => onChange(items.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const add = () => onChange([...items, { channel: "linkedin", caption: "", scheduled_at: "" }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-sm">Promotion Cascade</h3>
        <button type="button" onClick={add} className="text-xs bg-[#1D1F26] text-white px-2.5 py-1 rounded hover:bg-black">+ Add</button>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-3">
            <div className="flex gap-2 mb-2">
              <select className={input} value={it.channel} onChange={(e) => set(i, "channel", e.target.value)}>
                {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="datetime-local" className={`${input} flex-1`} value={it.scheduled_at ? String(it.scheduled_at).slice(0, 16) : ""} onChange={(e) => set(i, "scheduled_at", e.target.value)} />
              <button type="button" onClick={() => remove(i)} className="text-xs text-red-600 px-2">✕</button>
            </div>
            <textarea className={`${input} w-full`} rows={2} placeholder="Platform caption" value={it.caption || ""} onChange={(e) => set(i, "caption", e.target.value)} />
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-400">No scheduled posts. Add LinkedIn / Instagram / Twitter captions + times.</p>}
      </div>
    </div>
  );
}
