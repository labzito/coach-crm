// components/SessionRow.tsx

import type { Session } from "@/lib/types";

export default function SessionRow({ session }: { session: Session }) {
  return (
    <li className="border-b py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-medium">{session.title}</div>
          <div className="text-sm opacity-80">
            <span className="mr-2">{session.date}</span>
          </div>
          {session.actions ? (
            <div className="text-sm mt-2">
              <span className="font-medium">Azioni:</span>{" "}
              <span className="opacity-90">{session.actions}</span>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
