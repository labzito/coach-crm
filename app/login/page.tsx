"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);

    window.location.href = "/";
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm border border-gray-700 rounded-lg p-6 bg-gray-900">
        <h1 className="text-2xl font-semibold">Coach CRM</h1>
        <p className="text-sm opacity-80 mt-1">Login</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            className="w-full px-3 py-2 rounded bg-black/30 border border-gray-700"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded bg-black/30 border border-gray-700"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
            Entra
          </button>

          {msg ? <p className="text-sm opacity-80">{msg}</p> : null}
        </form>
      </div>
    </main>
  );
}
