"use client";
import { useRouter, useSearchParams } from "next/navigation";

// Sort dropdown for the dashboard. Changing it resets to page 1 and updates the
// ?sort= query param (the server component re-reads it).
export default function SortSelect({ sorts, current }) {
  const router = useRouter();
  const params = useSearchParams();

  const onChange = (e) => {
    const next = new URLSearchParams(params);
    next.set("sort", e.target.value);
    next.delete("page");
    router.push(`/admin?${next.toString()}`);
  };

  return (
    <label className="flex items-center gap-2 text-sm text-gray-500">
      Sort
      <select
        value={current}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        {Object.entries(sorts).map(([key, s]) => (
          <option key={key} value={key}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}
