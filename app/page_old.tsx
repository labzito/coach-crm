import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-gray-700 rounded-lg p-6 bg-gray-900">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Coach CRM</h1>
          <p className="text-sm opacity-80 mt-1">
            Dashboard locale (v0)
          </p>
        </header>

        <nav className="space-y-3">
          <Link
            href="/clients"
            className="block px-4 py-3 rounded border border-gray-700 hover:bg-gray-800 transition-colors"
          >
            📋 Clienti
          </Link>

          <div className="block px-4 py-3 rounded border border-gray-800 opacity-50">
            🧭 Percorsi <span className="text-xs">(coming soon)</span>
          </div>

          <div className="block px-4 py-3 rounded border border-gray-800 opacity-50">
            🗓 Sessioni <span className="text-xs">(coming soon)</span>
          </div>
        </nav>
      </div>
    </main>
  );
}
