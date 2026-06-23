"use client";
import { useRouter, useSearchParams } from "next/navigation";

// Sort dropdown for the admin magazines list. Updates the `sort` URL query;
// the server component re-reads it. Default ('recent') is dropped from the URL.
export default function MagazineSortSelect({ sorts, sort = "recent" }) {
  const router = useRouter();
  const params = useSearchParams();

  const onChange = (e) => {
    const next = new URLSearchParams(params);
    if (e.target.value === "recent") next.delete("sort");
    else next.set("sort", e.target.value);
    const s = next.toString();
    router.push(s ? `/admin/magazines?${s}` : "/admin/magazines");
  };

  return (
    <select
      value={sort}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      {Object.entries(sorts).map(([key, s]) => (
        <option key={key} value={key}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
