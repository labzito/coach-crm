// app/clients/page.tsx

import type { Metadata } from "next";
import { getClients } from "@/lib/data";
import ClientRow from "@/components/ClientRow";

export const metadata: Metadata = {
  title: "Clienti | Coach CRM",
};

export default function ClientsPage() {
  const clients = getClients();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Clienti</h1>
        <p className="text-sm opacity-80 mt-1">
          Elenco clienti (v0). Clicca un cliente per vedere il dettaglio.
        </p>
      </header>

      <section>
        {clients.length === 0 ? (
          <p className="opacity-80">Nessun cliente presente.</p>
        ) : (
          <ul className="border rounded-md divide-y">
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

