"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetActiveWibButton({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const activate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBusy(true);
    const res = await fetch(`/api/admin/wib-features/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activate: true }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert("Failed to set active");
  };

  return (
    <button
      onClick={activate}
      disabled={busy}
      className="text-xs px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60"
    >
      {busy ? "…" : "Set active"}
    </button>
  );
}
