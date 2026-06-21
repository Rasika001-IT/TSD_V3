"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// Search + status filter + sort for the dashboard. Each control updates the URL
// query (and resets to page 1); the server component re-reads it.
export default function DashboardControls({ sorts, statuses, q = "", status = "", sort = "recent" }) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(q);

  const push = (mut) => {
    const next = new URLSearchParams(params);
    mut(next);
    next.delete("page");
    const s = next.toString();
    router.push(s ? `/admin?${s}` : "/admin");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    push((n) => (search.trim() ? n.set("q", search.trim()) : n.delete("q")));
  };

  const selectCls =
    "border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 capitalize";

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <form onSubmit={submitSearch} className="relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
          className="w-56 border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              push((n) => n.delete("q"));
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </form>

      <select
        value={status}
        onChange={(e) => push((n) => (e.target.value ? n.set("status", e.target.value) : n.delete("status")))}
        className={selectCls}
      >
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => push((n) => n.set("sort", e.target.value))}
        className={selectCls}
      >
        {Object.entries(sorts).map(([key, s]) => (
          <option key={key} value={key}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
