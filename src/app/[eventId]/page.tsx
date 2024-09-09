import { notFound } from "next/navigation";
import { db } from "../../database";
import Structure from "../Structure";
import Search from "./Search";

export default async function Home({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await db.event.findUnique({ where: { id: params.eventId } });
  if (event === null) notFound();

  return (
    <Structure title={event.name}>
      <div className="mb-2">
        Willkommen bei der Warteschlange von Lautis Dresden! Hier kannst du ganz
        einfach Songwünsche einreichen, die dann am Lauti gespielt werden.
      </div>
      <div className="mb-4">
        <div className="font-bold">SO FUNKTIONIERT ES:</div>
        <ul className="list-disc list-inside">
          <li>Du kannst dir auf dieser Seite Songs wünschen!</li>
          <li>
            Wir fügen diesen dann in die Warteschlange ein. Wenn sich mehrere
            Menschen den gleichen Song wünschen, wird dieser uns weiter oben
            angezeigt.
          </li>
          <li>
            DISCLAIMER: wir können leider nicht garantieren, dass auch wirklich
            jeder Song gespielt wird, bzw. das es keine Unterbrechungen gibt.
          </li>
        </ul>
      </div>
      <Search eventId={event.id} />
    </Structure>
  );
}
