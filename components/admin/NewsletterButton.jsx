"use client";
import { useState } from "react";

export default function NewsletterButton({ id }) {
  const [busy, setBusy] = useState(false);

  const send = async () => {
    if (!confirm("Email this post to all subscribers now?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/newsletter/${id}`, { method: "POST" });
    const data = await res.json();
    setBusy(false);
    if (res.ok) alert(`Newsletter sent to ${data.sent} subscribers.`);
    else alert(data.error || "Send failed");
  };

  return (
    <button
      onClick={send}
      disabled={busy}
      className="px-4 py-2 rounded-md text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60"
    >
      {busy ? "Sending…" : "Send Newsletter"}
    </button>
  );
}
