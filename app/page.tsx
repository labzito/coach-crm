"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const allowed = (process.env.NEXT_PUBLIC_ALLOWED_EMAIL ?? "").toLowerCase().trim();
      const userEmail = (user.email ?? "").toLowerCase().trim();

      setEmail(user.email ?? null);

      if (allowed && userEmail !== allowed) {
        // logout se non autorizzato
        await supabase.auth.signOut();
        window.location.href = "/login";
        return;
      }

      setOk(true);
      setLoading(false);
    })();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) return <main className="p-6">Loading…</main>;
  if (!ok) return null;

  return (
    <main className="min-h-screen p-6">
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm opacity-80 mt-1">Loggato come: {email}</p>
        </div>

        <button
          onClick={logout}
          className="px-3 py-2 rounded border border-gray-700 hover:bg-gray-800 transition-colors"
        >
          Esci
        </button>
      </header>

      <section className="max-w-5xl mx-auto grid gap-4 md:grid-cols-3">
        <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
          <div className="text-sm opacity-80">Coachee</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-xs opacity-60 mt-1">placeholder</div>
        </div>
        <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
          <div className="text-sm opacity-80">Percorsi</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-xs opacity-60 mt-1">placeholder</div>
        </div>
        <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
          <div className="text-sm opacity-80">Sessioni</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-xs opacity-60 mt-1">placeholder</div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-6 border border-gray-700 rounded-lg p-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Vai a Clienti</h2>
          <Link className="text-sm underline opacity-90" href="/clients">
            /clients →
          </Link>
        </div>
        <p className="text-sm opacity-80 mt-3">
          (Per ora /clients usa ancora mock data. Nel Pacchetto 3 lo portiamo su Supabase.)
        </p>
      </section>
    </main>
  );
}
