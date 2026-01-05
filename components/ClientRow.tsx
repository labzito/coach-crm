// components/ClientRow.tsx

import Link from "next/link";
import type { Client } from "@/lib/types";
import { getStatusLabel } from "@/lib/data";

export default function ClientRow({ client }: { client: Client }) {
  return (
    <li className="border-b py-3">
      <Link href={`/clients/${client.id}`} className="block">
        <div className="block py-3 px-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600">
          <div className="min-w-0">
            <div className="font-medium">{client.name}</div>
            {client.contact ? (
              <div className="text-sm opacity-80">{client.contact}</div>
            ) : null}
          </div>

          <div className="text-sm opacity-80 whitespace-nowrap">
            {getStatusLabel(client.status)}
          </div>
        </div>
      </Link>
    </li>
  );
}
