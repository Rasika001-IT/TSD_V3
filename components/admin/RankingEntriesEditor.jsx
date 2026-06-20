"use client";

const input =
  "w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

export default function RankingEntriesEditor({ entries, onChange }) {
  const set = (i, k, v) => {
    const next = entries.map((e, idx) => (idx === i ? { ...e, [k]: v } : e));
    onChange(next);
  };

  const add = () =>
    onChange([
      ...entries,
      { rank: entries.length + 1, person_name: "", person_title: "", company: "", bio: "", photo: "", linkedin_url: "" },
    ]);

  const remove = (i) => onChange(entries.filter((_, idx) => idx !== i).map((e, idx) => ({ ...e, rank: idx + 1 })));

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= entries.length) return;
    const next = [...entries];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next.map((e, idx) => ({ ...e, rank: idx + 1 })));
  };

  const uploadPhoto = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) set(i, "photo", data.url);
    e.target.value = "";
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg">Ranking Entries ({entries.length})</h3>
        <button type="button" onClick={add} className="text-sm bg-[#1D1F26] text-white px-3 py-1.5 rounded-md hover:bg-black">
          + Add entry
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((e, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500">#{e.rank}</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">↑</button>
                <button type="button" onClick={() => move(i, 1)} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">↓</button>
                <button type="button" onClick={() => remove(i)} className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50">Remove</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className={input} placeholder="Person name *" value={e.person_name} onChange={(ev) => set(i, "person_name", ev.target.value)} />
              <input className={input} placeholder="Title / role" value={e.person_title} onChange={(ev) => set(i, "person_title", ev.target.value)} />
              <input className={input} placeholder="Company" value={e.company} onChange={(ev) => set(i, "company", ev.target.value)} />
              <input className={input} placeholder="LinkedIn URL" value={e.linkedin_url} onChange={(ev) => set(i, "linkedin_url", ev.target.value)} />
            </div>
            <textarea className={`${input} mt-3`} rows={2} placeholder="Short bio" value={e.bio} onChange={(ev) => set(i, "bio", ev.target.value)} />
            <div className="mt-3 flex items-center gap-3">
              {e.photo && <img src={e.photo} alt="" className="w-12 h-12 rounded-full object-cover" />}
              <input type="file" accept="image/*" onChange={(ev) => uploadPhoto(i, ev)} className="text-xs" />
            </div>
          </div>
        ))}
        {entries.length === 0 && <p className="text-sm text-gray-400">No entries yet — add the first ranked person/company.</p>}
      </div>
    </div>
  );
}
