"use client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const signOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };
  return (
    <button
      onClick={signOut}
      className="text-white/80 hover:text-white underline underline-offset-2"
    >
      Sign out
    </button>
  );
}
