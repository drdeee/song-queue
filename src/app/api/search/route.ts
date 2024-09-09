import { db } from "@/database";
import { searchTracks } from "@/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const eventId = request.nextUrl.searchParams.get("e");

  if (query === null || eventId === null) {
    return NextResponse.json({ status: 404 }, { status: 404 });
  }

  const proposals = await db.trackProposal.findMany({
    where: {
      eventId,
    },
    select: {
      uri: true,
      hits: true,
    },
  });

  return NextResponse.json(
    (await searchTracks(query)).map((track) => {
      const match = proposals.find((p) => p.uri === track.uri);
      return { ...track, hits: match ? match.hits : 0 };
    })
  );
}
