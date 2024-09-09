"use client";

import { activateQueue, deactivateQueue, deleteEvent } from "@/app/actions";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventActionButtons({ event }: { event: Event }) {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  return (
    <div className="flex flex-row justify-between mb-2">
      <div>
        <div className="text-sm mb-1">Warteschlange</div>
        {event.isLive ? (
          <button
            onClick={async () => {
              await deactivateQueue(event.id);
              router.refresh();
            }}
          >
            Deaktivieren
          </button>
        ) : (
          <button
            onClick={async () => {
              await activateQueue(event.id);
              router.refresh();
            }}
          >
            Aktivieren
          </button>
        )}
      </div>
      <div>
        <div className="text-sm mb-1 text-right">Event</div>
        <div className="flex flex-row">
          {!deleteConfirm ? (
            <button onClick={() => setDeleteConfirm(true)}>Löschen</button>
          ) : (
            <div>
              <button className="mr-2" onClick={() => setDeleteConfirm(false)}>
                Abbrechen
              </button>
              <button
                onClick={async () => {
                  await deleteEvent(event.id);
                  router.push("/admin");
                }}
              >
                Bestätigen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
