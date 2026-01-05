// lib/types.ts

export type ClientStatus = "active" | "paused" | "closed";

export type Client = {
  id: string;
  name: string;
  contact: string | null; // email o telefono, opzionale
  status: ClientStatus;
  notes: string;
};

export type Session = {
  id: string;
  clientId: string;
  date: string; // ISO YYYY-MM-DD
  title: string;
  notes: string;
  actions: string; // testo semplice
};


export type JourneyStatus = "active" | "paused" | "completed";

export type JourneyPlannedSessions = 3 | 4 | 6 | 8 | 12;

export type Journey = {
  id: string;
  clientId: string;

  title: string; // tema del percorso
  plannedSessions: JourneyPlannedSessions;

  status: JourneyStatus;

  startDate?: string | null; // ISO YYYY-MM-DD (opzionale)
  endDate?: string | null;   // ISO YYYY-MM-DD (opzionale)

  // Nota: completedSessions lo calcoliamo dalle Sessioni (non lo salviamo qui)
};
