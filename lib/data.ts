// lib/data.ts

import type { Client, ClientStatus, Session, Journey, JourneyStatus } from "./types";


export const clients: Client[] = [
  {
    id: "c1",
    name: "Luca Bianchi",
    contact: "luca.bianchi@email.com",
    status: "active",
    notes:
      "Focus: gestione stress e confini. Preferisce sessioni al mattino. Tende a rimandare decisioni importanti.",
  },
  {
    id: "c2",
    name: "Giulia Conti",
    contact: "+39 333 123 4567",
    status: "paused",
    notes:
      "In pausa per carico lavorativo. Obiettivo: riprendere routine e chiarezza su priorità.",
  },
  {
    id: "c3",
    name: "Marco Rinaldi",
    contact: null,
    status: "active",
    notes:
      "Tema ricorrente: motivazione e costanza. Nota: preferisce comunicazioni via messaggio.",
  },
  {
    id: "c4",
    name: "Sara Gallo",
    contact: "sara.gallo@email.com",
    status: "closed",
    notes:
      "Percorso concluso. Risultati: autonomia decisionale e maggiore assertività. Follow-up tra 3 mesi (non in scope ora).",
  },
  {
    id: "c5",
    name: "Elena Rossi",
    contact: "+39 340 987 6543",
    status: "active",
    notes:
      "Obiettivo: transizione di carriera. Lavora bene con esercizi scritti e azioni piccole ma frequenti.",
  },
];

export const sessions: Session[] = [
  // Luca (c1)
  {
    id: "s101",
    clientId: "c1",
    date: "2026-01-03",
    title: "Confini e richieste esterne",
    notes:
      "Abbiamo esplorato i trigger legati al senso di colpa. Chiarito cosa è negoziabile e cosa no.",
    actions:
      "Scrivere 3 frasi-ponte per dire no senza giustificarsi. Fare 1 conversazione breve entro venerdì.",
  },
  {
    id: "s102",
    clientId: "c1",
    date: "2025-12-18",
    title: "Stress e recupero",
    notes:
      "Identificati segnali precoci di sovraccarico. Distinto ‘urgenza’ da ‘importanza’.",
    actions:
      "Blocco 2x15’ pausa consapevole (mar/giov). Ridurre una riunione non necessaria.",
  },

  // Giulia (c2)
  {
    id: "s201",
    clientId: "c2",
    date: "2025-11-22",
    title: "Ripartenza soft",
    notes:
      "Definito un micro-obiettivo di continuità senza perfezionismo.",
    actions:
      "Scegliere 1 abitudine minima (10 minuti) per 7 giorni. Monitorare energia 1-10.",
  },

  // Marco (c3)
  {
    id: "s301",
    clientId: "c3",
    date: "2026-01-02",
    title: "Costanza e identità",
    notes:
      "Lavoro su identità: ‘chi divento quando mantengo una promessa a me stesso’.",
    actions:
      "Una promessa minuscola al giorno per 5 giorni. Scrivere 2 righe serali di check-in.",
  },
  {
    id: "s302",
    clientId: "c3",
    date: "2025-12-10",
    title: "Motivazione vs disciplina",
    notes:
      "Separato l’aspettare motivazione dal creare contesto favorevole.",
    actions:
      "Preparare ambiente la sera (2 minuti). Scegliere orario fisso per l’azione chiave.",
  },

  // Sara (c4)
  {
    id: "s401",
    clientId: "c4",
    date: "2025-10-05",
    title: "Chiusura percorso",
    notes:
      "Ricapitolati progressi e nuove regole interne. Definito ‘manuale personale’ in 5 punti.",
    actions:
      "Tenere il manuale a vista. Fare revisione mensile (non automatizzata).",
  },

  // Elena (c5) -> nessuna sessione (0) per testare lo stato vuoto
];


export const journeys: Journey[] = [
  // Luca (c1) - percorso attivo, 6 sessioni pianificate
  {
    id: "j101",
    clientId: "c1",
    title: "Confini e gestione dello stress",
    plannedSessions: 6,
    status: "active",
    startDate: "2025-12-01",
  },

  // Giulia (c2) - percorso in pausa, 4 sessioni
  {
    id: "j201",
    clientId: "c2",
    title: "Ripartenza e priorità",
    plannedSessions: 4,
    status: "paused",
    startDate: "2025-10-15",
  },

  // Marco (c3) - percorso attivo, 8 sessioni
  {
    id: "j301",
    clientId: "c3",
    title: "Identità e costanza",
    plannedSessions: 8,
    status: "active",
    startDate: "2025-11-10",
  },

  // Sara (c4) - percorso completato, 6 sessioni
  {
    id: "j401",
    clientId: "c4",
    title: "Assertività e autonomia decisionale",
    plannedSessions: 6,
    status: "completed",
    startDate: "2025-06-01",
    endDate: "2025-10-05",
  },

  // Elena (c5) - nessun percorso per testare stato vuoto
];



// ---------- Helpers ----------

export function getClients(): Client[] {
  // ritorna copia per evitare mutazioni accidentali
  return [...clients];
}

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

function parseISODate(dateISO: string): number {
  // dateISO formato YYYY-MM-DD
  // Date.parse con "YYYY-MM-DD" è ok in JS moderno, ma usiamo "T00:00:00Z" per stabilità.
  return Date.parse(`${dateISO}T00:00:00Z`);
}

export function getSessionsByClientId(clientId: string): Session[] {
  const filtered = sessions.filter((s) => s.clientId === clientId);
  filtered.sort((a, b) => parseISODate(b.date) - parseISODate(a.date)); // desc
  return filtered;
}

export function getStatusLabel(status: ClientStatus): string {
  switch (status) {
    case "active":
      return "Attivo";
    case "paused":
      return "In pausa";
    case "closed":
      return "Concluso";
    default:
      return status;
  }
}

export function getJourneysByClientId(clientId: string): Journey[] {
  return journeys.filter((j) => j.clientId === clientId);
}

export function getJourneyStatusLabel(status: JourneyStatus): string {
  switch (status) {
    case "active":
      return "Attivo";
    case "paused":
      return "In pausa";
    case "completed":
      return "Completato";
    default:
      return status;
  }
}


export function getJourneyProgress(journeyId: string): { completed: number; planned: number } | null {
  const journey = journeys.find((j) => j.id === journeyId);
  if (!journey) return null;

  const completed = sessions.filter((s) => s.clientId === journey.clientId).length;
  return { completed, planned: journey.plannedSessions };
}

