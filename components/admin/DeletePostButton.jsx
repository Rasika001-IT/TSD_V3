"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ id, redirect = false, className }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const del = async () => {
    if (!confirm("Delete this post permanently? This cannot be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (redirect) router.push("/admin");
      router.refresh();
    } else {
      alert("Delete failed");
      setBusy(false);
    }
  };

  return (
    <button
      onClick={del}
      disabled={busy}
      className={className || "text-red-600 hover:underline text-sm disabled:opacity-50"}
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
