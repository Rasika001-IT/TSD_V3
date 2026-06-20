"use client";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function SignOutButton() {
  const router = useRouter();
  const signOut = async () => {
    await createSupabaseBrowser().auth.signOut();
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
