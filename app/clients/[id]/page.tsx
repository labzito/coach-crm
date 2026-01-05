// app/clients/[id]/page.tsx



import Link from "next/link";
import type { Metadata } from "next";
import {
  getClientById,
  getSessionsByClientId,
  getStatusLabel,
  getJourneysByClientId,
  getJourneyStatusLabel,
} from "@/lib/data";
import SessionRow from "@/components/SessionRow";

type PageProps = {
  params: Promise<{ id: string }>;
};

function normalizeId(id: string) {
  return decodeURIComponent(id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const normalizedId = normalizeId(id);
  const client = getClientById(normalizedId);

  return {
    title: client ? `${client.name} | Coach CRM` : "Cliente non trovato | Coach CRM",
  };
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const normalizedId = normalizeId(id);

  const client = getClientById(normalizedId);

  if (!client) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Cliente non trovato</h1>
        <p className="text-sm opacity-80 mt-2">
          ID richiesto: <code className="px-1 border rounded">{normalizedId}</code>
        </p>
        <Link href="/clients" className="underline block mt-4">
          ← Torna ai clienti
        </Link>
      </main>
    );
  }

  const sessions = getSessionsByClientId(client.id);
  const journeys = getJourneysByClientId(client.id);






  return (

      
    <main className="max-w-2xl mx-auto p-6">
      <div className="max-w-2xl mx-auto p-6">
      <header className="mb-6">
        <Link href="/clients" className="underline text-sm">
          ← Torna ai clienti
        </Link>

        <h1 className="text-2xl font-semibold mt-3">{client.name}</h1>
        <div className="text-sm opacity-80 mt-1">
          Stato: {getStatusLabel(client.status)}
          {client.contact ? (
            <>
              <span className="mx-2">•</span>
              Contatto: {client.contact}
            </>
          ) : null}
        </div>
      </header>

      <section className="border rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Scheda cliente</h2>

        <dl className="text-sm">
          <div className="mb-2">
            <dt className="font-medium">Nome</dt>
            <dd className="opacity-90">{client.name}</dd>
          </div>

          <div className="mb-2">
            <dt className="font-medium">Contatto</dt>
            <dd className="opacity-90">{client.contact ?? "—"}</dd>
          </div>

          <div className="mb-2">
            <dt className="font-medium">Stato</dt>
            <dd className="opacity-90">{getStatusLabel(client.status)}</dd>
          </div>

          <div className="mb-2">
            <dt className="font-medium">Note</dt>
            <dd className="opacity-90 whitespace-pre-wrap">{client.notes || "—"}</dd>
          </div>
        </dl>
      </section>

            <section className="border rounded p-4 mb-6">
  <div className="flex items-baseline justify-between gap-4">
    <h2 className="text-lg font-semibold">Percorsi</h2>
    <span className="text-sm opacity-80">
      {journeys.length} {journeys.length === 1 ? "percorso" : "percorsi"}
    </span>
  </div>

  {journeys.length === 0 ? (
    <p className="opacity-80 mt-2">Nessun percorso per questo cliente.</p>
  ) : (
    <ul className="mt-3 space-y-3">
      {journeys.map((j) => {
        const completed = sessions.length; // v0: tutte le sessioni del cliente
        const planned = j.plannedSessions;
        const ratio = planned > 0 ? Math.min(1, completed / planned) : 0;
        const percent = Math.round(ratio * 100);

        return (
          <li key={j.id} className="border rounded-md p-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium">{j.title}</div>
                <div className="text-sm opacity-80 mt-1">
                  Stato: {getJourneyStatusLabel(j.status)}
                  <span className="mx-2">•</span>
                  Pianificate: {planned}
                  <span className="mx-2">•</span>
                  Comi: {completed}
                </div>
                {(j.startDate || j.endDate) ? (
                  <div className="text-sm opacity-80 mt-1">
                    {j.startDate ? <>Inizio: {j.startDate}</> : null}
                    {j.startDate && j.endDate ? <span className="mx-2">•</span> : null}
                    {j.endDate ? <>Fine: {j.endDate}</> : null}
                  </div>
                ) : null}
              </div>

              <div className="text-sm opacity-80 whitespace-nowrap">
                {percent}%
              </div>
            </div>

            {/* mini progress bar */}
            <div className="mt-3 h-2 w-full rounded bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gray-600"
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  )}
</section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Sessioni</h2>

        {sessions.length === 0 ? (
          <p className="opacity-80">Nessuna sessione per questo cliente.</p>
        ) : (
          <ul className="border rounded-md divide-y divide-gray-700">
            {sessions.map((s) => (
              <SessionRow key={s.id} session={s} />
            ))}
          </ul>
        )}
      </section>
      </div>
      
    </main>
  );
}



