import { db } from "../../database";
import Structure from "../Structure";
import CreateEvent from "./CreateEvent";
import SpotifyLink from "./SpotifyLink";

export default async function Page() {
  const events = await db.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Structure title="Admin-Area" top={<SpotifyLink />}>
      <CreateEvent />
      {events.length === 0 ? (
        <>Keine Events gefunden</>
      ) : (
        <div>
          {events.map((e) => (
            <a
              key={e.id}
              href={`/admin/${e.id}`}
              className="mb-3 border-l-2 hover:border-foreground border-transparent pl-3 p-1 block"
            >
              <div>
                <h2 className="text-xl font-bold">{e.name}</h2>
                <div className="italic text-sm">
                  Erstellt: {new Date(e.createdAt).toLocaleDateString("de")},{" "}
                  {e.isLive ? "live" : "nicht live"}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Structure>
  );
}
