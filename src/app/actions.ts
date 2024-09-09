"use server";
import { redirect } from "next/navigation";
import { db } from "../database";
import { SpotifySearchResult } from "@/spotify";

export async function createEvent(formData: FormData) {
  const name = formData.get("name") as string | null;
  if (name !== null)
    redirect(`/admin/${(await db.event.create({ data: { name } })).id}`);
}

export async function activateQueue(eventId: string) {
  await db.event.update({ where: { id: eventId }, data: { isLive: true } });
}

export async function deactivateQueue(eventId: string) {
  await db.event.update({ where: { id: eventId }, data: { isLive: false } });
}

export async function deleteEvent(eventId: string) {
  await db.event.delete({ where: { id: eventId } });
}

export async function proposeTrack(eventId: string, trackUri: string) {
  console.log(eventId, trackUri);
  const trackProposal = await db.trackProposal.findFirst({
    where: {
      eventId,
      uri: trackUri,
    },
  });

  console.log(trackProposal);

  if (trackProposal) {
    console.log(1);
    return (
      await db.trackProposal.update({
        where: {
          id: trackProposal.id,
        },
        data: {
          hits: trackProposal.hits + 1,
        },
      })
    ).hits;
  } else {
    const cacheItem = await db.trackCache.findUnique({
      where: {
        uri: trackUri,
      },
    });

    if (cacheItem === null) return -1;

    const trackInfo: SpotifySearchResult = JSON.parse(cacheItem.data);

    console.log(2, trackInfo);
    if (Object.keys(trackInfo).length === 0) return -1;

    return (
      await db.trackProposal.create({
        data: {
          ...trackInfo,
          artists: {
            connectOrCreate: trackInfo.artists.map((artist) => ({
              where: {
                uri: artist.uri,
              },
              create: {
                uri: artist.uri,
                name: artist.name,
              },
            })),
          },
          hits: 1,
          eventId,
        },
      })
    ).hits;
  }
}

export async function rejectProposal(proposalId: string) {
  await db.trackProposal.update({
    where: {
      id: proposalId,
    },
    data: {
      state: "rejected",
    },
  });
}

export async function acceptProposal(proposalId: string) {
  await db.trackProposal.update({
    where: {
      id: proposalId,
    },
    data: {
      state: "queued",
    },
  });
}
