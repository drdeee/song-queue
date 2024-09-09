import { db } from "@/database";
import Structure from "@/app/Structure";
import { notFound } from "next/navigation";
import EventActionButtons from "./EventActionButtons";
import Image from "next/image";
import TrackActionButtons from "./TrackActionButtons";
import SpotifyLink from "../SpotifyLink";

export default async function EventDetails({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;

  const event = await db.event.findUnique({ where: { id: eventId } });
  if (event === null) notFound();

  const proposals = await db.trackProposal.findMany({
    where: {
      eventId,
      state: "pending",
    },
    include: {
      artists: true,
    },
    orderBy: [
      {
        hits: "desc",
      },
      { createdAt: "asc" },
    ],
  });

  return (
    <Structure title={event.name} top={<SpotifyLink />}>
      <EventActionButtons event={event} />
      {proposals.map((track) => (
        <div
          key={track.uri}
          className="flex flex-row items-center py-2 duration-100"
        >
          <div className="flex flex-row items-center mr-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
            <div className="text-sm ml-1">{track.hits}</div>
          </div>
          <div>
            <Image
              src={track.imageUri!}
              alt={`Cover Image ${track.name}`}
              width={50}
              height={50}
            />
          </div>
          <div className="flex-grow ml-2">
            <div className="text-bold">{track.name}</div>
            <div className="text-sm">
              {track.artists.map((a) => a.name).join(", ")} | {track.albumName}
            </div>
          </div>

          <TrackActionButtons trackId={track.id} trackUri={track.uri} />
        </div>
      ))}
    </Structure>
  );
}
